const initialState = null;

export default function tags(state = initialState, action) {
    switch (action.type) {
        case 'TAGS_LOADED':
            return action.tags;
        case 'TAGS_UPDATED':
            return {
                ...state,
                ...{
                    _embedded: {
                        tags: state._embedded.tags.map(t =>
                            t._links.self.href === action.tag._links.self.href ? action.tag : t)
                    }
                }
            };
        case 'TAG_REMOVED':
            return {
                ...state,
                ...{
                    _embedded: {
                        tags: state._embedded.tags.filter(t => t._links.self.href !== action.tag._links.self.href)
                    }
                }
            };
        case 'LOGOUT':
            return initialState;
        default:
            return state;
    }
};