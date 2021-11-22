import React from 'react';
import s from './Notification.module.scss';

export function Notification({ notification }) {
  return (
    <div className={s.notification}>
      <span className={s.notificationText}>{notification.message}</span>
    </div>
  );
}
