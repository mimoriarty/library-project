export const TOGGLE_LOGIN_MODAL = 'APP/LOGIN/TOGGLE';
export const TOGGLE_USER_MODAL = 'APP/USER/TOGGLE';
export const LOGIN_USER = 'APP/USER/LOGIN';
export const LOAD_USERS = 'APP/USERS/LOAD';

export const initialState = {
  loggedIn: null,
  users: [],
  library: [],
  user: null,
  loginModalOpen: false,
  userModalOpen: false,
};

export const LibraryReducer = (state = initialState, action) => {
  switch (action.type) {
    case TOGGLE_LOGIN_MODAL:
      return {
        ...state,
        loginModalOpen: !state.loginModalOpen,
      };
    case TOGGLE_USER_MODAL:
      return {
        ...state,
        userModalOpen: !state.userModalOpen,
      };
    case LOGIN_USER:
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