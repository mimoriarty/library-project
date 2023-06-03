export default function Login({ login, handleChangeFn }) {
  return (
    <>
      <div className='field'>
        <label className='label'>User</label>
        <div className='control'>
          <input
            className='input'
            type='text'
            name='name'
            value={login.name}
            placeholder='name'
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
            value={login.password}
            placeholder='********'
            onChange={handleChangeFn}
          />
        </div>
      </div>
    </>
  );
}