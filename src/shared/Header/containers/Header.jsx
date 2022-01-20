import { getAuth } from '@firebase/auth';
import React, { useContext, useEffect } from 'react';
import { Link, useHistory } from 'react-router-dom';
import GlobalSvgSelector from '../../../assets/icons/global/GlobalSvgSelector';
import { NotificationsContext } from '../../../context/context';
import { useAuthState } from '../../../hooks/useAuthState';
import { useUserData } from '../../../hooks/useUserData';
import { signOutCurrentUser } from '../../../services/AuthService';
import { Navigation } from '../../Navigation/Navigation';
import { Profile } from '../components/Profile/Profile';
import s from './Header.module.scss';

export function Header() {
  const { addNotification } = useContext(NotificationsContext);
  const auth = useAuthState();
  const user = useUserData();
  const history = useHistory();
  function signOut() {
    const auth = getAuth();
    signOutCurrentUser(auth).then(() => {
      window.location.reload();
    });
  }
  function signInHandler() {
    history.push('/signin');
    return;
  }
  const routes = [
    { name: 'Войти', path: '/signin' },
    { name: 'Зарегистрироваться', path: '/signup' },
    { name: 'Информация', path: '/info' },
  ];
  const authRoutes = [
    { name: 'Создать статью', path: '/add' },
    { name: 'Информация', path: '/info' },
  ];
  return (
    <div className={s.header}>
      <Link to={'/home'} className={s.title}>
        PROSTO blog
      </Link>
      {auth.state === 'auth' ? (
        <Navigation routes={authRoutes} />
      ) : (
        <Navigation routes={routes} />
      )}
      <div className={s.profileWrapper}>
        {auth.state === 'auth' && <Profile user={user.data} />}
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
  );
}
