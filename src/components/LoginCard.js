import { NavLink } from 'react-router-dom';
import { useLibrary } from '../library/Library';
import { toggleLoginModal } from '../reducers/libraryActions';
import password from '../assets/images/password.png';
import './LoginCard.css';

export default function LoginCard() {
  const [, dispatch] = useLibrary();
  const handleLoginCta = () => dispatch(toggleLoginModal());

  return (
    <div className='box'>
      <article className='media'>
        <div className='media-left'>
          <figure className='image is-96x96'>
            <img src={password} alt='login icon' />
          </figure>
        </div>
        <div className='media-content'>
          <div className='content'>
            <p>
              Contents in this page require a user login, please <button onClick={handleLoginCta} className='button is-small is-link'>login</button> or go to <NavLink to='/home' className='text-link'>Home</NavLink> and create your free account.
            </p>
          </div>
          <nav className='level is-mobile'>
            
          </nav>
        </div>
      </article>
    </div>
  );
}