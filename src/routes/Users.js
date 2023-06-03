import { useState } from 'react';
import { useLibrary } from '../library/Library';
import { loadUsers, toggleUserModal } from '../reducers/libraryActions';
import { updateUser } from '../services/user';
import UserItem from '../components/UserItem';
import Modal from '../components/layout/Modal';
import User from '../components/forms/User';
import { findBy } from '../utils/utils';
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
  const { users, userModalOpen } = state;
  const handleToggleUserType = (users, id) => {
    const newUsersState = users.map(user => {
      if (user.id !== id) return user;
      return {
        ...user,
        type: user.type === LIBRARIAN ? MEMBER : LIBRARIAN,
      };
    })
    dispatch(loadUsers(newUsersState));
    updateUser(findBy(newUsersState, 'id', id));
  };
  const handleToggleModal = (exitAction, users, id) => {
    setEditForm(exitAction ? formValues : findBy(users, 'id', id));
    dispatch(toggleUserModal());
  };
  const handleFormChange = ({ target }) => {
    const { type, value, name, checked } = target;
    const val =  type === "checkbox" ? Boolean(checked) : value;

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
          toggleTypeFn={() => handleToggleUserType(users, user.id)}
          modifyModalFn={() => handleToggleModal(userModalOpen, users, user.id)}
        />)}
      </div>
    </>
  );
}
