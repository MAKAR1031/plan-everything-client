const initialState = null;

export default function selected(state = initialState, action) {
    switch (action.type) {
        case 'TAG_SELECTED':
            return action.tag;
        case 'LOGOUT':
            return initialState;
        default:
            return state;
    }
};