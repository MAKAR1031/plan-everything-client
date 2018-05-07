const initialState = null;

export default function selected(state = initialState, action) {
    switch (action.type) {
        case 'MEMBER_SELECTED':
            return action.member;
        case 'PROJECT_SELECTED':
        case 'LOGOUT':
            return initialState;
        default:
            return state;
    }
}