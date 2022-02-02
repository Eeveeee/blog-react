import React from 'react';
import { Link } from 'react-router-dom';
import { Navigation } from '../Navigation/Navigation';
import s from './Footer.module.scss';

export function Footer() {
  const routes = [
    { name: 'Информация', path: '/about' },
    { name: 'Контакты', path: '/contacts' },
  ];
  return (
    <div className={s.footer}>
      <div className={s.navigationWrapper}>
        <Navigation routes={routes} />
      </div>
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
