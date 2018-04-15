const initialState = localStorage.getItem('token') ? localStorage.getItem('token') : '';

export default function token(state = initialState, action) {
    switch (action.type) {
        case 'AUTHORIZATION_SUCCESS':
            if (action.token !== '') {
                localStorage.setItem('token', action.token);
            }
            return action.token;
        default:
            return state;
    }
}
