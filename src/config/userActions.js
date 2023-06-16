import { findBy, getBorrowDaysUntilPenalty } from '../utils/utils';
import { PENALTY_SPAN, LIBRARIAN, ALLOWED_BORROW_SPAN } from '../constants';

const EDIT = {
  handler: 'handleUserEdit',
  name: 'Modify',
  description: 'Edit user data',
};
const LOGOUT = {
  handler: 'handleUserLogout',
  name: 'Logout',
  description: 'End user session',
};
const PENALTY = {
  handler: 'handleUserPenalty',
  name: 'Toogle penalty',
  description: `Add/Remove penalty: ${PENALTY_SPAN} days`,
  unableOn: LIBRARIAN,
};
const DELETE = {
  handler: 'handleUserDelete',
  name: 'Delete',
  description: 'Delete user data',
  unableOn: LIBRARIAN,
};
const RETURN = (book) => ({
  handler: 'handleReturnBookRequest',
  params: { bookId: book.id },
  name: 'Request book',
  description: book.name,
  unableOn: LIBRARIAN,
});

export const getReturnableBooks = (user = {}, books = []) => {
  const returnIds = (user.history || [])
    .filter(his => !his.completed && getBorrowDaysUntilPenalty(his.borrowedDate) >= ALLOWED_BORROW_SPAN)
    .map(his => his.id);

  return returnIds.map(bookId => {
    const { name, id } = findBy(books, 'id', bookId);

    return {
      id,
      name,
    }
  });
};

export const getUserActions = (user, loggedUser, books) => {
  const isLibrarian = user.type === LIBRARIAN;
  const isLoggedInUser = user.id === loggedUser.id;
  const isLoggedInLibrarian = loggedUser.type === LIBRARIAN;
  const res = [];

  if (isLoggedInLibrarian || isLoggedInUser) res.push(EDIT);

  if (isLoggedInLibrarian && !isLibrarian) res.push(PENALTY);

  if (isLoggedInLibrarian && !isLibrarian) {
    (getReturnableBooks(user, books) || []).forEach(book => {
      const action = RETURN(book);

      res.push(action);
    });
  }

  if (isLoggedInLibrarian) res.push(DELETE);

  if (isLoggedInUser) res.push(LOGOUT);

  return res;
};
  