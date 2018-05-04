const initialState = null;

export default function projects(state = initialState, action) {
    switch (action.type) {
        case 'PROJECTS_LOADED':
            return action.data;
        case 'NEW_PROJECT_CREATED':
            return {
                ...state,
                ...{
                    _embedded: {
                        projects: [
                            ...state._embedded.projects,
                            action.project
                        ]
                    }
                }
            };
        case 'LOGOUT':
            return initialState;
        default:
            return state;
    }
}
