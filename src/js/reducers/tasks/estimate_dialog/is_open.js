const initialState = false;

export default function isOpen(state = initialState, action) {
    switch (action.type) {
        case 'TASK_ESTIMATE_DIALOG_OPENED':
            return true;
        case 'TASK_ESTIMATE_DIALOG_CLOSED':
            return false;
        default:
            return state;
    }
};