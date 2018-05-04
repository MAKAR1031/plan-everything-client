const initialState = {};

export default function currentProjectMembers(state = initialState, action) {
    switch (action.type) {
        case 'MEMBER_LOADED':
            return {
                ...state,
                [action.project]: action.member
            };
        case 'LOGOUT':
            return initialState;
        default:
            return state;
    }
}