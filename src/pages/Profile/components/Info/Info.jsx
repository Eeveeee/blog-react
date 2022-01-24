import classNames from 'classnames';
import React from 'react';
import { Link } from 'react-router-dom';
import GlobalSvgSelector from '../../../../assets/icons/global/GlobalSvgSelector';
import { RoundedImage } from '../../../../shared/RoundedImage/RoundedImage';
import { getMediaLink } from '../../../../utils/mediaHelper';
import { timestampToDate, timestampToTime } from '../../../../utils/time';
import s from './Info.module.scss';

export function Info({ user, postsAmount }) {
  console.log(user);
  const { username, role, createdAt, photoURL, email } = user;
  return (
    <div className={s.info}>
      <Link to={'/profile/settings'} className={s.edit}>
        <GlobalSvgSelector id={'edit'} />
      </Link>
      <div className={s.imageWrapper}>
        <RoundedImage src={getMediaLink(photoURL)} />
      </div>

      <div className={s.username}>{username}</div>
      {email && (
        <div className={classNames(s.email, s.infoField)}>
          <span className={s.infoFieldTitle}>Почта: </span>
          <span className={s.fieldValue}>{email}</span>
        </div>
      )}
      <div className={classNames(s.createdAt, s.infoField)}>
        <span className={s.infoFieldTitle}>Профиль создан: </span>
        <span className={s.fieldValue}>
          {timestampToDate(createdAt)}, {timestampToTime(createdAt)}
        </span>
      </div>
      <div className={classNames(s.postsNumber, s.infoField)}>
        <span className={s.infoFieldTitle}>Статей создано: </span>
        {postsAmount?.length ? postsAmount.length : 0}
      </div>
    </div>
  );
}
