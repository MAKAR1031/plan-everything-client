const initialState = [];

export default function projects(state = initialState, action) {
    switch (action.type) {
        case 'PROJECTS_LOADED':
            return action.data;
        default:
            return state;
    }
}
