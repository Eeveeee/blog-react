import React from 'react';
import s from './Error.module.scss';

export function Error() {
  return (
    <div className={s.error}>
      <div className="container">
        <div className={s.text}>
          <h1 className={s.title}>Что-то пошло не так</h1>
          <p className={s.subtitle}>
            Это ошибка 404, она означает, что вы ввели неверный URL-адрес, либо
            нажали на недействительную ссылку.
          </p>
        </div>
      </div>
    </div>
  );
}
