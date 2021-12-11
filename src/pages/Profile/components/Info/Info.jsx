import classNames from 'classnames';
import React from 'react';
import { RoundedImage } from '../../../../shared/RoundedImage/RoundedImage';
import { getMediaLink } from '../../../../utils/mediaHelper';
import { timestampToDate, timestampToTime } from '../../../../utils/time';
import s from './Info.module.scss';

export function Info({ user, postsAmount }) {
  const { username, role, createdAt, photoURL, posts, email } = user;
  return (
    <div className={s.info}>
      <div className={s.imageWrapper}>
        <RoundedImage src={getMediaLink(photoURL)} />
      </div>
      <div className={s.username}>{username}</div>
      {email && (
        <div className={classNames(s.email, s.infoField)}>
          <span className={s.infoFieldTitle}>Почта: </span>
          {email}
        </div>
      )}
      <div className={classNames(s.createdAt, s.infoField)}>
        <span className={s.infoFieldTitle}>Профиль создан: </span>
        {timestampToDate(createdAt)} в {timestampToTime(createdAt)}
      </div>
      <div className={classNames(s.role, s.infoField)}>
        <span className={s.infoFieldTitle}>Роль: </span> {role}
      </div>
      <div className={classNames(s.postsNumber, s.infoField)}>
        <span className={s.infoFieldTitle}>Постов создано: </span>
        {postsAmount?.length ? postsAmount.length : 0}
      </div>
    </div>
  );
}
