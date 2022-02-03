import React from 'react';
import { Link } from 'react-router-dom';
import { getMediaLink } from '../../../../utils/mediaHelper';
import { timestampToDate, timestampToTime } from '../../../../utils/time';
import s from './Post.module.scss';

export function Post({ post }) {
  const { id, createdAt, title, previewImage, updatedAt } = post;
  const postCreated = `${timestampToDate(createdAt)} ${timestampToTime(
    createdAt
  )}`;
  const postUpdated = `${timestampToDate(updatedAt)} ${timestampToTime(
    updatedAt
  )}`;
  return (
    <div className={s.post}>
      <Link className={s.outer} to={`/post/${id}`}>
        <div className={s.content}>
          <div className={s.imageWrapper}>
            <img
              alt="Превью поста"
              className={s.image}
              src={getMediaLink(previewImage)}
            />
          </div>
          <div className={s.textWrapper}>
            <p className={s.title}>{title}</p>
            <div className={s.info}>
              <div className={s.date}>Создан: {postCreated}</div>
              <div className={s.date}>Обновлён: {postUpdated}</div>
            </div>
          </div>
        </div>
      </Link>
    </div>
  );
}
