const initialState = {};

export default function currentProjectMembers(state = initialState, action) {
    switch (action.type) {
        case 'MEMBER_LOADED':
            return {
                ...state,
                [action.project]: action.member
            };
        default:
            return state;
    }
}