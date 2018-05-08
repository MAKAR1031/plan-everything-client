const initialState = null;

export default function members(state = initialState, action) {
    switch (action.type) {
        case 'MEMBERS_LOADED':
            return action.members;
        case 'MEMBER_ADDED':
            return {
                ...state,
                ...{
                    _embedded: {
                        projectMembers: [
                            ...state._embedded.projectMembers,
                            action.member
                        ]
                    }
                }
            };
        case 'PROJECT_SELECTED':
        case 'LOGOUT':
            return initialState;
        default:
            return state;
    }
};