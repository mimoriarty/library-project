import {
  LOGIN_USER,
  LOAD_USERS,
  TOGGLE_LOGIN_MODAL,
  TOGGLE_USER_MODAL,
} from './libraryReducer';

export const loginUser = user => ({
  type: LOGIN_USER,
  user,
});

export const loadUsers = users => ({
  type: LOAD_USERS,
  users,
});

export const toggleLoginModal = () => ({
  type: TOGGLE_LOGIN_MODAL,
});

export const toggleUserModal = () => ({
  type: TOGGLE_USER_MODAL,
});