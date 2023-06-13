import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useLibrary } from '../library/Library';
import { toggleLoginModal, reloadUsers } from '../reducers/libraryActions';
import { saveUser } from '../services/user';
import { MEMBER } from '../constants';
import './SignUp.css';

const initialState = {
  type: MEMBER,
  firstName: '',
  lastName: '',
  name: '',
  password: '',
  avatar: '',
  hasPenaltyOngoing: false,
  isActive: false,
  bookCount: 0,
  penaltyExpirationDate: '',
  createDate: '',
  history: [],
};

export default function SignUp() {
  const navigate = useNavigate();
  const [, dispatch] = useLibrary();
  const [signupForm, setSignupForm] = useState(initialState);
  const handleChangeFn = ({ target }) => {
    const { type, value, name, checked } = target;
    const val = type === 'checkbox' ? Boolean(checked) : value;

    setSignupForm({
      ...signupForm,
      [name]: val,
    });
  };
  const handleSubmit = e => {
    e.preventDefault();
    e.stopPropagation();

    signupForm.createDate = new Date().toISOString();

    saveUser(signupForm);
    dispatch(reloadUsers());
    setSignupForm(initialState);
    navigate('/home');
    dispatch(toggleLoginModal());
  };

  return (
    <section className='hero is-primary'>
      <div className='hero-body'>
        <p className='title'>
          Kerberos App
        </p>
        <p className='subtitle'>
          Create your free account on Kerberos library.
        </p>
        <form className='form container'>
          <div className='mb-5 level-item' >
            <figure className='image is-128x128'>
              <img
                className='is-rounded'
                src={signupForm.avatar || 'https://bulma.io/images/placeholders/128x128.png'}
                alt='user avatar'
              />
              <legend className='level-item'>{signupForm.firstName} {signupForm.lastName}</legend>
            </figure>
          </div>
          <div className='field'>
            <label className='label'>Avatar</label>
            <div className='control'>
              <input
                className='input'
                type='text'
                name='avatar'
                value={signupForm.avatar}
                placeholder='image url'
                onChange={handleChangeFn}
              />
            </div>
          </div>
          <div className='control mb-4'>
            <label className='radio' disabled>
              <input type='radio' name='type' disabled checked />
                &nbsp;Member
            </label>
            <label className='radio' disabled>
              <input type='radio' name='type' disabled />
                &nbsp;Librarian
            </label>
            <p className='help'>All users must be created as members, if you need librarian privileges ask a librarian to change your user type.</p>
          </div>
          <div className='field'>
            <label className='label'>First Name</label>
            <div className='control'>
              <input
                className='input'
                type='text'
                name='firstName'
                value={signupForm.firstName}
                placeholder='first name'
                onChange={handleChangeFn}
              />
            </div>
          </div>
          <div className='field'>
            <label className='label'>Last Name</label>
            <div className='control'>
              <input
                className='input'
                type='text'
                name='lastName'
                value={signupForm.lastName}
                placeholder='last name'
                onChange={handleChangeFn}
              />
            </div>
          </div>
          <div className='field'>
            <label className='label'>Email</label>
            <div className='control'>
              <input
                className='input'
                type='text'
                name='email'
                value={signupForm.email}
                placeholder='user@example.com'
                onChange={handleChangeFn}
              />
            </div>
          </div>
          <div className='field'>
            <label className='label'>User name</label>
            <div className='control'>
              <input
                className='input'
                type='text'
                name='name'
                value={signupForm.name}
                placeholder='User'
                onChange={handleChangeFn}
              />
            </div>
          </div>
          <div className='field'>
            <label className='label'>Password</label>
            <div className='control'>
              <input
                className='input'
                type='password'
                name='password'
                value={signupForm.password}
                placeholder='*******'
                onChange={handleChangeFn}
              />
            </div>
          </div>
          <div className='level-item mt-5'>
            <button
              className='button is-light is-success'
              onClick={(e) => handleSubmit(e)}
            >
              Save
            </button>
          </div>
        </form>
      </div>
    </section>
  );
}