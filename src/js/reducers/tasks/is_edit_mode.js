const initialState = false;

export default function isEditMode(state = initialState, action) {
    switch (action.type) {
        case 'START_CREATE_NEW_TASK':
            return false;
        case 'START_EDIT_TASK':
            return true;
        default:
            return state;
    }
}