import './Table.css';
import { bookTags } from '../../constants';

export default function Table({ list, headers }) {
  const getBookTags = book => book.genres.map((gen, i) => <span
    key={i + gen}
    className={'tag ' + bookTags[gen]?.style}
    >
      {gen}
    </span>
  );

  return (
    <table className="table is-narrow">
      <thead>
        <tr>
          {headers.map((head, i) => <th key={i + head.name}>
            {head.abbr ? <abbr title={head.name}>{head.abbr}</abbr> : head.name}
          </th>)}
        </tr>
      </thead>
      <tbody>
        {list && list.map((book, i) => <tr>
          <td>
            {book.name}
          </td>
          <td>
            {book.author}
          </td>
          <td>
            <div className='tags'>
              {getBookTags(book)}
            </div>
          </td>
          <td>
            {Boolean(book.borrowerId) ? <button
              className='button is-link is-light'
              onClick={() => null}
            >
              Pick
            </button> : '-'}
          </td>
        </tr>)}
      </tbody>
    </table>
  );
}