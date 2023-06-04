import moment from 'moment';
import { PENALTY_SPAN, ALLOWED_BORROW_SPAN } from '../constants';

export const findBy = (list, key, value) => {
  if (list.constructor.name !== 'Array' ||
    typeof key !== 'string' ||
    value === undefined ||
    value === null) return null;
  return (list || []).find(i => i[key] === value);
};

export const getRemainingDays = expiration => {
  const today = moment();
  const expirationDate = moment(expiration);
  const days = expirationDate.diff(today, 'days'); 
  return `${days} day${days > 1 ? 's' : ''}`;
};

export const getPenaltyDate = () => {
  const penaltyDate = moment();
  penaltyDate.add(PENALTY_SPAN, 'days');
  return penaltyDate.format();
};

export const getBorrowLimitDate = () => {
  const penaltyDate = moment();
  penaltyDate.add(ALLOWED_BORROW_SPAN, 'days');
  return penaltyDate.format();
};