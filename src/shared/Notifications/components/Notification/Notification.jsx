import classNames from 'classnames';
import React from 'react';
import s from './Notification.module.scss';

export function Notification({ notification }) {
  return (
    <div className={classNames(s.notification, s[notification.type])}>
      <div className={s.notificationText}>{notification.message}</div>
      <div
        className={classNames(s.notificationType, s[notification.type])}
      ></div>
    </div>
  );
}
