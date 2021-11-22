import React, { useEffect, useState, useContext } from 'react';
import { NotificationsContext } from '../../../context/context';
import { Notification } from '../components/Notification/Notification';
import PerfectScrollbar from 'react-perfect-scrollbar';
import s from './Notifications.module.scss';

export function Notifications({ notifications }) {
  return (
    <div className={s.notifications}>
      <PerfectScrollbar>
        <div className={s.notificationsWrapper}>
          {notifications.map((notification, idx) => (
            <Notification
              notification={notification}
              key={idx + notification.message}
            />
          ))}
        </div>
      </PerfectScrollbar>
    </div>
  );
}
