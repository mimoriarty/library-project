import { useState } from 'react';
import { useLibrary } from '../library/Library';
import {
  toggleBookDetailModal,
  toggleBookModal,
  toggleNotification,
  loadUser,
  loadUsers,
  loadBooks,
} from '../reducers/libraryActions';
import { updateUser } from '../services/user';
import { updateBook } from '../services/library';
import { findBy } from '../utils/utils';
import Table from '../components/layout/Table';
import Modal from '../components/layout/Modal';
import BookCard from '../components/BookCard';
import { ALLOWED_BORROW_BOOKS } from '../constants';
import Book from '../components/forms/Book';

const headers = [
  { name: 'Title' },
  { name: 'Author', abbr: 'Aut' },
  { name: 'Genre', abbr: 'Gnr'},
  { name: 'Pages', abbr: 'Pg', class: 'desktop'},
  { name: 'Publisher' ,abbr: 'Pbs', class: 'desktop'},
  { name: 'Availability', abbr: 'Av'},
];
const initialValues = {
  name: '',
  shortDescription: '',
  pages: null,
  ISBN: '',
  author: '',
  publisher: '',
  genres: [],
  image: '',
  isAvailable: false,
}

export default function Books() {
  const [state, dispatch] = useLibrary();
  const { books, bookCardOpen, bookModalOpen, user, users } = state;
  const [bookDetail, setBookDetail] = useState((books || [])[0]);
  const [formValues, setFormValues] = useState(initialValues);
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

  return(
    <>
    <Modal
        isOpen={bookModalOpen}
        toggleFn={handleToggleBookModal}
        submitFn={() => null}
        title='Book'
        controls={true}
        okButton='Save'
      >
        <Book book={formValues} />
      </Modal>
      <Modal
        isOpen={bookCardOpen}
        toggleFn={handleToggleBookCardModal}
        submitFn={() => null}
        title='Books details'
        controls={false}
        okButton='Save'
      >
        <BookCard book={bookDetail} />
      </Modal>
      <h2 className='title is-4'>Books list</h2>
      <Table
        list={books}
        headers={headers}
        toggleDetailFn={handleToggleBookCardModal}
        user={user}
        borrowFn={handleBorrowBook}
        returnFn={handleReturnBook}
        editFn={handleEditBook}
      />
    </>
  );
}