import { Dimension, Edge, Point } from '@cloudflow/types';
import { calculateAnchorPoints } from '@cloudflow/utils';
import { useTheme } from '@mui/material';
import { memo, MouseEvent } from 'react';

type Props = {
    edge: Edge;
    isSelected: boolean;
    dimension: Dimension;
    onSplitEdge: (edgeId: string, point: Point) => void;
    onSelectEdge: (edgeId: string) => void;
};

export default memo(
    ({ edge, dimension, isSelected, onSplitEdge, onSelectEdge }: Props) => {
        const { id, source, target, type } = edge;
        const theme = useTheme();

        const sourceAnchors = calculateAnchorPoints(source.point, dimension);
        const targetAnchors = calculateAnchorPoints(target.point, dimension);

        const sourcePoint = source.anchorType
            ? sourceAnchors[source.anchorType]
            : source.point;
        const targetPoint = target.anchorType
            ? targetAnchors[target.anchorType]
            : target.point;

        const handleClick = (event: MouseEvent) => {
            event.stopPropagation();
            onSelectEdge(id);
        };

        const handleDbClick = (event: MouseEvent) => {
            event.stopPropagation();
            if (!isSelected) return;
            const { clientX, clientY } = event;
            onSplitEdge(id, { x: clientX, y: clientY });
        };

        return (
            <g id={id} data-type="flow-line">
                <defs>
                    <marker
                        id="arrowhead"
                        markerWidth="5"
                        markerHeight="5"
                        refX="5"
                        refY="2.5"
                        orient="auto"
                    >
                        <path
                            d="M 0 0 L 5 2.5 L 0 5 Z"
                            fill={theme.palette.text.primary}
                        />
                    </marker>
                </defs>
                <line
                    x1={sourcePoint.x}
                    y1={sourcePoint.y}
                    x2={targetPoint.x}
                    y2={targetPoint.y}
                    stroke={
                        isSelected
                            ? theme.palette.info.main
                            : theme.palette.text.primary
                    }
                    strokeWidth={3}
                    markerEnd={type === 'arrow' ? 'url(#arrowhead)' : ''}
                    onClick={handleClick}
                    onDoubleClick={handleDbClick}
                />
            </g>
        );
    },
    (prevProps, nextProps) => {
        return (
            JSON.stringify(prevProps.edge.source) ===
                JSON.stringify(nextProps.edge.source) &&
            JSON.stringify(prevProps.edge.target) ===
                JSON.stringify(nextProps.edge.target) &&
            prevProps.dimension === nextProps.dimension &&
            prevProps.isSelected === nextProps.isSelected
        );
    },
);
