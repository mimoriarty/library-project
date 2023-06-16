import { getFilteredList, getSearchedList } from '../utils/utils';
import { bookListCat } from '../constants';

export const TOGGLE_LOGIN_MODAL = 'APP/LOGIN/TOGGLE';
export const TOGGLE_USER_MODAL = 'APP/USER/TOGGLE';
export const TOGGLE_BOOK_MODAL = 'APP/BOOK/TOGGLE';
export const REQUEST_BOOK_RETURN = 'APP/BOOK/RETURN';
export const TOGGLE_NOTIFICATION = 'APP/NOTIFICATION/TOGGLE';
export const LOGIN_USER = 'APP/USER/LOGIN';
export const LOGOUT_USER = 'APP/USER/LOGOUT';
export const LOAD_USER = 'APP/USER/LOAD';
export const LOAD_USERS = 'APP/USERS/LOAD';
export const RELOAD_USERS = 'APP/USERS/RELOAD';
export const CHANGE_LIST_CAT = 'APP/BOOKS/LIST/FILTER';
export const LOAD_BOOKS = 'APP/BOOKS/LOAD';
export const SEARCH_BOOKS = 'APP/BOOKS/SEARCH';
export const RELOAD_BOOKS = 'APP/BOOKS/RELOAD';
export const TOGGLE_BOOK_DETAIL_MODAL = 'APP/BOOKS/DETAIL/TOGGLE';
export const LOAD_REQUESTS = 'APP/REQUESTS/LOAD';

export const initialState = {
loggedIn: null, // id of user logged in
  users: [], // list of user objects
  books: [], // list of books
  requestedBooks: [], // list of books requested to members
  user: {}, // logged in object user data
  notification: {}, // object notification data
  loginModalOpen: false, // login modal status
  userModalOpen: false, // user modal status
  bookModalOpen: false, // book modal status
  notificationOpen: false, //toggle notification
  bookCardOpen: false, // toggle book card detail modal
  selectedCat: bookListCat[0].id, // selected book list filter
  filteredBooks: [], // book list filter,
  reloadBooks: false, // reload book list
  reloadUsers: false, // reload users list
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
    case TOGGLE_BOOK_MODAL:
      return {
        ...state,
        bookModalOpen: !state.bookModalOpen,
      };
    case REQUEST_BOOK_RETURN:
      return {
        ...state,
        requestedBooks: [...state.requestedBooks, { book: { id: action.bookId }, user: { id: state.user.id }}],
      }
    case TOGGLE_NOTIFICATION:
      return {
        ...state,
        notificationOpen: !state.notificationOpen,
        notification: action.notification,
      };
    case TOGGLE_BOOK_DETAIL_MODAL:
      return {
        ...state,
        bookCardOpen: !state.bookCardOpen,
      }
    case LOGIN_USER:
      return {
        ...state,
        loggedIn: action.user?.id || null,
        user: action.user,
      };
    case LOGOUT_USER:
      return {
        ...state,
        user: {},
        loggedIn: false,
      }
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
    case CHANGE_LIST_CAT:
      return {
        ...state,
        selectedCat: action.id,
        filteredBooks: getFilteredList(state.books, action.id),
      }
    case SEARCH_BOOKS:
      return {
        ...state,
        filteredBooks: getSearchedList(state.books, action.str),
      }
    case RELOAD_BOOKS:
      return {
        ...state,
        reloadBooks: !state.reloadBooks,
      }
    case RELOAD_USERS:
      return {
        ...state,
        reloadUsers: !state.reloadUsers,
      }
    case LOAD_REQUESTS:
      return {
        ...state,
        requestedBooks: action.requests,
      }
    default:
      break;
  }
};