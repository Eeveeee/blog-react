import React, { useContext, useState } from 'react';
import { NotificationsContext } from '../../../context/context';
import { signIn } from '../../../services/AuthService';
import { SignInForm } from '../components/LoginForm/SignInForm';
import s from './SignIn.module.scss';

export function SignIn() {
  const [loading, setLoading] = useState(false);
  const { addNotification } = useContext(NotificationsContext);
  async function loginUser(email, password) {
    setLoading(true);
    signIn(email, password).catch((err) => {
      console.error(err);
      setLoading(false);
      addNotification({
        type: 'error',
        message: 'Произошла ошибка при попытке входа',
      });
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
