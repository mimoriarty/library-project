import {
  LOGIN_USER,
  LOAD_USERS,
  LOAD_USER,
  TOGGLE_LOGIN_MODAL,
  TOGGLE_USER_MODAL,
  TOGGLE_NOTIFICATION,
  LOAD_BOOKS,
} from './libraryReducer';

export const loginUser = user => ({
  type: LOGIN_USER,
  user,
});

export const loadUsers = users => ({
  type: LOAD_USERS,
  users,
});

export const loadUser = user => ({
  type: LOAD_USER,
  user,
});

export const toggleLoginModal = () => ({
  type: TOGGLE_LOGIN_MODAL,
});

export const toggleUserModal = () => ({
  type: TOGGLE_USER_MODAL,
});

export const toggleNotification = notification => ({
  type: TOGGLE_NOTIFICATION,
  notification,
});

export const loadBooks = books => ({
  type: LOAD_BOOKS,
  books,
});