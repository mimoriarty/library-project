export const TOGGLE_LOGIN_MODAL = 'APP/LOGIN/TOGGLE';
export const TOGGLE_USER_MODAL = 'APP/USER/TOGGLE';
export const TOGGLE_NOTIFICATION = 'APP/NOTIFICATION/TOGGLE';
export const LOGIN_USER = 'APP/USER/LOGIN';
export const LOAD_USERS = 'APP/USERS/LOAD';
export const LOAD_USER = 'APP/USER/LOAD';
export const LOAD_BOOKS = 'APP/BOOKS/LOAD';

/**
 * notification types: danger, primary, warning
 */

export const initialState = {
  loggedIn: null, // id of user logged in
  users: [], // list of user objects
  library: [],
  user: {}, // logged in object user data
  notification: {}, // object notification data
  loginModalOpen: false, // login modal status
  userModalOpen: false, // user modal status
  notificationOpen: false, //toggle notification
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
    case TOGGLE_NOTIFICATION:
      return {
        ...state,
        notificationOpen: !state.notificationOpen,
        notification: action.notification,
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
      case LOAD_USER:
        return {
          ...state,
          user: action.user,
        };
      case LOAD_BOOKS:
        return {
          ...state,
          books: action.books,
        }
    default:
      break;
  }
};