import { useRef, useEffect } from 'react';
import { useLibrary } from '../../library/Library';
import './Notification.css';

const defaultNotification = {
  type: 'info',
  message: 'Just making u know about notifications system, <strong>keen an eye on us!!</strong>',
}

export default function Notification({ closeFn }) {
  const [state] = useLibrary();
  const { notification, notificationOpen } = state;
  const messageRef = useRef(null);
  const notData = {
    type: notification.type || defaultNotification.type,
    message: notification.message || defaultNotification.message,
  };

  useEffect(() => {
    messageRef.current.innerHTML = notData.message;
  })

  return(
    <div className={'notification is-light is-' + notData.type + (notificationOpen ? ' is-active' : '')}>
      <button className='delete' onClick={closeFn}></button>
      <p ref={messageRef}></p>
    </div>
  );
}