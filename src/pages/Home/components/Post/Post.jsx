import React from 'react';
import { Link } from 'react-router-dom';
import { getMediaLink } from '../../../../utils/mediaHelper';
import { timestampToDate, timestampToTime } from '../../../../utils/time';
import { transliterationToEng } from '../../../../utils/transliteration';
import s from './Post.module.scss';

export function Post({ data }) {
  const {
    id,
    authorId,
    createdAt,
    title,
    subtitle,
    subtitlePreview,
    previewImage,
    transliteration,
  } = data;
  const postCreated = `${timestampToDate(createdAt)} ${timestampToTime(
    createdAt
  )}`;
  return (
    <div className={s.post}>
      <Link to={`/post/${id}/${transliteration || ''}`}>
        <div className={s.info}>
          <div className={s.id}>ID поста: {id}</div>
          <div className={s.userId}>ID пользователя: {authorId}</div>
          <div className={s.created}>Пост создан: {postCreated}</div>
        </div>
        <div className={s.content}>
          <div className={s.imageWrapper}>
            <img
              alt={'фото поста'}
              className={s.imageWrapperBg}
              src={getMediaLink(previewImage)}
            />
            <img
              alt={'фон поста'}
              className={s.image}
              src={getMediaLink(previewImage)}
            />
          </div>
          <div className={s.textWrapper}>
            <p className={s.title}>{title}</p>
            <p className={s.subtitle}>{subtitlePreview || subtitle}</p>
          </div>
        </div>
      </Link>
    </div>
  );
}
