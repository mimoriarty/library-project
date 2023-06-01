import {
  LOGGIN_USER,
  LOAD_USERS,
} from './libraryReducer';

export const logginUser = user => ({
  type: LOGGIN_USER,
  user,
});

export const loadUsers = users => ({
  type: LOAD_USERS,
  users,
});