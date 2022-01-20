import classNames from 'classnames';
import React from 'react';
import s from './Counter.module.scss';
export function Counter({ current, limit }) {
  current = current || 0;
  return (
    <div className={s.counter}>
      <span
        className={classNames(s.current, {
          [s.over]: current > limit,
        })}
      >
        {current}
      </span>
      <span className={s.devider}> / </span>
      <span className={s.limit}>{limit}</span>
    </div>
  );
}
