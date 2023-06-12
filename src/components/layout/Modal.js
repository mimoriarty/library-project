import './Modal.css';

export default function Modal({
  isOpen,
  toggleFn,
  submitFn,
  deleteFn,
  children,
  title,
  okButton,
  koButton,
  controls = true,
}) {
  return (
    <div className={'modal is-flex-direction-row ' + (isOpen ? 'is-active is-clipped' : '')}>
      <div className='modal-background'></div>
      <div className='modal-card'>
        <header className='modal-card-head'>
          <p className='modal-card-title'>{title}</p>
          <button className='delete' aria-label='close' onClick={toggleFn}></button>
        </header>
        <section className='modal-card-body'>
          {children}
        </section>
        {controls &&
          <footer className='modal-card-foot column'>
            <button className='button' onClick={deleteFn || toggleFn}>{deleteFn ? 'Delete' : (koButton || 'Cancel')}</button>
            <button className='button is-success' onClick={submitFn}>{okButton || 'Accept'}</button>
          </footer>
        }
      </div>
    </div>
  )
}
