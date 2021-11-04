import React from 'react';
import GlobalSvgSelector from '../../assets/icons/global/GlobalSvgSelector';
import { RoundedImage } from '../RoundedImage/RoundedImage';
import s from './Profile.module.scss';
import { useHistory } from 'react-router-dom';

export function Profile({ currentUser, imageURL, signOut }) {
  const history = useHistory();
  function signInHandler() {
    console.log('signin');
    history.push('/login');
  }
  return (
    <div className={s.profile}>
      {currentUser ? (
        <div className={s.profileContent}>
          <div className={s.imageWrapper}>
            <RoundedImage src={imageURL} />
          </div>
          <button onClick={signOut} className={s.logout}>
            <GlobalSvgSelector id={'logout'} />
          </button>
        </div>
      ) : (
        <button onClick={signInHandler} className={s.signIn}>
          <GlobalSvgSelector id={'signIn'} />
        </button>
      )}
    </div>
  );
}
