export default function isAuthorized(state, action) {
    switch (action.type) {
        case 'AUTHORIZATION_SUCCESS':
            return true;
        case 'LOGOUT':
            return false;
        default:
            return localStorage.getItem('token') != null;
    }
}
