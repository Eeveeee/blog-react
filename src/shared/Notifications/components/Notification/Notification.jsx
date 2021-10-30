import React from 'react';
import s from './Notification.module.scss';

export function Notification({
  notification,
  setNotifications,
  notifications,
  idx,
}) {
  console.log('COMPONENT ENABLED');
  const newNotifications = [...notifications];
  newNotifications.splice(idx, 1);
  setTimeout(() => {
    setNotifications(newNotifications);
  }, 10000);
  return (
    <div className={s.notification}>
      <span className={s.notificationText}>{notification.text}</span>
    </div>
  );
}
