import { PENALTY_SPAN, LIBRARIAN } from '../constants';

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

export const getUserActions = (user, loggedUser) => {
  const isLibrarian = user.type === LIBRARIAN;
  const isLoggedInUser = user.id === loggedUser.id;
  const isLoggedInLibrarian = loggedUser.type === LIBRARIAN;
  const res = [];

  if (isLoggedInLibrarian || isLoggedInUser) res.push(EDIT);

  if (isLoggedInLibrarian && !isLibrarian) res.push(PENALTY);

  if (isLoggedInLibrarian) res.push(DELETE);

  if (isLoggedInUser) res.push(LOGOUT);

  return res;
};
  