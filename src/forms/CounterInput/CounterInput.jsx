import React, { useState } from 'react';
import { limits } from '../../global/limits';
import { Counter } from '../../shared/Counter/Counter';
import s from './CounterInput.module.scss';

export function CounterInput({
  setFn,
  currentValue,
  type = 'text',
  name = 'field',
  autoComplete = 'off',
  required = false,
}) {
  const content = currentValue[name] || '';
  function handleChange(e) {
    e.preventDefault();
    const inputVal = e.target.value;
    if (inputVal > limits[type]) {
      return;
    }
    setFn((currentValue) => ({ ...currentValue, [name]: inputVal }));
  }
  return (
    <div className={s.wrapper}>
      <input
        required={required}
        maxLength={limits[type]}
        onChange={handleChange}
        name={name}
        value={content}
        className={s.input}
        type={type}
        autoComplete={autoComplete}
      />
      <div className={s.inputInfo}>
        <Counter current={content.length} limit={limits[type]} />
      </div>
    </div>
  );
}
