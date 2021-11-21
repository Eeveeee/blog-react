import React, { useEffect, useState } from 'react';
import s from './Info.module.scss';
import { dateFromMs, timeFromMs } from '../../../../utils/time';
import { RoundedImage } from '../../../../shared/RoundedImage/RoundedImage';
import testImage from '../../../../assets/test/test3.jpg';
import classNames from 'classnames';
import { getAuth } from '@firebase/auth';

export function Info({ user }) {
  const { username, createdAt, role, photoURL, posts, email } = user;
  return (
    <div className={s.info}>
      <div className={s.imageWrapper}>
        <RoundedImage src={photoURL} />
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
        {dateFromMs(createdAt)} в {timeFromMs(createdAt)}
      </div>
      <div className={classNames(s.role, s.infoField)}>
        <span className={s.infoFieldTitle}>Роль: </span> {role}
      </div>
      <div className={classNames(s.postsNumber, s.infoField)}>
        <span className={s.infoFieldTitle}>Постов создано: </span>
        {posts?.length ? posts.length : 0}
      </div>
    </div>
  );
}
