const initialState = null;

export default function roles(state = initialState, action) {
    switch (action.type) {
        case 'ACCOUNT_ROLES_LOADED':
            return action.roles;
        case 'LOGOUT':
            return initialState;
        default:
            return initialState;
    }
}