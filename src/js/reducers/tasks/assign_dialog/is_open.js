const initialState = false;

export default function isOpen(state = initialState, action) {
    switch (action.type) {
        case 'ASSIGN_TASK_DIALOG_OPENED':
            return true;
        case 'ASSIGN_TASK_DIALOG_CLOSED':
            return false;
        default:
            return state;
    }
}