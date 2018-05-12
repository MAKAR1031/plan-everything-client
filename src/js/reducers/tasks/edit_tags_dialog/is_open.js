const initialState = false;

export default function isOpen(state = initialState, action) {
    switch (action.type) {
        case 'TASK_EDIT_TAGS_DIALOG_OPENED':
            return true;
        case 'TASK_EDIT_TAGS_DIALOG_CLOSED':
            return false;
        default:
            return state;
    }
};