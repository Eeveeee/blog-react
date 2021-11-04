import React from 'react';
import s from './RoundedImage.module.scss';

export function RoundedImage({ src, width = '100%', height = '100%' }) {
  return (
    <div style={{ width, height }} className={s.imageWrapper}>
      <img src={src} className={s.image} />
    </div>
  );
}
