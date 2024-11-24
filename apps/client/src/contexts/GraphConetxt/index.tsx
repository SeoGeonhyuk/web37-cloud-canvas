import {
    GraphAction,
    graphReducer,
    GraphState,
} from '@contexts/GraphConetxt/reducer';
import {
    createContext,
    Dispatch,
    ReactNode,
    useContext,
    useReducer,
} from 'react';

type GraphContextProps = {
    state: GraphState;
    dispatch: Dispatch<GraphAction>;
};

const CanvasContext = createContext<GraphContextProps | undefined>(undefined);

const initialState = {
    viewBox: { x: 0, y: 0, width: 1000, height: 1000 },
};

export const GraphProvider = ({ children }: { children: ReactNode }) => {
    const [state, dispatch] = useReducer(graphReducer, initialState);

    return (
        <CanvasContext.Provider value={{ state, dispatch }}>
            {children}
        </CanvasContext.Provider>
    );
};

export const useGraphContext = () => {
    const context = useContext(CanvasContext);
    if (!context) {
        throw new Error('GraphContext: context is undefined');
    }
    return context;
};
