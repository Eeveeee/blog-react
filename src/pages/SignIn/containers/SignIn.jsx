import React, { useContext, useState } from 'react';
import { NotificationsContext } from '../../../context/context';
import errors from '../../../global/errors';
import { signIn } from '../../../services/AuthService';
import { SignInForm } from '../components/LoginForm/SignInForm';
import s from './SignIn.module.scss';

export function SignIn() {
  const [loading, setLoading] = useState(false);
  const { addNotification } = useContext(NotificationsContext);
  async function loginUser(email, password) {
    setLoading(true);
    signIn(email, password)
      .then(() => {
        addNotification(
          {
            type: 'success',
            message: 'Вы успешно зашли в профиль',
          },
          3000
        );
      })
      .catch((err) => {
        console.error(err);
        setLoading(false);
        addNotification({
          type: 'error',
          message: errors(err.code),
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
