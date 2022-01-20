import React from 'react';
import s from './Modal.module.scss';

export function Modal({ setActive, children }) {
  return (
    <div
      onClick={() => {
        setActive();
      }}
      className={s.modalBlock}
    >
      <div onClick={(e) => e.stopPropagation()} className={s.modal}>
        {children}
      </div>
    </div>
  );
}
