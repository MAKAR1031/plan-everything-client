const initialState = false;

export default function step(state = initialState, action) {
    switch (action.type) {
        case 'TASK_STEP_REPORT_DIALOG_OPENED':
            return action.step;
        case 'TASK_STEP_REPORT_DIALOG_CLOSED':
            return initialState;
        default:
            return state;
    }
};