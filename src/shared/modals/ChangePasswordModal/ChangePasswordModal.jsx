import React, { useState, useContext, useRef } from 'react';
import { CounterInput } from '../../../forms/CounterInput/CounterInput';
import { Counter } from '../../Counter/Counter';
import { Modal } from '../Modal/Modal';
import s from './ChangePasswordModal.module.scss';
import { NotificationsContext } from '../../../context/context';

export function ChangePasswordModal({ setModalState, changePasswordFn }) {
  const { addNotification } = useContext(NotificationsContext);
  const [data, setData] = useState({
    password: '',
    newPassword: '',
    newPasswordAgain: '',
  });
  function submitHandler(e) {
    e.preventDefault();
    const password = data.password;
    const newPassword = data.newPassword;
    const newPasswordAgain = data.newPasswordAgain;
    if (!password.length || !newPassword.length || !newPasswordAgain.length) {
      addNotification({
        type: 'danger',
        message: 'Заполните все поля',
      });
      return;
    }
    if (newPassword !== newPasswordAgain) {
      addNotification({
        type: 'danger',
        message: 'Поля нового пароля не совпадают',
      });
      return;
    }
    changePasswordFn(password, newPassword);
  }
  function handleReject(e) {
    setModalState(false);
  }
  return (
    <Modal setActive={handleReject}>
      <form onSubmit={submitHandler} className={s.wrapper}>
        <div className={s.title}>Введите текущий пароль</div>
        <CounterInput
          type="password"
          name="password"
          autoComplete="password"
          currentValue={data}
          setFn={setData}
          required={true}
        />
        <div className={s.title}>Введите новый пароль</div>
        <CounterInput
          type="password"
          name="newPassword"
          autoComplete="new-password"
          currentValue={data}
          setFn={setData}
          required={true}
        />

        <div className={s.title}>Введите новый пароль ещё раз</div>
        <CounterInput
          type="password"
          name="newPasswordAgain"
          autoComplete="new-password"
          currentValue={data}
          setFn={setData}
          required={true}
        />
        <div className={s.manageButtons}>
          <button type="button" onClick={handleReject} className={s.reject}>
            Закрыть
          </button>
          <button type="submit" className={s.confirm}>
            Сменить
          </button>
        </div>
      </form>
    </Modal>
  );
}
