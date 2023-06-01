import React, { useEffect } from 'react';
import { Routes, Route } from 'react-router-dom';

import { useLibrary } from './library/Library';
import { loadUsers } from './reducers/libraryActions';
import { getUsers } from './services/user';

import Home from './routes/Home';
import About from './routes/About';
import Header from './Components/Layout/Header';

import './App.css';

function App() {
  const [, dispatch] = useLibrary();

  useEffect(() => {
    getUsers().then(res => {
      dispatch(loadUsers(res));
    });
  }, [dispatch]);

  return (
    <div className='App'>
      <Header />
      <Routes>
        <Route path='/home' element={<Home />}></Route>
        <Route path='/about' element={<About />}></Route>
      </Routes>
    </div>
  );
}

export default App;
