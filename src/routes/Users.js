import { useState } from 'react';
import { useLibrary } from '../library/Library';
import {
  loadUser,
  loadUsers,
  toggleUserModal,
  toggleNotification,
} from '../reducers/libraryActions';
import { updateUser, deleteUser } from '../services/user';
import UserItem from '../components/UserItem';
import Modal from '../components/layout/Modal';
import User from '../components/forms/User';
import { findBy, getPenaltyDate } from '../utils/utils';
import { LIBRARIAN, MEMBER } from '../constants';
import './Users.css';

const formValues = {
  firstName: '',
  lastName: '',
  name: '',
  password: '',
  email: '',
  isActive: '',
  avatar: '',
};

export default function Users() {
  const [editForm, setEditForm] = useState(formValues);
  const [state, dispatch] = useLibrary();
  const { users, user: loggedUser, userModalOpen } = state;
  const handleToggleUserType = (users, loggedUser, id) => {
    const newUsersState = users.map(user => {
      if (user.id !== id) return user;
      return {
        ...user,
        type: user.type === LIBRARIAN ? MEMBER : LIBRARIAN,
      };
    });
    const newUserState = findBy(newUsersState, 'id', id);
    if ((loggedUser?.id) === id) {
      dispatch(loadUser(newUserState));
    }
    dispatch(loadUsers(newUsersState));
    updateUser(newUserState);
  };
  const handleToggleUserPenalty = (users, id) => {
    const newUsersState = users.map(user => {
      if (user.id !== id) return user;
      const penalty = !user.hasPenaltyOngoing;
      return {
        ...user,
        hasPenaltyOngoing: penalty,
        penaltyExpirationDate: penalty ? getPenaltyDate() : null,
      };
    });
    const newUserState = findBy(newUsersState, 'id', id);
    dispatch(loadUser(newUserState));
    dispatch(loadUsers(newUsersState));
    updateUser(newUserState);
  };
  const handleDeleteUser = (users, loggedUser, id) => {
    if (loggedUser.id === id) {
      return dispatch(toggleNotification({
        type: 'danger',
        message: 'Sorry here, you are not allowed to delete a logged user. <strong>Logout and ask a librarian to remove your account!!</strong>',
      }));
    }
    const newUsersState = users.filter(user => user.id !== id);
    dispatch(loadUsers(newUsersState));
    deleteUser(id);
  };
  const handleToggleModal = (exitAction, users, id) => {
    setEditForm(exitAction ? formValues : findBy(users, 'id', id));
    dispatch(toggleUserModal());
  };
  const handleFormChange = ({ target }) => {
    const { type, value, name, checked } = target;
    const val =  type === 'checkbox' ? Boolean(checked) : value;

    setEditForm({
      ...editForm,
      [name]: val,
    });
  };

  return (
    <>
      <Modal
        isOpen={userModalOpen}
        toggleFn={() => handleToggleModal(userModalOpen)}
        submitFn={() => null}
        title='Edit user'
        okButton='Save'
      >
        <User user={editForm} handleChangeFn={handleFormChange}/>
      </Modal>
      <h2 className='title is-4'>Users list</h2>
      <div className='list'>
        {users.map(user => <UserItem
          key={'user_' + user.id}
          user={user}
          toggleTypeFn={() => handleToggleUserType(users, loggedUser, user.id)}
          modifyModalFn={() => handleToggleModal(userModalOpen, users, user.id)}
          togglePenaltyFn={() => handleToggleUserPenalty(users, user.id)}
          deleteUserFn={() => handleDeleteUser(users, loggedUser, user.id)}
        />)}
      </div>
    </>
  );
}
