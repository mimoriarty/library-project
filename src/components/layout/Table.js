import './Table.css';
import { LIBRARIAN, bookTags } from '../../constants';

export default function Table({
  list,
  headers,
  toggleDetailFn,
  borrowFn,
  returnFn,
  editFn,
  user,
}) {
  const isSession = Boolean(user.id);
  const isLibrarian = user?.type === LIBRARIAN;
  const getBookTags = book => book.genres.map((gen, i) => <span
    key={i + gen}
    className={'tag ' + bookTags[gen]?.style}
    >
      {gen}
    </span>
  ); 
  const getCtaType = (book) => {
    if (isSession && user.id === book.borrowerId) {
      return { type: 'Return', handler: returnFn };
    }

    if (!Boolean(book.borrowerId) && book.isAvailable && isSession && !isLibrarian) {
      return { type: 'Borrow', handler: borrowFn };
    }

    if (isSession && isLibrarian) {
      return { type: 'Edit', handler: editFn };
    }

    return { type: null, handler: null };
  };

  return (
    <div className='container'>
      <table className="table is-narrow">
        <thead>
          <tr>
            {headers.map((head, i) => <th key={i + head.name} className={head.class}>
              {head.abbr ? <abbr
                title={head.name}
              >
                {head.abbr}
              </abbr> : head.name}
            </th>)}
          </tr>
        </thead>
        <tbody>
          {list && list.map((book, i) => <tr
          key={i + '-book-' + book.id}
            onClick={() => toggleDetailFn(book.id)}
          >
            <td>
              {book.name}
            </td>
            <td>
              {book.author}
            </td>
            <td className='desktop'>
              {book.pages}
            </td>
            <td className='desktop'>
              {book.publisher}
            </td>
            <td>
              <div className='tags level-item'>
                {getBookTags(book)}
              </div>
            </td>
            <td>
              {getCtaType(book).type ? <button
                className='button is-primary is-light is-small'
                onClick={(e) => getCtaType(book).handler(e, book)}
              >
                {getCtaType(book).type}
              </button> : '-'}
            </td>
          </tr>)}
        </tbody>
      </table>
    </div>
  );
}