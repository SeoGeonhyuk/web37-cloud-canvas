import BendingPointer from '@components/BendingPointer';
import Connection from '@components/Connection';
import Connectors from '@components/Connectors';
import Edge from '@components/Edge';
import Graph from '@components/Graph';
import GridBackground from '@components/GridBackground';
import Group from '@components/Group';
import Node from '@components/Node';
import { useEdgeContext } from '@contexts/EdgeContext';
import { useGroupContext } from '@contexts/GroupContext';
import { useNodeContext } from '@contexts/NodeContext';
import { useSvgContext } from '@contexts/SvgContext';
import useConnection from '@hooks/useConnection';
import useGraphActions from '@hooks/useGraphActions';
import useSelection from '@hooks/useSelection';
import { useEffect } from 'react';

export default () => {
    const { svgRef } = useSvgContext();
    const {
        state: { nodes },
    } = useNodeContext();
    const {
        state: { edges },
    } = useEdgeContext();
    const {
        state: { groups },
    } = useGroupContext();
    const {
        selectedNodeId,
        selectedEdge,
        selectedGroupId,
        clearSelection,
        selectNode,
        selectSegEdge,
        selectEntireEdge,
    } = useSelection();

    const {
        moveNode,
        addEdge,
        splitEdge,
        moveBendingPointer,
        getGroupBounds,
        moveGroup,
        removeNode,
        removeEdge,
    } = useGraphActions();

    const {
        connection,
        isConnecting,
        openConnection,
        connectConnection,
        closeConnection,
    } = useConnection({
        updateEdgeFn: addEdge,
    });

    useEffect(() => {
        const handleContextMenu = (e: MouseEvent) => e.preventDefault();
        const handleMouseDown = () => clearSelection();
        document.addEventListener('contextmenu', handleContextMenu);
        document.addEventListener('mousedown', handleMouseDown);

        return () => {
            document.removeEventListener('contextmenu', handleContextMenu);
            svgRef.current?.removeEventListener('mousedown', handleMouseDown);
        };
    }, []);

    return (
        <Graph>
            <GridBackground />
            {Object.values(groups).map((group) => (
                <Group
                    group={group}
                    bounds={getGroupBounds(group.id)}
                    onMove={moveGroup}
                />
            ))}
            {Object.values(nodes).map((node) => (
                <>
                    <Node
                        node={node}
                        isSelected={selectedNodeId === node.id}
                        onMove={moveNode}
                        onSelect={selectNode}
                        onRemove={removeNode}
                    />
                    <Connectors
                        node={node}
                        isSelected={selectedNodeId === node.id}
                        isConnecting={isConnecting}
                        onOpenConnection={openConnection}
                        onConnectConnection={connectConnection}
                        onCloseConnection={closeConnection}
                    />
                </>
            ))}
            {connection && (
                <Connection
                    source={connection.source}
                    target={connection.target}
                />
            )}

            {edges &&
                Object.values(edges).map((edge) => (
                    <>
                        <Edge
                            key={edge.id}
                            edge={edge}
                            selectedEdge={selectedEdge}
                            sourceConnector={
                                nodes[edge.source.id].connectors[
                                    edge.source.connectorType
                                ]
                            }
                            targetConnector={
                                nodes[edge.target.id].connectors[
                                    edge.target.connectorType
                                ]
                            }
                            onSelectEntire={selectEntireEdge}
                            onSelectSegment={selectSegEdge}
                            onSplit={splitEdge}
                            onRemove={removeEdge}
                        />
                        {edge.bendingPoints.map((point, index) => (
                            <BendingPointer
                                key={`${edge.id}-${index}`}
                                edgeId={edge.id}
                                point={point}
                                index={index}
                                onMove={(newPoint) =>
                                    moveBendingPointer(edge.id, index, newPoint)
                                }
                            />
                        ))}
                    </>
                ))}
        </Graph>
    );
};
