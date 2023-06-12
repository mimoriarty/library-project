import { useState } from 'react';
import { useLibrary } from '../library/Library';
import {
  toggleBookDetailModal,
  toggleBookModal,
  toggleNotification,
  loadUser,
  loadUsers,
  loadBooks,
  changeListCat,
  searchBooks,
} from '../reducers/libraryActions';
import { updateUser } from '../services/user';
import { updateBook, deleteBook } from '../services/library';
import { findBy } from '../utils/utils';
import Table from '../components/layout/Table';
import Modal from '../components/layout/Modal';
import BookCard from '../components/BookCard';
import { ALLOWED_BORROW_BOOKS, bookListCat, bookListHeaders } from '../constants';
import Book from '../components/forms/Book';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faSearch } from '@fortawesome/free-solid-svg-icons';
import './Books.css';

const initialValues = {
  name: '',
  shortDescription: '',
  pages: '',
  ISBN: '',
  author: '',
  publisher: '',
  genres: [],
  image: '',
  isAvailable: false,
};
const getMultiSelectValues = (values, value) =>
  values.includes(value) ? values.filter(val => val !== value) : [...values, value];

export default function Books() {
  const [state, dispatch] = useLibrary();
  const {
    books,
    bookCardOpen,
    bookModalOpen,
    user,
    users,
    selectedCat,
    filteredBooks
  } = state;
  const [bookDetail, setBookDetail] = useState((books || [])[0]);
  const [formValues, setFormValues] = useState(initialValues);
  const [searchValue, setSearchValue] = useState('');
  const handleToggleBookCardModal = bookId => {
    if (bookId) setBookDetail(findBy(books, 'id', bookId));
    dispatch(toggleBookDetailModal());
  };
  const handleToggleBookModal = () => dispatch(toggleBookModal())
  const handleReturnBook = (e, book) => {
    e.preventDefault();
    e.stopPropagation();

    const newUserState = {
      ...user,
      bookCount: user.bookCount + 1,
      history: user.history.map(his => {
        if (his.id !== book.id) return his;

        return {
          ...his,
          returnedDate: new Date().toISOString(),
          completed: true,
        }
      }),
    };
    const newBookState = {
      ...book,
      borrowerId: null,
    };
    const newUsersState = users.map(user => user.id === newUserState.id ? newUserState : user);
    const newBooksState = books.map(book => book.id === newBookState.id ? newBookState : book);

    dispatch(loadUser(newUserState));
    dispatch(loadUsers(newUsersState));
    dispatch(loadBooks(newBooksState));
    updateBook(newBookState);
    updateUser(newUserState);

    return dispatch(toggleNotification({
      type: 'primary',
      message: 'Book returned successfully!!',
    }));
  };
  const handleBorrowBook = (e, book) => {
    e.preventDefault();
    e.stopPropagation();

    if (user.hasPenaltyOngoing || user.bookCount >= ALLOWED_BORROW_BOOKS) {
      return dispatch(toggleNotification({
        type: 'danger',
        message: 'This user cannot borrow more books. <strong>Please, ask a librarian about this issue!!</strong>',
      }));
    }

    const newUserState = {
      ...user,
      bookCount: user.bookCount + 1,
      history: [...user.history, {
        id: book.id,
        completed: false,
        borrowedDate: new Date().toISOString(),
        returnedDate: null,
      }],
    };
    const newBookState = {
      ...book,
      borrowerId: newUserState.id,
    };
    const newUsersState = users.map(user => user.id === newUserState.id ? newUserState : user);
    const newBooksState = books.map(book => book.id === newBookState.id ? newBookState : book);

    dispatch(loadUser(newUserState));
    dispatch(loadUsers(newUsersState));
    dispatch(loadBooks(newBooksState));
    updateBook(newBookState);
    updateUser(newUserState);

    return dispatch(toggleNotification({
      type: 'primary',
      message: 'Book borrowed successfully!!',
    }));
  };
  const handleEditBook = (e, book) => {
    e.preventDefault();
    e.stopPropagation();

    setFormValues(book);
    handleToggleBookModal();
  };
  const handleFormChange = ({ target }) => {
    const { type, value, name, checked } = target;
    const val = type === 'checkbox'
      ? Boolean(checked)
      : type === 'select-multiple'
        ? getMultiSelectValues(formValues.genres, value)
        : value;

    setFormValues({
      ...formValues,
      [name]: val,
    });
  };
  const handleRemoveBook = id => {
    const newBooksState = books.filter(book => book.id !== id);

    handleToggleBookModal();
    setFormValues(initialValues);
    dispatch(loadBooks(newBooksState));
    deleteBook(id);
  };
  const handleSubmitModalBook = () => {
    if (formValues.id) {
      const newBooksState = books.map(book =>
        book.id === formValues.id ? { ...book, ...formValues } : book);
      const newBookState = books.find(book => book.id === formValues.id);

      handleToggleBookModal();
      setFormValues(initialValues);
      dispatch(loadBooks(newBooksState));
      updateBook(newBookState);
    } else {
      // TODO: add book implementation
    }
  };
  const handleChangeCat = id => {
    dispatch(changeListCat(id))
  };
  const handleBookSearch = e => {
    const val = e.target.value;
    setSearchValue(val);

    if (!searchValue || searchValue.length < 3) {
      dispatch(changeListCat('all'));
      dispatch(loadBooks(books));
    };

    dispatch(searchBooks(searchValue));
  }

  return (
    <>
      <Modal
        isOpen={bookModalOpen}
        toggleFn={handleToggleBookModal}
        submitFn={handleSubmitModalBook}
        deleteFn={handleRemoveBook}
        title='Book'
        controls={true}
        okButton='Save'
      >
        <Book book={formValues} handleChangeFn={handleFormChange} />
      </Modal>
      <Modal
        isOpen={bookCardOpen}
        toggleFn={handleToggleBookCardModal}
        submitFn={() => null} // controls is disabled, no need to implement a submit fn
        title='Books details'
        controls={false}
        okButton='Save'
      >
        <BookCard book={bookDetail} />
      </Modal>
      <nav className='panel'>
        <p className='panel-header'>Books list</p>
        <div className='is-flex is-flex-direction-column panel-block'>
          <p className='control has-icons-left'>
            <input
              className='input'
              type='text'
              placeholder='Search'
              value={searchValue}
              onChange={handleBookSearch}
            />
            <span className='icon is-left'>
              <FontAwesomeIcon icon={faSearch} className='small' />
            </span>
          </p>
          <p className='help is-info is-align-self-flex-start'>You need to write at leas 3 characters</p>
        </div>
        <p className='panel-tabs'>
          {bookListCat.map((cat, i) =>
            <span
              key={i + '-' + cat.id}
              className={selectedCat === cat.id ? 'is-active' : ''}
              onClick={() => handleChangeCat(cat.id)}
            >
              {cat.id}
            </span>
          )}
        </p>
      </nav>
      <Table
        list={filteredBooks}
        headers={bookListHeaders}
        toggleDetailFn={handleToggleBookCardModal}
        user={user}
        borrowFn={handleBorrowBook}
        returnFn={handleReturnBook}
        editFn={handleEditBook}
      />
    </>
  );
}