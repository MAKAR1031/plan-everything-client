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
        case 'MEMBER_EXCLUDED':
            return {
                ...state,
                ...{
                    _embedded: {
                        projectMembers: state._embedded.projectMembers.filter(m =>
                            m._links.self.href !== action.member._links.self.href)
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