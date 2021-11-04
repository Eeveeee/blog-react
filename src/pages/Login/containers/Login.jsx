import React, { useEffect, useState } from 'react';
import s from './Login.module.scss';
import { Loader } from '../../../shared/Loader/Loader';
import { LoginForm } from '../components/LoginForm/LoginForm';
import { signIn, signUp } from '../../../services/AuthService';

export function Login() {
  const [loading, setLoading] = useState(false);
  console.log('in login');
  async function login(email, password) {
    setLoading(true);
    signIn(email, password)
      .then(() => {
        setLoading(false);
      })
      .catch((err) => {
        console.error(err, 'at login');
        setLoading(false);
      });
  }

  return (
    <div className={s.login}>
      <div className={s.container}>
        <LoginForm onLogin={login} />
      </div>
    </div>
  );
}
