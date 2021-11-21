import React, { useEffect, useState, useContext } from 'react';
import { NotificationsContext } from '../../../context/context';
import { Notification } from '../components/Notification/Notification';
import s from './Notifications.module.scss';

export function Notifications() {
  const { notifications, setNotifications } = useContext(NotificationsContext);
  return (
    <div className={s.notifications}>
      {/* {notifications.length
        ? notifications.map((notification, idx) => (
            <Notification
              notifications={notifications}
              setNotifications={setNotifications}
              idx={idx}
              notification={notification}
              key={idx}
            />
          ))
        : null} */}
    </div>
  );
}
