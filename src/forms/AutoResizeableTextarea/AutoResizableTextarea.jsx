import classNames from 'classnames';
import React, { useContext, useEffect, useRef, useState } from 'react';
import { Counter } from '../../shared/Counter/Counter';
import { autoResize } from '../../utils/autoResize';
import s from './AutoResizableTextarea.module.scss';

export function AutoResizableTextarea({ onChangeCb, value, limit }) {
  const textarea = useRef(null);
  function onChangeHandler(e) {
    const textarea = e.currentTarget;
    const textareaValue = textarea.value;
    autoResize(textarea);
    onChangeCb(textareaValue);
  }
  useEffect(() => {
    autoResize(textarea.current);
  }, []);
  return (
    <div className={s.wrapper}>
      <div className={s.counterWrapper}>
        <Counter limit={limit} current={value?.length || 0} />
      </div>
      <textarea
        ref={textarea}
        autoComplete="off"
        required
        name="content"
        value={value}
        onInput={onChangeHandler}
        className={s.textarea}
      />
    </div>
  );
}
