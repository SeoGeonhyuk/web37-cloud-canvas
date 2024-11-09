import { Dimension } from '@cloudflow/types';
import {
    createContext,
    PropsWithChildren,
    RefObject,
    useContext,
    useRef,
    useState,
} from 'react';

type FlowContext = {
    flowRef: RefObject<SVGSVGElement>;
    dimension: Dimension;
    changeDimension: (dimension: Dimension) => void;
};
const FlowContext = createContext<FlowContext>({
    flowRef: { current: null },
    dimension: '2d',
    changeDimension: () => {},
});

export const FlowProvider = ({ children }: PropsWithChildren) => {
    const flowRef = useRef<SVGSVGElement>(null);
    const [dimension, setDimension] = useState<Dimension>('2d');

    const changeDimension = (dimension: Dimension) => setDimension(dimension);

    return (
        <FlowContext.Provider value={{ flowRef, dimension, changeDimension }}>
            {children}
        </FlowContext.Provider>
    );
};

export const useFlowContext = () => {
    const context = useContext(FlowContext);
    if (!context) {
        throw new Error('CloudFlowContext : context is undefined');
    }
    return context;
};
