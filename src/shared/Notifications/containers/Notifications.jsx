import React, { useEffect, useState, useContext } from 'react';
import { NotificationsContext } from '../../../context/context';
import { Notification } from '../components/Notification/Notification';
import s from './Notifications.module.scss';

export function Notifications({ notifications }) {
  console.log(notifications);
  return (
    <div className={s.notifications}>
      {notifications.map((notification, idx) => (
        <Notification
          notification={notification}
          key={idx + notification.message}
        />
      ))}
    </div>
  );
}
