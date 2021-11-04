import React from 'react';
import s from './Logout.module.scss';
import { GlobalSvgSelector } from '../../assets/icons/global/GlobalSvgSelector';

export function Logout() {
  return (
    <div className={s.logout}>
      <div className={s.iconWrapper}>
        <GlobalSvgSelector id="" />
      </div>
    </div>
  );
}
