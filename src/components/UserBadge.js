import './UserBadge.css';

import defaultUser from '../assets/images/default_user.png';

export default function UserBadge({ user }) {
  return(
    <div className='media'>
      <div className='media-content'>
        <p className='title is-4'>{user.firstName} {user.lastName}</p>
        <p className='subtitle is-6'>@{user.name}</p>
      </div>
      <div className='media-right media-left'>
        <figure className='image is-48x48'>
          <img className='is-rounded' src={user.avatar || defaultUser} alt='user avatar' />
        </figure>
      </div>
    </div>
  );
}
