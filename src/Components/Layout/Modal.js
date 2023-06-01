import './Modal.css';

export default function Modal({
  isOpen,
  toggleFn,
  submitFn,
  children,
  title,
  okButton,
  koButton,
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
        <footer className='modal-card-foot column'>
          <button className='button is-success' onClick={submitFn}>{okButton || 'Accept'}</button>
          <button className='button' onClick={toggleFn}>{koButton || 'Cancel'}</button>
        </footer>
      </div>
    </div>
  )
}
