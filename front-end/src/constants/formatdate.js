// utils.js
import moment from 'moment';

export function formatDate(date) {
  if (!date){
    return 'none';
  }
  return moment(date).add(7, 'hours').format('llll');
}
