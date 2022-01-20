import React from 'react';
import s from './Loader.module.scss';

export function Loader({ styles }) {
  return (
    <div styles={{ ...styles }} className={s.loader}>
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
