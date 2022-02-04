import React from 'react';
import s from './Footer.module.scss';

export function Footer() {
  return (
    <div className={s.footer}>
      <a
        target="_blank"
        href="https://github.com/Eeveeee"
        className={s.developer}
        rel="noreferrer"
      >
        Разработано: <span>Eeveeee</span>
      </a>
    </div>
  );
}
