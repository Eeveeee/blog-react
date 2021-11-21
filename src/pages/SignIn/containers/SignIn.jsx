import React, { useEffect, useState } from 'react';
import s from './SignIn.module.scss';
import { Loader } from '../../../shared/Loader/Loader';
import { SignInForm } from '../components/LoginForm/SignInForm';
import { signIn, signUp } from '../../../services/AuthService';

export function SignIn() {
  const [loading, setLoading] = useState(false);
  async function loginUser(email, password) {
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
    <div className={s.signIn}>
      <div className={s.container}>
        <SignInForm onLogin={loginUser} />
      </div>
    </div>
  );
}
