import { NcloudNodeFactory } from '@/src/models/ncloud';
import { GROUP_TYPES } from '@constants';
import { useDimensionContext } from '@contexts/DimensionContext';
import { useEdgeContext } from '@contexts/EdgeContext';
import { useGroupContext } from '@contexts/GroupContext';
import { useNodeContext } from '@contexts/NodeContext';
import { useSvgContext } from '@contexts/SvgContext';
import {
    findNearestConnectorForBendPoint,
    getClosestSegEdgeIdx,
    updateNearestConnectorPair,
} from '@helpers/edge';
import { computeBounds } from '@helpers/group';
import {
    adjustNodePointForDimension,
    alignNodePoint,
    getNodeBounds,
} from '@helpers/node';
import { Connection, Edge, Point } from '@types';
import {
    alignPoint2d,
    alignPoint3d,
    convert2dTo3dPoint,
    convert3dTo2dPoint,
    getConnectorPoints,
    getSvgPoint,
} from '@utils';
import { nanoid } from 'nanoid';
import { useEffect } from 'react';

export default () => {
    const {
        state: { nodes },
        dispatch: nodeDispatch,
    } = useNodeContext();
    const {
        state: { edges },
        dispatch: edgeDispatch,
    } = useEdgeContext();
    const {
        state: { groups },
        dispatch: groupDispatch,
    } = useGroupContext();

    const { dimension, prevDimension } = useDimensionContext();
    const { svgRef } = useSvgContext();

    //INFO: Node

    const addNode = (type: string) => {
        const node = NcloudNodeFactory(type);
        //TODO: Focus 된 그룹에 추가하도록 수정해야함
        nodeDispatch({
            type: 'ADD_NODE',
            payload: {
                ...node,
                id: `node-${nanoid()}`,
                point: { x: 0, y: 0 },
                connectors: getConnectorPoints(node, dimension),
            },
        });
    };

    const moveNode = (id: string, point: Point) => {
        if (!svgRef.current) return;
        const node = nodes[id];
        const newPoint = alignNodePoint(node, point, dimension);
        const connectors = getConnectorPoints(
            { ...node, point: newPoint },
            dimension,
        );

        nodeDispatch({
            type: 'MOVE_NODE',
            payload: { id, point: newPoint, connectors },
        });

        const connectedEdges = Object.values(edges).filter(
            (edge) => edge.source.id === id || edge.target.id === id,
        );

        const updatedEdges = updateNearestConnectorPair(
            { ...node, point: newPoint, connectors },
            nodes,
            connectedEdges,
        );

        updateEdges(updatedEdges);
    };

    const removeNode = (id: string) => {
        const node = nodes[id];
        nodeDispatch({
            type: 'REMOVE_NODE',
            payload: { id },
        });

        const groupIds = GROUP_TYPES.map(
            (type) => node.properties[type],
        ).filter(Boolean);

        if (groupIds.length > 0) {
            groupIds.forEach((groupId) => {
                removeNodeFromGroup(groupId, id);
            });
        }

        const connectedEdgeIds = Object.values(edges)
            .filter((edge) => edge.source.id === id || edge.target.id === id)
            .map((edge) => edge.id);

        edgeDispatch({
            type: 'REMOVE_EDGES',
            payload: connectedEdgeIds,
        });
    };

    const updateNodePointForDimension = () => {
        const updatedNodes = Object.entries(nodes).reduce((acc, [id, node]) => {
            const adjustedPoint = adjustNodePointForDimension(node, dimension);
            const connectors = getConnectorPoints(
                { ...node, point: adjustedPoint },
                dimension,
            );
            return {
                ...acc,
                [id]: {
                    ...node,
                    point: adjustedPoint,
                    connectors,
                },
            };
        }, {});

        nodeDispatch({
            type: 'UPDATE_NODES',
            payload: updatedNodes,
        });
    };

    //INFO: Edge

    const addEdge = (
        source: Required<Connection>,
        target: Required<Connection>,
    ) => {
        edgeDispatch({
            type: 'ADD_EDGE',
            payload: {
                id: `edge-${nanoid()}`,
                type: 'arrow',
                source: {
                    id: source.id,
                    connectorType: source.connectorType,
                },
                target: {
                    id: target.id,
                    connectorType: target.connectorType,
                },
            },
        });
    };

    const removeEdge = (id: string, segmentIdxes: number[]) =>
        edgeDispatch({
            type: 'REMOVE_EDGE',
            payload: {
                id,
                segmentIdxes,
            },
        });

    const updateEdges = (edges: Record<string, Edge>) => {
        edgeDispatch({
            type: 'UPDATE_EDGES',
            payload: edges,
        });
    };

    const splitEdge = (id: string, point: Point, bendingPoints: Point[]) => {
        if (!svgRef.current) return;

        const svgPoint = getSvgPoint(svgRef.current, point);
        const closestSegmentIdx = getClosestSegEdgeIdx(bendingPoints, svgPoint);

        edgeDispatch({
            type: 'SPLIT_EDGE',
            payload: {
                id,
                point: svgPoint,
                insertAfter: closestSegmentIdx,
            },
        });
    };

    const moveBendingPointer = (
        edgeId: string,
        index: number,
        point: Point,
    ) => {
        if (!svgRef.current) return;

        const newPoint =
            dimension === '2d' ? alignPoint2d(point) : alignPoint3d(point);

        const edge = edges[edgeId];
        const { source, target } = edge;

        let connector:
            | {
                  [key: string]: {
                      id: string;
                      connectorType: string;
                  };
              }
            | undefined;

        if (index === 0) {
            const sourceNode = nodes[source.id];
            const connectorType = findNearestConnectorForBendPoint(
                sourceNode,
                point,
            ) as string;
            connector = {
                ['source']: {
                    id: source.id,
                    connectorType,
                },
            };
        }
        if (index === edge.bendingPoints.length - 1) {
            const targetNode = nodes[target.id];
            const connectorType = findNearestConnectorForBendPoint(
                targetNode,
                point,
            ) as string;
            connector = {
                ...connector,
                ['target']: {
                    id: target.id,
                    connectorType,
                },
            };
        }

        edgeDispatch({
            type: 'MOVE_BENDING_POINTER',
            payload: {
                id: edgeId,
                bendingPointer: { index, point: newPoint },
                connector,
            },
        });
    };

    const updateEdgePointForDimension = () => {
        const updatedEdges = Object.entries(edges).reduce((acc, [id, edge]) => {
            const adjustedBendingPoints = edge.bendingPoints.map((point) =>
                dimension === '2d'
                    ? convert3dTo2dPoint(point)
                    : convert2dTo3dPoint(point),
            );

            return {
                ...acc,
                [id]: {
                    ...edge,
                    bendingPoints: adjustedBendingPoints,
                },
            };
        }, {});

        edgeDispatch({
            type: 'UPDATE_EDGES',
            payload: updatedEdges,
        });
    };

    //INFO: Group

    const addGroup = (type: string, groupId: string, nodeId: string) => {};

    const updateGroup = (type: string, groupId: string, nodeId: string) => {};

    const removeNodeFromGroup = (groupId: string, nodeId: string) => {
        groupDispatch({
            type: 'REMOVE_NODE_FROM_GROUP',
            payload: { groupId, nodeId },
        });
    };

    //INFO: Node만 움직여도 자동으로 그룹이 움직여짐, 따라서 Offset을 받아서 처리함
    const moveGroup = (groupId: string, offset: Point) => {
        const group = groups[groupId];
        if (!group) return;

        group.nodeIds.forEach((nodeId) => {
            const node = nodes[nodeId];
            const newPoint = {
                x: node.point.x + offset.x,
                y: node.point.y + offset.y,
            };
            moveNode(nodeId, newPoint);
        });
    };

    const getGroupBounds = (groupId: string) => {
        const group = groups[groupId];

        const childGroupNodeIds = group.childGroupIds.map((groupId) => {
            const childGroup = groups[groupId];
            return childGroup.nodeIds;
        });

        const childGroupsBounds = childGroupNodeIds.map((nodeIds) => {
            const childGroupNodeBounds = nodeIds.map((nodeId) =>
                getNodeBounds(nodes[nodeId], dimension),
            );
            return computeBounds(childGroupNodeBounds, dimension);
        });

        const currentGroupNodeBounds = group.nodeIds.map((nodeId) => {
            return getNodeBounds(nodes[nodeId], dimension);
        });

        return computeBounds(
            [...childGroupsBounds, ...currentGroupNodeBounds],
            dimension,
        );
    };

    useEffect(() => {
        if (dimension === prevDimension) return;

        updateNodePointForDimension();
        updateEdgePointForDimension();
    }, [dimension]);

    return {
        addNode,
        moveNode,
        removeNode,
        addEdge,
        removeEdge,
        splitEdge,
        moveBendingPointer,
        updateGroup,
        removeNodeFromGroup,
        getGroupBounds,
        moveGroup,
    };
};
