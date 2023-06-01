export default function Login({ login, handleChangeFn }) {
  return (
    <form>
      <div className='field'>
        <label className='label'>Username</label>
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
            type='text'
            name='password'
            value={login.password}
            placeholder='********'
            onChange={handleChangeFn}
          />
        </div>
      </div>
    </form>
  );
}