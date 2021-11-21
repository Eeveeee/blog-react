import { getAuth, onAuthStateChanged } from '@firebase/auth';
import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import s from './Navigation.module.scss';
import { useHistory } from 'react-router-dom';

export function Navigation({ routes }) {
  return (
    <nav className={s.navigation}>
      {routes.map((route, idx) => (
        <Link key={idx + route.path} className={s.link} to={route.path}>
          {route.name}
        </Link>
      ))}
    </nav>
  );
}
