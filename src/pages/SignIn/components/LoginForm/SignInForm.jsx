import React, { useEffect } from 'react';
import s from './SignInForm.module.scss';
import { addPost } from '../../../../services/services';
import GlobalSvgSelector from '../../../../assets/icons/global/GlobalSvgSelector';

export function SignInForm({ onLogin }) {
  function submitHandler(e) {
    e.preventDefault();
    const form = e.target;
    const login = form.elements.login.value;
    const password = form.elements.password.value;
    if (login.trim() && password.trim()) {
      onLogin(login, password);
    }
  }
  return (
    <div className={s.signInForm}>
      <form className={s.form} onSubmit={submitHandler}>
        <div className={s.inputTitle}>Почта:</div>
        <input required name="login" className={s.input} type="email" />
        <div className={s.inputTitle}>Пароль:</div>
        <input
          autoComplete="current-password"
          name="password"
          className={s.input}
          required
          type="password"
        />
        <button type="submit" className={s.submit}>
          Войти
        </button>
        <div className={s.loginGoogle}>
          Или войдите через <span>Google</span>
          <div className={s.loginGoogleIcon}>
            <GlobalSvgSelector id={'google'} />
          </div>
        </div>
      </form>
    </div>
  );
}
