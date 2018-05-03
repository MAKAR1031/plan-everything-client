const initialState = null;

export default function currentProject(state = initialState, action) {
    switch (action.type) {
        case 'PROJECT_SELECTED':
            return action.project;
        default:
            return state;
    }
}