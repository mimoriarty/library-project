export const LOGGIN_USER = 'APP/USER/LOGGIN';
export const LOAD_USERS = 'APP/USERS/LOAD';

export const initialState = {
  loggedIn: null,
  users: [],
  library: [],
  user: null,
};

const findBy = (list, key, val) => {
  if (!list || list.length === 0 || !key || !list[key] || !val) return null;

  return list.find(item => item[key] === val);
};

export const LibraryReducer = (state = initialState, action) => {
  switch (action.type) {
    case LOGGIN_USER:
      const user = state.users.find(({password, name}) =>
        name === action.user.name && password === action.user.password);
      return {
        ...state,
        loggedIn: user?.id || null,
        user,
      };
    case LOAD_USERS:
      return {
        ...state,
        users: action.users,
      };
    default:
      break;
  }
};