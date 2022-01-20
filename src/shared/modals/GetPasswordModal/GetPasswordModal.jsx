import React, { useState } from 'react';
import { Modal } from '../Modal/Modal';
import s from './GetPasswordModal.module.scss';

export function GetPasswordModal({ setModalState, modalState }) {
  const [password, setPassword] = useState(null);
  const onConfirmObj = modalState.onConfirm;
  function onSubmit(e) {
    if (onConfirmObj) {
      onConfirmObj.fn({ password: password, ...onConfirmObj.props });
    }
  }
  function handleReject(e) {
    setModalState({ state: false, value: null });
  }
  return (
    <Modal setActive={handleReject}>
      <div className={s.passwordEnter}>
        <div className={s.title}>Введите текущий пароль</div>
        <input
          onChange={(e) => {
            setPassword(e.target.value);
          }}
          type="password"
          autoComplete="current-password"
          className={s.input}
        />
        <div className={s.manageButtons}>
          <button onClick={handleReject} className={s.reject}>
            Закрыть
          </button>
          <button onClick={onSubmit} className={s.confirm}>
            Подтвердить
          </button>
        </div>
      </div>
    </Modal>
  );
}
