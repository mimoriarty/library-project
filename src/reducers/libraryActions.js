import {
  LOGIN_USER,
  LOGOUT_USER,
  LOAD_USERS,
  LOAD_USER,
  TOGGLE_LOGIN_MODAL,
  TOGGLE_USER_MODAL,
  TOGGLE_BOOK_MODAL,
  TOGGLE_NOTIFICATION,
  TOGGLE_BOOK_DETAIL_MODAL,
  LOAD_BOOKS,
  CHANGE_LIST_CAT,
  SEARCH_BOOKS,
  RELOAD_BOOKS,
  RELOAD_USERS,
} from './libraryReducer';

export const loginUser = user => ({
  type: LOGIN_USER,
  user,
});

export const logOutUser = () => ({
  type: LOGOUT_USER
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

export const toggleBookModal = () => ({
  type: TOGGLE_BOOK_MODAL,
});

export const toggleNotification = notification => ({
  type: TOGGLE_NOTIFICATION,
  notification,
});

export const toggleBookDetailModal = () => ({
  type: TOGGLE_BOOK_DETAIL_MODAL,
});

export const loadBooks = books => ({
  type: LOAD_BOOKS,
  books,
});

export const changeListCat = id => ({
  type: CHANGE_LIST_CAT,
  id,
});

export const searchBooks = str => ({
  type: SEARCH_BOOKS,
  str,
});

export const reloadBooks = () => ({
  type: RELOAD_BOOKS,
});

export const reloadUsers = () => ({
  type: RELOAD_USERS,
});