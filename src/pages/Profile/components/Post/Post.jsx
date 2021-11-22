import React from 'react';
import s from './Post.module.scss';
import { dateFromMs, timeFromMs } from '../../../../utils/time';
import imagePlaceholder from '../../../../assets/images/imagePlaceholder.webp';
import { Link } from 'react-router-dom';

export function Post({ post }) {
  const { postId, createdAt, title, subtitlePreview, previewImage, updatedAt } =
    post;
  const postCreated = `${dateFromMs(createdAt)} ${timeFromMs(createdAt)}`;
  const postUpdated = `${dateFromMs(updatedAt)} ${timeFromMs(updatedAt)}`;
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
              src={previewImage ? previewImage : imagePlaceholder}
            />
            <img
              className={s.image}
              src={previewImage ? previewImage : imagePlaceholder}
            />
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
