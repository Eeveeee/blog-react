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
    <div className={classNames(s.post, { [s.small]: !previewImage })}>
      <Link className={s.outer} to={`/post/${id}/${transliteration || ''}`}>
        {!!previewImage && (
          <div className={s.imageWrapper}>
            <img
              alt={'фон поста'}
              className={s.image}
              src={getMediaLink(previewImage)}
            />
          </div>
        )}
        <div className={s.part}>
          <div className={s.textWrapper}>
            <div className={s.title}>{title}</div>
            <div className={s.subtitle}>{subtitlePreview || subtitle}</div>
          </div>
          <div className={s.date}>{postCreated}</div>
        </div>
      </Link>
    </div>
  );
}
