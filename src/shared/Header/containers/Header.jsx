import { getAuth, onAuthStateChanged } from '@firebase/auth';
import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { signOutCurrentUser } from '../../../services/AuthService';
import { Profile } from '../components/Profile/Profile';
import s from './Header.module.scss';
import { useHistory } from 'react-router-dom';
import imagePlaceholder from '../../../assets/images/imagePlaceholder.webp';
import GlobalSvgSelector from '../../../assets/icons/global/GlobalSvgSelector';
import { Navigation } from '../../Navigation/Navigation';
export function Header({ currentUser }) {
  const auth = getAuth();
  const history = useHistory();
  function signOutHandler() {
    signOutCurrentUser(auth);
  }
  function signInHandler() {
    history.push('/signin');
  }
  const routes = [
    { name: 'Создать пост', path: '/add' },
    { name: 'Зарегистрироваться', path: '/signup' },
    { name: 'Войти', path: '/signin' },
  ];
  return (
    <div className={s.header}>
      <Link to={'/home'} className={s.title}>
        PROSTO blog
      </Link>
      <Navigation routes={routes} />
      {currentUser ? (
        <Profile
          signOut={signOutHandler}
          imageURL={currentUser.photoURL || imagePlaceholder}
        />
      ) : (
        <button onClick={signInHandler} className={s.signIn}>
          <GlobalSvgSelector id={'signIn'} />
        </button>
      )}
    </div>
  );
}
