export default function isAuthorized(state, action) {
    switch (action.type) {
        case 'AUTHORIZATION_SUCCESS':
            return true;
        case 'AUTHORIZATION_FAILED':
        case 'LOGOUT':
            return false;
        default:
            return localStorage.getItem('token') != null;
    }
}
