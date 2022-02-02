import classNames from 'classnames';
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
    <div className={classNames(s.post, s.big)}>
      <Link className={s.wrapper} to={`/post/${id}/${transliteration || ''}`}>
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
        <div className={s.date}>{postCreated}</div>
      </Link>
    </div>
  );
}
