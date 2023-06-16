import { getBorrowDaysUntilPenalty, getHumanDate } from '../../utils/utils';
import './List.css';

export default function List({
  title,
  items,
  handleClick,
}) {
  return(
    <section className='list-container m-5'>
      <div className='box'>
        <p className='subtitle is-6'>{title}</p>
        <ul className='list'>
          {items.map((item, i) => 
            <li
              className='list-item is-flex-direction-column'
              key={i + item.name + item.id}
              onClick={() => handleClick(item.id)}
            >
              <p className='list-item-title'>{item.name}</p>
              {Boolean(item.borrowedDate) &&
                <p className='list-item-description'>
                  {getBorrowDaysUntilPenalty(item.returnedDate)} days left on borrow
                </p>
              }
              {Boolean(item.returnedDate) &&
                <p className='list-item-description'>
                  Returned on {getHumanDate(item.returnedDate)}
                </p>
              }
              {Boolean(item.user) &&
                <p className='list-item-description'>
                  Requested to @{item.user} {getHumanDate(item.requestDate)}
                </p>
              }
            </li>
          )}
        </ul>
      </div>
    </section>
  );
}