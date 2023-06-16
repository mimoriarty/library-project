import { useLocation, NavLink } from 'react-router-dom';
import { useLibrary } from '../library/Library';
import { findBy, sortByDate, getHumanDate, getBorrowDaysUntilPenalty } from '../utils/utils';
import './Book.css';

export default function Book() {
  const location = useLocation();
  const [state] = useLibrary();
  const { books = [], user = {} } = state;
  const book = findBy(books, 'id', location?.state?.bookId) || {};
  const history = (user.history || []).filter(his => his.id === location?.state?.bookId).sort(sortByDate) || {};

  return (
    <>
      <div className='back-action mb-4 mr-4'>
        <NavLink to='/home'>Back to home</NavLink>
      </div>
      {Boolean(book.name) ?
      <div className='tile is-ancestor'>
        <div className='tile is-vertical is-8'>
          <div className='tile'>
            <div className='tile is-parent is-vertical'>
              <article className='tile is-child notification is-primary is-light'>
                <p className='title'>{book.name}</p>
                <p className='subtitle'>{book.author}</p>
                <div className='content'>
                  <p>{book.shortDescription}</p>
                </div>
              </article>
              <article className='tile is-child notification is-warning'>
                <p className='title is-4'>Status</p>
                <p className='subtitle'>{
                  Boolean(history[0]?.completed)
                    ? 'You have already finished reading it'
                    : 'Borrowed, you should be reading right now!!'
                }</p>
                {Boolean(history[0]?.completed)
                  ? <p>Finished on ${getHumanDate(history[0]?.returnedDate)}</p>
                  : <p>This book should be <strong>returned in {getBorrowDaysUntilPenalty(history[0]?.borrowedDate)} days</strong>.</p>
                }
              </article>
            </div>
            <div className='tile is-parent'>
              <article className='tile is-child notification is-info'>
                <p className='title is-4'>Published by {book.publisher || 'Book cover'}</p>
                {book.ISBN && <p>ISBN - {book.ISBN}</p>}
                {book.pages && <p>{book.pages} pages</p>}
                <figure className='image is-3by5 mt-4'>
                  <img src={book.image || 'https://bulma.io/images/placeholders/480x800.png'} alt='book cover' />
                </figure>
              </article>
            </div>
          </div>
          <div className='tile is-parent'>
            <article className='tile is-child notification is-danger is-light'>
              <p className='title is-4'>Borrow history</p>
              {Boolean(history.length) && history.map((his, i) =>
              <p className='history-date' key={i + his.borrowedDate}>
                <strong>{i+1}.</strong> {getHumanDate(his.borrowedDate)} - {getHumanDate(his.returnedDate)}
              </p>
              )}
            </article>
          </div>
        </div>
        <div className='tile is-parent'>
          <article className='tile is-child notification is-success is-light'>
            <div className='content'>
              <p className='subtitle'>Availability</p>
              <p><strong>Book is in {book.isAvailable ? 'good' : 'bad'} condition.</strong></p>
            </div>
          </article>
        </div>
      </div>
      : <p>Nothig to see here!!</p>}
    </>
  );
}