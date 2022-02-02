import classNames from 'classnames';
import React, { useContext, useEffect, useRef, useState } from 'react';
import { Counter } from '../../shared/Counter/Counter';
import { autoResize } from '../../utils/autoResize';
import s from './AutoResizableTextarea.module.scss';

export function AutoResizableTextarea({
  onInputCb,
  value,
  limit,
  name = 'text',
}) {
  const textarea = useRef(null);
  function onInputHandler(e) {
    const textarea = e.currentTarget;
    const textareaValue = textarea.value;
    onInputCb(textareaValue, e);
  }
  useEffect(() => {
    autoResize(textarea.current);
  }, [value]);
  return (
    <div className={s.wrapper}>
      <div className={s.counterWrapper}>
        <Counter limit={limit} current={value?.length || 0} />
      </div>
      <textarea
        ref={textarea}
        autoComplete="off"
        required
        name={name}
        value={value}
        onInput={onInputHandler}
        className={s.textarea}
      />
    </div>
  );
}
