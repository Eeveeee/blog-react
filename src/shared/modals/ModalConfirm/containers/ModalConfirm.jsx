import React, { useEffect, useState, useContext } from 'react';
import { NotificationsContext } from '../../../context/context';
import { Notification } from '../components/Notification/Notification';
import PerfectScrollbar from 'react-perfect-scrollbar';
import s from './Notifications.module.scss';
/**
 *
 * @param {{acceptText: string;rejectText: string}} params
 * @returns {boolean}
 */
export function ModalConfirm({ onAnswer, params }) {
  const { acceptText, rejectText } = params;
  return (
    <div className={s.modal}>
      <div className={s.content}></div>
      <div className={s.buttons}>
        <div onClick={() => onAnswer(true)} className={s.button}>
          {acceptText || 'Да'}
        </div>
        <div className={s.button}>{rejectText || 'Нет'}</div>
      </div>
    </div>
  );
}
