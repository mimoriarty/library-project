import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faCheckCircle, faCircleXmark } from '@fortawesome/free-solid-svg-icons';
import './BookCard.css';

export default function BookCard({ book = {} }) {
  const available = book.isAvailable && Boolean(book.borrowerId);
  const statusIcon = available ? faCheckCircle : faCircleXmark

  return (
    <div className='card'>
      <div className='card-content'>
        <div className='media'>
          <div className='media-left'>
            <figure className='image is-96x96 is-3by5'>
              <img src={book.image || 'https://bulma.io/images/placeholders/1280x960.png'} alt='book cover' />
            </figure>
          </div>
          <div className='media-content'>
            <p className='title is-4'>{book.name}</p>
            <p className='subtitle is-6'>{book.author}</p>
          </div>
        </div>
        <div className='content'>
          {book.publisher && <p className='subtitle is-family-monospace is-7'>Publisher: {book.publisher}</p>}
          {book.ISBN && <p className='subtitle is-family-monospace is-7'>ISBN:{book.ISBN}</p>}
          {book.pages && <p className='subtitle is-family-monospace is-7'>{book.pages} pags</p>}
          <p>{book.shortDescription}</p>
          <br />
          <p>
            <FontAwesomeIcon
              icon={statusIcon}
              className={'small ' + (available ? 'available' : 'not-available')}
            /> {available ? 'Available' : 'Not available'} {Boolean(book.borrowerId) && '| Borrowed'}
          </p>
        </div>
      </div>
    </div>
  );
}