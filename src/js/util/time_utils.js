import moment from 'moment';

export const parseTime = (time) => moment(time, 'YYYY-MM-DDTHH:mm:ss.SSSZ').format('DD.MM.YYYY HH:mm');

export const parseDate = (date) => moment(date, 'YYYY-MM-DDTHH:mm:ss.SSSZ').format('DD.MM.YYYY');