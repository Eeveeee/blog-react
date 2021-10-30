import React from 'react';
import s from './Loader.module.scss';

export function Loader({ style }) {
  return (
    <div style={style} className={s.loader}>
      <div className={s.ldsSpinner}>
        <div></div>
        <div></div>
        <div></div>
        <div></div>
        <div></div>
        <div></div>
        <div></div>
        <div></div>
        <div></div>
        <div></div>
        <div></div>
        <div></div>
      </div>
    </div>
  );
}
