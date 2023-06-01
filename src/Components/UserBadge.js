import './UserBadge.css';

import defaultUser from '../assets/images/default_user.png';

export default function UserBadge() {
  return(
    <div className='media'>
      <div className='media-content'>
        <p className='title is-4'>John Smith</p>
        <p className='subtitle is-6'>@johnsmith</p>
      </div>
      <div className='media-right media-left'>
        <figure className='image is-48x48'>
          <img src={defaultUser} alt='default user' />
        </figure>
      </div>
    </div>
  );
}
