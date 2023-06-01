import { useState } from 'react';
import { useLibrary } from '../library/Library';
import { logginUser } from '../reducers/libraryActions';

import Modal from '../Components/Layout/Modal';
import Login from '../Components/Login';
import UserBadge from '../Components/UserBadge';

import digitalLibrary from '../assets/images/digital-library.png';

const initialState = {
  name: '',
  password: '',
};

export default function Home() {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [login, setLogin] = useState(initialState);
  const [state, dispatch] = useLibrary();
  const { loggedIn } = state;
  const toggleModal = () => setIsModalOpen(!isModalOpen);
  const handleToggleModal = () => toggleModal();
  const handleLoginSubmit = () => {
    dispatch(logginUser(login));
    toggleModal();
  };
  const handleLoginChange = (e) => {
    const { name, value } = e.target;

    setLogin({
      ...login,
      [name]: value,
    });
  }

  return (
    <div>
      <Modal
        isOpen={isModalOpen}
        toggleFn={handleToggleModal}
        submitFn={handleLoginSubmit}
        title='LogIn'
        okButton='Login'
      >
        <Login
          login={login}
          handleChangeFn={handleLoginChange}
        />
      </Modal>
      {Boolean(loggedIn) && <UserBadge user={state.user} />}
      {!Boolean(loggedIn) && <div className='notification is-info'>
        <button className='delete'></button>
        Public version, please <button className='button-link'><strong onClick={handleToggleModal}>Log in</strong></button>, to access your dashboard.
      </div>}
      <div className='card content m-6'>
        <div className='card-image'>
          <figure className='image is-4by3'>
            <img src={digitalLibrary} alt='Kerberos Library Logo' />
          </figure>
        </div>
        <div className='card-content'>
          <p>Kerberos is a digital library application where you can borrow any book ever written, no licences, no charges, just because we love people who reads without paper. Trees are living things not just books getting dust!<br/> Enjoy your reading.</p>
          <button className='button is-primary'>
            <strong>Sign up</strong>
          </button>
        </div>
      </div>
    </div>
  );
}