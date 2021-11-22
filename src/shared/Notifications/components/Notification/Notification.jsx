import classNames from 'classnames';
import React from 'react';
import s from './Notification.module.scss';

export function Notification({ notification }) {
  return (
    <div className={classNames(s.notification, s[notification.type])}>
      <span className={s.notificationText}>{notification.message}</span>
      <div
        className={classNames(s.notificationType, s[notification.type])}
      ></div>
    </div>
  );
}
