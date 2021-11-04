import React from 'react';
import s from './Post.module.scss';
import { dateFromMs, timeFromMs } from '../../../../utils/time';
import imagePlaceholder from '../../../../assets/images/imagePlaceholder.webp';

export function Post({ data, onPostClick }) {
  const { postId, userId, createdAt, title, subtitlePreview, images } = data;
  const postCreated = `${dateFromMs(createdAt)} ${timeFromMs(createdAt)}`;

  function clickHandler(e) {
    onPostClick(postId);
  }
  return (
    <div onClick={clickHandler} className={s.post}>
      <div className={s.info}>
        <div className={s.id}>ID поста: {postId}</div>
        <div className={s.userId}>ID пользователя: {userId}</div>
        <div className={s.created}>Пост создан: {postCreated}</div>
      </div>
      <div className={s.content}>
        <div className={s.imageWrapper}>
          <img
            className={s.imageWrapperBg}
            src={images ? images[0] : imagePlaceholder}
          />
          <img
            className={s.image}
            src={images ? images[0] : imagePlaceholder}
          />
        </div>
        <div className={s.textWrapper}>
          <p className={s.title}>{title}</p>
          <p className={s.subtitle}>{subtitlePreview}</p>
        </div>
      </div>
    </div>
  );
}
