import { bookTags } from '../../constants';
import './Book.css';

const genresOptions = Object.keys(bookTags).map((gen, i) =>
  <option key={i + '-' + gen} value={gen}>{gen}</option>)

export default function Book({ book, handleChangeFn }) {
  return(
    <>
      <div className='cover-input'>
        <figure className='image'>
          <img
            src={book.image || 'https://bulma.io/images/placeholders/480x800.png'}
            alt='book cover'
          />
        </figure>
      </div>
      <div className='field image-field'>
        <p>Paste image url</p>
        <input
          className='input'
          type='text'
          name='image'
          value={book.image}
          onChange={handleChangeFn}
        />
      </div>
      <div className='field'>
        <label className='label'>Title</label>
        <div className='control'>
          <input
            className='input'
            type='text'
            name='name'
            value={book.name}
            placeholder='Book title'
            onChange={handleChangeFn}
          />
        </div>
      </div>
      <div className='field'>
        <label className='label'>Author</label>
        <div className='control'>
          <input
            className='input'
            type='text'
            name='author'
            value={book.author}
            placeholder='Author'
            onChange={handleChangeFn}
          />
        </div>
      </div>
      <div className='field'>
        <label className='label'>Description</label>
        <div className='control'>
          <textarea
            className='textarea'
            type='text'
            name='shortDescription'
            value={book.shortDescription}
            placeholder='Summarized description'
            onChange={handleChangeFn}
          ></textarea>
        </div>
      </div>
      <div className='field'>
        <label className='label'>Publisher</label>
        <div className='control'>
          <input
            className='input'
            type='text'
            name='publisher'
            value={book.publisher}
            placeholder='Publisher'
            onChange={handleChangeFn}
          />
        </div>
      </div>
      <div className='field'>
        <label className='label'>ISBN</label>
        <div className='control'>
          <input
            className='input'
            type='text'
            name='ISBN'
            value={book.ISBN}
            placeholder='ISBN'
            onChange={handleChangeFn}
          />
        </div>
      </div>
      <div className='field'>
        <label className='label'>Pages</label>
        <div className='control'>
          <input
            className='input'
            type='number'
            name='pages'
            value={book.pages}
            placeholder='Number of pages'
            onChange={handleChangeFn}
          />
        </div>
      </div>
      <div className='field'>
        <label className='label'>Genres</label>
        <div className='select is-multiple'>
          <select
            multiple
            size={3}
            name='genres'
            value={book.genres}
            onChange={handleChangeFn}
          >
            {genresOptions}
          </select>
        </div>
      </div>
      <div className='field'>
        <label className='checkbox'>
          <input
            type='checkbox'
            name='isAvailable'
            checked={book.isAvailable}
            value={book.isAvailable}
            onChange={handleChangeFn}
          />
            &nbsp;is the book in good condition?
        </label>
      </div>
    </>
  );
}