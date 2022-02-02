import React from 'react';
import { Link } from 'react-router-dom';
import s from './BurgerMenu.module.scss';

export function BurgerMenu({ routes, setBurgerState }) {
  function handleClick(e) {
    setBurgerState(false);
  }
  return (
    <div className={s.burgerMenu}>
      <div className={s.menuContent}>
        <div className={s.routes}>
          {routes.map((route, idx) => (
            <Link
              onClick={handleClick}
              key={idx + route.path}
              className={s.link}
              to={route.path}
            >
              {route.name}
            </Link>
          ))}
        </div>
      </div>
    </div>
  );
}
