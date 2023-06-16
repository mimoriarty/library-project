import React, { useEffect, useState } from 'react';
import { Routes, Route } from 'react-router-dom';
import { useLibrary } from './library/Library';
import { 
  changeListCat,
  loadBooks,
  loadRequests,
  loadUsers,
  loginUser,
  toggleLoginModal,
  toggleNotification,
} from './reducers/libraryActions';
import { getUsers } from './services/user';
import { getBooks } from './services/library';
import Home from './routes/Home';
import Users from './routes/Users';
import Books from './routes/Books';
import Book from './routes/Book';
import About from './routes/About';
import Header from './components/layout/Header';
import Modal from './components/layout/Modal';
import Notification from './components/layout/Noification';
import Login from './components/forms/Login';

import './App.css';
import SignUp from './routes/SignUp';
import { getreturns } from './services/returnRequest';

const initialState = {
  name: '',
  password: '',
};

function App() {
  const [login, setLogin] = useState(initialState);
  const [state, dispatch] = useLibrary();
  const { loginModalOpen, selectedCat, reloadBooks, reloadUsers, users } = state;
  const handleNotificationToggle = () => {
    dispatch(toggleNotification({}))
  };
  const handleToggleModal = () => {
    dispatch(toggleLoginModal());
  };
  const handleLoginSubmit = () => {
    const user = users.find(({password, name}) =>
        name === login.name && password === login.password);
    
    if (!user) {
      dispatch(toggleNotification({
        type: 'danger',
        message: 'User not found, please retry again or ask a librarian!',
      }));
    } else {
      dispatch(loginUser(user));
      dispatch(toggleNotification({}));
    }

    dispatch(toggleLoginModal());
    setLogin(initialState);
  };
  const handleLoginChange = (e) => {
    const { name, value } = e.target;

    setLogin({
      ...login,
      [name]: value,
    });
  };

  useEffect(() => {
    getUsers().then(res => {
      dispatch(loadUsers(res));
      dispatch(changeListCat(selectedCat));
    });
  }, [dispatch, selectedCat, reloadUsers]);

  useEffect(() => {
    getBooks().then(res => {
      dispatch(loadBooks(res));
    });
  }, [dispatch, reloadBooks]);

  useEffect(() => {
    getreturns().then(res => {
      dispatch(loadRequests(res));
    });
  }, [dispatch]);

  return (
    <div className='App'>
      <Header toggleFn={handleToggleModal} />
      <Notification closeFn={handleNotificationToggle} />
      <Modal
        isOpen={loginModalOpen}
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
      <Routes>
        <Route path='/signup' element={<SignUp />}></Route>
        <Route path='/home' element={<Home />}></Route>
        <Route path='/users' element={<Users />}></Route>
        <Route path='/books' element={<Books />}></Route>
        <Route path='/book' element={<Book />}></Route>
        <Route path='/about' element={<About />}></Route>
      </Routes>
    </div>
  );
}

export default App;
