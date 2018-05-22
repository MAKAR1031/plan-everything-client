import alertify from 'alertify.js';

export function handleError(reason) {
    if (reason.response.data.message) {
        alertify.error(reason.response.data.message);
    } else {
        alertify.error('Unable perform action');
        console.log(reason);
    }
}