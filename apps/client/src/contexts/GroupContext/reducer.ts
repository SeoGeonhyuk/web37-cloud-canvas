import { Group } from '@types';

export type GroupState = {
    groups: Record<string, Group>;
};

export type GroupAction =
    | { type: 'ADD_GROUP'; payload: Group }
    | { type: 'UPDATE_GROUP'; payload: Partial<Group> & { id: string } }
    | { type: 'REMOVE_GROUP'; payload: { id: string } }
    | {
          type: 'REMOVE_NODE_FROM_GROUP';
          payload: { groupId: string; nodeId: string };
      };

export const groupReducer = (
    state: GroupState,
    action: GroupAction,
): GroupState => {
    switch (action.type) {
        case 'ADD_GROUP':
            return {
                ...state,
                groups: {
                    ...state.groups,
                    [action.payload.id]: action.payload,
                },
            };
        case 'UPDATE_GROUP':
            return {
                ...state,
                groups: {
                    ...state.groups,
                    [action.payload.id]: {
                        ...state.groups[action.payload.id],
                        ...action.payload,
                    },
                },
            };
        case 'REMOVE_GROUP': {
            const { id } = action.payload;
            const { [id]: removedGroup, ...remainingGroups } = state.groups;
            return {
                ...state,
                groups: remainingGroups,
            };
        }
        case 'REMOVE_NODE_FROM_GROUP': {
            const { groupId, nodeId } = action.payload;
            return {
                ...state,
                groups: {
                    ...state.groups,
                    [groupId]: {
                        ...state.groups[groupId],
                        nodeIds: state.groups[groupId].nodeIds.filter(
                            (id) => id !== nodeId,
                        ),
                    },
                },
            };
        }
        default:
            return state;
    }
};
