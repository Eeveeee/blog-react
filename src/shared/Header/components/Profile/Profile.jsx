import React from 'react';
import { Link } from 'react-router-dom';
import { getMediaLink } from '../../../../utils/mediaHelper';
import { RoundedImage } from '../../../RoundedImage/RoundedImage';
import s from './Profile.module.scss';

export function Profile({ user }) {
  return (
    <div className={s.profile}>
      <Link to={`/profile/${user?.uid}`} className={s.imageWrapper}>
        <RoundedImage src={getMediaLink(user?.photoURL || null)} />
      </Link>
    </div>
  );
}
