import React from 'react';
import s from './Post.module.scss';
import { dateFromMs, timeFromMs } from '../../../../utils/time';
import imagePlaceholder from '../../../../assets/images/imagePlaceholder.webp';
import { Link } from 'react-router-dom';

export function Post({ data }) {
  const {
    postId,
    author,
    createdAt,
    title,
    subtitlePreview,
    images,
    previewImage,
  } = data;
  const postCreated = `${dateFromMs(createdAt)} ${timeFromMs(createdAt)}`;
  return (
    <div className={s.post}>
      <Link to={`/posts/${postId}`}>
        <div className={s.info}>
          <div className={s.id}>ID поста: {postId}</div>
          <div className={s.userId}>ID пользователя: {author}</div>
          <div className={s.created}>Пост создан: {postCreated}</div>
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
