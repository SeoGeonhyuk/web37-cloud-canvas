import { useDimensionContext } from '@contexts/DimensionContext';
import { Bounds } from '@types';
import { generateRandomRGB, gridToScreen3d, screenToGrid2d } from '@utils';
import { useMemo } from 'react';

type Props = {
    bounds: Bounds;
    stroke: string;
};

const Region3D = ({ bounds, stroke }: Props) => {
    const topLeftGrid = screenToGrid2d({ x: 0, y: 0 });
    const topRightGrid = screenToGrid2d({ x: bounds.width, y: 0 });
    const bottomRightGrid = screenToGrid2d({
        x: bounds.width,
        y: bounds.height,
    });
    const bottomLeftGrid = screenToGrid2d({ x: 0, y: bounds.height });

    const point1 = gridToScreen3d({
        col: topLeftGrid.col + 1,
        row: topLeftGrid.row,
    });
    const point2 = gridToScreen3d({
        col: topRightGrid.col + 1,
        row: topRightGrid.row,
    });
    const point3 = gridToScreen3d({
        col: bottomRightGrid.col + 1,
        row: bottomRightGrid.row,
    });
    const point4 = gridToScreen3d({
        col: bottomLeftGrid.col + 1,
        row: bottomLeftGrid.row,
    });

    const points = `
        ${point1.x} ${point1.y}, 
        ${point2.x} ${point2.y}, 
        ${point3.x} ${point3.y}, 
        ${point4.x} ${point4.y}
    `;
    return (
        <polygon
            points={points}
            stroke={stroke}
            strokeWidth="8"
            fill="none"
        ></polygon>
    );
};

const Region2D = ({ bounds, stroke }: Props) => {
    const points = `0 0, 0 ${bounds.height}, ${bounds.width} ${bounds.height}, ${bounds.width} 0`;
    return (
        <polygon
            points={points}
            stroke={stroke}
            strokeWidth="8"
            fill="none"
        ></polygon>
    );
};

export default ({ bounds }: Pick<Props, 'bounds'>) => {
    const { dimension } = useDimensionContext();
    const stroke = useMemo(() => generateRandomRGB(), []);

    return dimension === '2d' ? (
        <Region2D bounds={bounds} stroke={stroke} />
    ) : (
        <Region3D bounds={bounds} stroke={stroke} />
    );
};
