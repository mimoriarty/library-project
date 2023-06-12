import { useState } from 'react';
import { useLibrary } from '../library/Library';
import { getUserActions} from '../config/userActions';
import Dropdown from './layout/Dropdown';
import { getRemainingDays } from '../utils/utils';
import { LIBRARIAN } from '../constants';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faEllipsisH, faUser, faBook } from '@fortawesome/free-solid-svg-icons';
import './UserItem.css';

export default function UserItem({
  user,
  toggleTypeFn,
  modifyModalFn,
  togglePenaltyFn,
  deleteUserFn,
}) {
  const [state] = useLibrary();
  const { user: loggedUser } = state;
  const [dropdownOpen, setDropdownOpen] = useState(false);
  const userTypeIcon = user.type === 'librarian' ? faBook : faUser;
  const handleToggleDropdown = () => {
    toggleDropdown();
  };
  const handleHideDropdown = () => setDropdownOpen(false);
  const handleUserEdit = () => {
    modifyModalFn();
  };
  const handleUserPenalty = () => {
    togglePenaltyFn();
  };
  const handleUserDelete = () => {
    deleteUserFn();
  };
  const toggleDropdown = () => setDropdownOpen(!dropdownOpen)
  const dropdownHandlers = {
    handleUserEdit,
    handleUserPenalty,
    handleUserDelete,
  };

  return (
    <div className='list-item'>
      <div className='list-item-image'>
        <figure className='image is-48x48'>
          <img
            className='is-rounded'
            src={user.avatar || 'https://via.placeholder.com/128x128.png?text=Image'}
            alt='user avatar'
          />
        </figure>
      </div>
      <div className='list-item-content'>
        <div className='list-item-title'>{user.firstName} {user.lastName}</div>
        <div className='list-item-description'>
          <div className='tag is-rounded'>@{user.name}</div>
          {user.hasPenaltyOngoing && <div className='tag is-rounded danger ml-1'>
            penalty: {getRemainingDays(user.penaltyExpirationDate)} left
          </div>}
          {!user.isActive && <div className='tag is-rounded warning ml-1'>inactive</div>}
        </div>
      </div>
      <div className='list-item-controls'>
        <div className='buttons is-right'>
          <button 
            className='button'
            onClick={() => toggleTypeFn(user.id)}
            disabled={loggedUser.type !== LIBRARIAN}
          >
            <FontAwesomeIcon icon={userTypeIcon} />
          </button>
          <button
            className={'dropdown is-right ' + (dropdownOpen ? 'is-active' : '')}
            onClick={handleToggleDropdown}
            onMouseLeave={handleHideDropdown}
          >
            <span className='icon is-small dropdown-trigger' aria-controls='dropdown-menu'>
              <FontAwesomeIcon icon={faEllipsisH} />
            </span>
            <Dropdown actions={getUserActions(user)} handlers={dropdownHandlers} />
          </button>
        </div>
      </div>
    </div>
  );
}
