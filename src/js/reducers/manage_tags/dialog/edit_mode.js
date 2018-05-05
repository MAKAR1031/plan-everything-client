const initialState = false;

export default function isEditMode(state = initialState, action) {
    switch (action.type) {
        case 'TAG_DIALOG_OPENED_IN_EDIT_MODE':
            return true;
        case 'TAG_DIALOG_OPENED_IN_NEW_MODE':
            return false;
        default:
            return state;
    }
};