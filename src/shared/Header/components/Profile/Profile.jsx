import React from 'react';
import { Link } from 'react-router-dom';
import GlobalSvgSelector from '../../../../assets/icons/global/GlobalSvgSelector';
import { RoundedImage } from '../../../RoundedImage/RoundedImage';
import s from './Profile.module.scss';

export function Profile({ imageURL, signOut }) {
  return (
    <div className={s.profile}>
      <div className={s.profileContent}>
        <Link to={'/profile/my'} className={s.imageWrapper}>
          <RoundedImage src={imageURL} />
        </Link>
        <button onClick={signOut} className={s.logout}>
          <GlobalSvgSelector id={'logout'} />
        </button>
      </div>
    </div>
  );
}
