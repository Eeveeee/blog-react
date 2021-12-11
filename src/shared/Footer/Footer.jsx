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
      <Navigation routes={routes} />
      <Link to="https://github.com/Eeveeee" className={s.developer}>
        Разработано: <span>Eeveeee</span>
      </Link>
    </div>
  );
}
