import { useNavigate } from 'react-router-dom';
import { useLibrary } from '../library/Library';
import { toggleLoginModal } from '../reducers/libraryActions';
import UserBadge from '../components/UserBadge';
import List from '../components/layout/List';
import { getJoinedDate } from '../utils/utils';
import digitalLibrary from '../assets/images/digital-library.png';
import './Home.css';

export default function Home() {
  const [state, dispatch] = useLibrary();
  const navigate = useNavigate();
  const { loggedIn, user, books } = state;
  const reading = user?.history?.filter(book => !book.completed)
    .map(({ id, borrowedDate }) => {
      const { name } = books.find(book => book.id === id);

      return {
        name,
        borrowedDate,
      };
    });
  const completed = user?.history?.filter(book => book.completed)
    .map(({ id, returnedDate }) => {
      const { name } = books.find(book => book.id === id);

      return {
        name,
        returnedDate,
      };
    });
  const handleToggleModal = () => {
    dispatch(toggleLoginModal());
  };

  return (
    <div>
      {Boolean(loggedIn) && <UserBadge user={user} />}
      <div className={'notification is-info ' + (!Boolean(loggedIn) ? 'is-active' : '')}>
        <button className='delete'></button>
        Public version, please <button className='button-link'><strong onClick={handleToggleModal}>Log in</strong></button>, to access your dashboard.
      </div>
      {!Boolean(loggedIn) && <section className='card content m-6'>
        <div className='card-image pt-4'>
          <figure className='image is-4by3'>
            <img src={digitalLibrary} alt='Kerberos Library Logo' />
          </figure>
        </div>
        <div className='card-content'>
          <p>Kerberos is a digital library application where you can borrow any book ever written, no licences, no charges, just because we love people who reads without paper. Trees are living things not just books getting dust!<br/> Enjoy your reading.</p>
          <button className='button is-primary' onClick={() => navigate('/signup')}>
            <strong>Sign up</strong>
          </button>
        </div>
      </section>}
      {Boolean(loggedIn) && <section className='status-section'>
        <p className='subtitle is-5'>{user.firstName}'s Status</p>
        <ul>
          {Boolean(user.createDate) && <li>
            you joined {getJoinedDate(user.createDate)} &#129395;.
          </li>}
          <li><strong>{user.bookCount}</strong> books borrowed pending of return.</li>
          {Boolean(user.hasPenaltyOngoing) && <li className='penalty'>
            &#129324; A penalty has been placed on your account, <strong>you cannot borrow any more</strong> from Kerberos until the penalty has been resolved, please ask a librarian if you need more info on this subject.
          </li>}
        </ul>
      </section>}
      {reading?.length > 0 &&
        <List
          title='Book reading'
          items={reading}
          handleClick={() => navigate('/books')}
        />
      }
      {completed?.length > 0 &&
        <List
          title='Already finished'
          items={completed}
          handleClick={() => navigate('/books')}
        />
      }
    </div>
  );
}