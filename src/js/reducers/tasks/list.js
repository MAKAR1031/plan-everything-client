const initialState = null;

export default function tasks(state = initialState, action) {
    switch (action.type) {
        case 'TASKS_LOADED':
            return action.tasks;
        case 'TASK_CREATED':
            return {
                ...state,
                ...{
                    _embedded: {
                        tasks: [
                            ...state._embedded.tasks,
                            action.task
                        ]
                    }
                }
            };
        case 'TASK_UPDATED':
            return {
                ...state,
                ...{
                    _embedded: {
                        tasks: state._embedded.tasks.map(t =>
                            t._links.self.href === action.task._links.self.href ? action.task : t)
                    }
                }
            };
        case 'TASK_DELETED':
            return {
                ...state,
                ...{
                    _embedded: {
                        tasks: state._embedded.tasks.filter(t => t._links.self.href !== action.task._links.self.href)
                    }
                }
            };
        case 'PROJECT_SELECTED':
        case 'LOGOUT':
            return initialState;
        default:
            return state;
    }
}