import React from 'react';
import s from './Button.module.scss';
function Button({ text = 'Отправить', styles = '', id }) {
  switch (id) {
    case 'submitForm_1':
      return (
        <button styles={styles} type="submit" className={s.submitForm_1}>
          {text}
        </button>
      );
    default:
      return (
        <button styles={styles} className={s.default}>
          {text}
        </button>
      );
  }
}
export default Button;
