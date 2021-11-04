import { getAuth } from '@firebase/auth';
import React from 'react';
import { Link } from 'react-router-dom';
import { signOutCurrentUser } from '../../services/AuthService';
import { Profile } from '../Profile/Profile';
import s from './Header.module.scss';
import imagePlaceholder from '../../assets/images/imagePlaceholder.webp';

export function Header({ currentUser }) {
  const auth = getAuth();
  console.log(currentUser);
  async function signOutHandler() {
    await signOutCurrentUser(auth);
    // window.location.reload();
  }
  return (
    <div className={s.header}>
      <Link to={'/home'} className={s.title}>
        PROSTO blog
      </Link>
      <Profile
        currentUser={currentUser}
        signOut={signOutHandler}
        imageURL={currentUser.photoURL || imagePlaceholder}
      />
    </div>
  );
}
