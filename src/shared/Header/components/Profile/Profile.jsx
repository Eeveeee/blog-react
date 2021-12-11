import React from 'react';
import { Link } from 'react-router-dom';
import GlobalSvgSelector from '../../../../assets/icons/global/GlobalSvgSelector';
import { useUserData } from '../../../../hooks/useUserData';
import { getMediaLink } from '../../../../utils/mediaHelper';
import { RoundedImage } from '../../../RoundedImage/RoundedImage';
import s from './Profile.module.scss';

export function Profile({ user }) {
  return (
    <div className={s.profile}>
      <Link to={'/profile/my'} className={s.imageWrapper}>
        <RoundedImage src={getMediaLink(user.photoURL)} />
      </Link>
    </div>
  );
}
