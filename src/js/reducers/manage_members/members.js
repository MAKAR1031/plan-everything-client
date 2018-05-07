const initialState = null;

export default function members(state = initialState, action) {
    switch (action.type) {
        case 'MEMBERS_LOADED':
            return action.members;
        case 'PROJECT_SELECTED':
        case 'LOGOUT':
            return initialState;
        default:
            return state;
    }
};