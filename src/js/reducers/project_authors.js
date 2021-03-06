const initialState = {};

export default function projectsAuthors(state = initialState, action) {
    switch (action.type) {
        case 'AUTHOR_LOADED':
            return {
                ...state,
                [action.project]: action.author
            };
        case 'LOGOUT':
            return initialState;
        default:
            return state;
    }
}
