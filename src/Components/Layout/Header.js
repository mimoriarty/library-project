import React, { useState } from 'react';
import { NavLink } from 'react-router-dom';

import { useLibrary } from '../../library/Library';

export default function Header() {
  const [navBarActive, setNavBarActive] = useState(false);
  const [state] = useLibrary();
  const { loggedIn } = state;

  const toggleNavBar = () => {
    setNavBarActive(!navBarActive);
  };

  return (
    <nav className='navbar' role='navigation' aria-label='main navigation'>
      <div className='navbar-brand'>
        <h1 className='card-header-title has-text-grey-dark'>Kerberos</h1>
        <button
          className='navbar-burger'
          aria-label='menu'
          aria-expanded='false'
          data-target='navbarBasicExample'
          onClick={toggleNavBar}
        >
          <span aria-hidden='true'></span>
          <span aria-hidden='true'></span>
          <span aria-hidden='true'></span>
        </button>
      </div>

      <div className={'navbar-menu ' + (navBarActive ? 'is-active' : '')}>
        <div className='navbar-start'>
          <NavLink to='/home' className='navbar-item'>Home</NavLink>
          <NavLink to='/about' className='navbar-item'>About</NavLink>
        </div>

        {!Boolean(loggedIn) && <div className='navbar-end is-inline-block-mobile'>
          <div className='navbar-item'>
            <div className='buttons'>
              <button className='button is-primary'>
                <strong>Sign up</strong>
              </button>
              <button className='button is-light'>
                Log in
              </button>
            </div>
          </div>
        </div>}
      </div>
    </nav>
  );
}