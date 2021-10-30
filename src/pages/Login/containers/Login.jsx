import React, { useEffect } from 'react';
import s from './Login.module.scss';
import { Loader } from '../../../shared/Loader/Loader';
// import { addPost } from '../../../services/services';
import { LoginForm } from '../components/LoginForm/LoginForm';
import { signIn, signUp } from '../../../services/AuthService';
import { getAuth } from 'firebase/auth';

export function Login() {
  function login(email, password) {
    signIn(email, password);
  }

  return (
    <div className={s.login}>
      <div className={s.container}>
        <LoginForm onLogin={login} />
      </div>
    </div>
  );
}
