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
    useLayoutEffect,
    useReducer,
} from 'react';

type GraphContextProps = {
    state: GraphState;
    dispatch: Dispatch<GraphAction>;
};

const CanvasContext = createContext<GraphContextProps | undefined>(undefined);

const initialState = {
    viewBox: { x: 0, y: 0, width: 0, height: 0 },
};

export const GraphProvider = ({ children }: { children: ReactNode }) => {
    const [state, dispatch] = useReducer(graphReducer, initialState);

    useLayoutEffect(() => {
        const svg = document.getElementById('cloud-graph');
        if (!svg) return;
        const updateViewBoxSize = () => {
            dispatch({
                type: 'SET_VIEWBOX',
                payload: {
                    x: state.viewBox.x || 0,
                    y: state.viewBox.y || 0,
                    width: state.viewBox.width || svg.clientWidth,
                    height: state.viewBox.height || svg.clientHeight,
                },
            });
        };
        updateViewBoxSize();
        window.addEventListener('resize', updateViewBoxSize);

        return () => {
            window.removeEventListener('resize', updateViewBoxSize);
        };
    }, []);
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
