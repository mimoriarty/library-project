import moment from 'moment';
import { PENALTY_SPAN, ALLOWED_BORROW_SPAN } from '../constants';

const __getPenaltyMomentDate = () => {
  const penaltyDate = moment();
  penaltyDate.add(ALLOWED_BORROW_SPAN, 'days');

  return penaltyDate;
};

export const findBy = (list, key, value) => {
  if (list.constructor.name !== 'Array' ||
    typeof key !== 'string' ||
    value === undefined ||
    value === null) return null;
  return (list || []).find(i => i[key] === value);
};

export const getJoinedDate = create => {
  const today = moment();
  const createDate = moment(create);
  let diff = today.diff(createDate, 'years');

  if (diff > 0) return `${diff} years ago`;

  diff = today.diff(createDate, 'months');

  if (diff > 0) return `${diff} months ago`;

  diff = today.diff(createDate, 'years');
  
  return `${diff} days ago`;
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
  return __getPenaltyMomentDate().format();
};

export const getBorrowDaysUntilPenalty = borrow => {
  const penaltyDate = __getPenaltyMomentDate();
  const borrowDate = moment(borrow);
  return penaltyDate.diff(borrowDate, 'days');
};

export const getHumanDate = date => {
  return date ? moment(date).format('MMMM Do YYYY') : null;
};

export const getFilteredList = (list, id) => id === 'all'
  ? list
  : list.filter(book => Boolean(book[id]));

export const getSearchedList = (list, str) => list.reduce((acc, act) => {
  const { name, author, publisher, genres } = act;

  return [name, author, publisher, ...genres].some(key => key.toLowerCase().includes(str))
    ? [...acc, act] : acc;
}, []);

export const sortByDate = (a, b) => moment(b.borrowedDate).unix() - moment(a.borrowedDate).unix();