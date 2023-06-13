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
              key={i + (item.name)}
              onClick={handleClick}
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
            </li>
          )}
        </ul>
      </div>
    </section>
  );
}