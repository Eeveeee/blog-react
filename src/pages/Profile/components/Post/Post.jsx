import React from 'react';
import { Link } from 'react-router-dom';
import { getMediaLink } from '../../../../utils/mediaHelper';
import { timestampToDate, timestampToTime } from '../../../../utils/time';
import s from './Post.module.scss';

export function Post({ post }) {
  const { postId, createdAt, title, subtitlePreview, previewImage, updatedAt } =
    post;
  const postCreated = `${timestampToDate(createdAt)} ${timestampToTime(
    createdAt
  )}`;
  const postUpdated = `${timestampToDate(updatedAt)} ${timestampToTime(
    updatedAt
  )}`;
  return (
    <div className={s.post}>
      <Link to={`/posts/${postId}`}>
        <div className={s.info}>
          <div className={s.created}>Пост создан: {postCreated}</div>
          <div className={s.created}>Пост обновлён: {postUpdated}</div>
        </div>
        <div className={s.content}>
          <div className={s.imageWrapper}>
            <img
              className={s.imageWrapperBg}
              src={getMediaLink(previewImage)}
            />
            <img className={s.image} src={getMediaLink(previewImage)} />
          </div>
          <div className={s.textWrapper}>
            <p className={s.title}>{title}</p>
            <p className={s.subtitle}>{subtitlePreview}</p>
          </div>
        </div>
      </Link>
    </div>
  );
}
