import { getAuth } from '@firebase/auth';
import classNames from 'classnames';
import React, { useContext, useEffect, useState } from 'react';
import { Link, useHistory } from 'react-router-dom';
import GlobalSvgSelector from '../../../assets/icons/global/GlobalSvgSelector';
import { NotificationsContext, UserContext } from '../../../context/context';
import { useAuthState } from '../../../hooks/useAuthState';
import { useUserData } from '../../../hooks/useUserData';
import { signOutCurrentUser } from '../../../services/AuthService';
import { toggleScroll } from '../../../utils/toggleScroll';
import { Navigation } from '../../Navigation/Navigation';
import { BurgerMenu } from '../components/BurgerMenu/BurgerMenu';
import { Profile } from '../components/Profile/Profile';
import s from './Header.module.scss';

export function Header() {
  const { addNotification } = useContext(NotificationsContext);
  const { user } = useContext(UserContext);
  const [burgerMenu, setBurgerMenu] = useState(false);
  const auth = useAuthState();
  const history = useHistory();
  function signOut() {
    const auth = getAuth();
    history.push('/home');
    signOutCurrentUser(auth).then(() => {
      window.location.reload();
    });
  }
  useEffect(() => {
    toggleScroll(!burgerMenu);
  }, [burgerMenu]);

  function signInHandler() {
    history.push('/signin');
    return;
  }
  const routes = [
    { name: 'Домой', path: '/home' },
    { name: 'Войти', path: '/signin' },
    { name: 'Зарегистрироваться', path: '/signup' },
    { name: 'Информация', path: '/info' },
  ];
  const authRoutes = [
    { name: 'Домой', path: '/home' },
    { name: 'Создать статью', path: '/add' },
    { name: 'Информация', path: '/info' },
  ];
  function toggleBurger() {
    setBurgerMenu((burgerMenu) => !burgerMenu);
  }
  const availableRoutes = auth.state === 'auth' ? authRoutes : routes;
  return (
    <div className={s.header}>
      <div className={s.desktop}>
        <Link to={'/home'} className={s.title}>
          PROSTO blog
        </Link>

        <Navigation routes={availableRoutes} />

        <div className={s.profileWrapper}>
          {auth.state === 'auth' && <Profile user={user.value} />}
          {auth.state === 'auth' ? (
            <button onClick={signOut} className={s.signOut}>
              <GlobalSvgSelector id={'signOut'} />
            </button>
          ) : (
            <button onClick={signInHandler} className={s.signIn}>
              <GlobalSvgSelector id={'signIn'} />
            </button>
          )}
        </div>
      </div>
      <div className={s.mobile}>
        <button
          onClick={toggleBurger}
          className={classNames(s.burgerBtn, { [s.active]: burgerMenu })}
        >
          <span></span>
        </button>
        <Link to={'/home'} className={s.title}>
          PROSTO blog
        </Link>
        <div className={s.profileWrapper}>
          {auth.state === 'auth' && <Profile user={user.value} />}
          {auth.state === 'auth' ? (
            <button onClick={signOut} className={s.signOut}>
              <GlobalSvgSelector id={'signOut'} />
            </button>
          ) : (
            <button onClick={signInHandler} className={s.signIn}>
              <GlobalSvgSelector id={'signIn'} />
            </button>
          )}
        </div>
        {burgerMenu && (
          <BurgerMenu setBurgerState={setBurgerMenu} routes={availableRoutes} />
        )}
      </div>
    </div>
  );
}
