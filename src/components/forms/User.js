import { useLibrary } from '../../library/Library';
import { LIBRARIAN } from '../../constants';

export default function User({ user = {}, handleChangeFn }) {
  const [state] = useLibrary();
  const { user: loggedUser } = state;
  return(
    <>
      <div className='mb-5 level-item' >
        <figure class="image is-128x128">
          <img
            className="is-rounded"
            src={user.avatar || 'https://bulma.io/images/placeholders/128x128.png'}
            alt='user avatar'
          />
          <legend className='level-item'>{user.firstName} {user.lastName}</legend>
        </figure>
      </div>
      <div className='field'>
        <label className='label'>First Name</label>
        <div className='control'>
          <input
            className='input'
            type='text'
            name='firstName'
            value={user.firstName}
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
            value={user.lastName}
            placeholder='last name'
            onChange={handleChangeFn}
          />
        </div>
      </div>
      <div className='field'>
        <label className='label'>email</label>
        <div className='control'>
          <input
            className='input'
            type='text'
            name='email'
            value={user.email}
            placeholder='user@example.com'
            onChange={handleChangeFn}
          />
        </div>
      </div>
      {(loggedUser && loggedUser.type === LIBRARIAN) &&
        <div className='field'>
          <label className='checkbox'>
            <input
              type='checkbox'
              name='isActive'
              checked={user.isActive}
              value={user.isActive}
              onChange={handleChangeFn}
            />
              &nbsp;Active
          </label>
        </div>
      }
    </>
  );
}