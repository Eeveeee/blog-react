import classNames from 'classnames';
import React, { useContext, useState } from 'react';
import { NotificationsContext } from '../../../context/context';
import { errors } from '../../../global/errors';
import { userModel } from '../../../models/userModel';
import { signUp } from '../../../services/AuthService';
import { uploadToStorage } from '../../../services/StorageService';
import { writeUserPublic } from '../../../services/UserService';
import { Loader } from '../../../shared/Loader/Loader';
import { SignUpForm } from '../components/SignUpForm/SignUpForm';
import s from './SignUp.module.scss';

export function SignUp({ setCurrentUser }) {
  const [loading, setLoading] = useState(false);
  const { addNotification } = useContext(NotificationsContext);
  async function submit(password, email, username, image) {
    try {
      const user = await signUp(email, password);
      addNotification(
        {
          type: 'success',
          message: 'Вы успешно зашли в профиль',
        },
        3000
      );
      const photoURL = image
        ? await uploadToStorage(image, 'users', user.uid)
        : false;
      await writeUserPublic(user.uid, {
        ...userModel,
        username,
        photoURL,
      });
    } catch (err) {
      console.error(err);
      addNotification({
        type: 'error',
        message: errors(err.code, 'Произошла ошибка при регистрации', 10000),
      });
    }
  }
  return (
    <div className={classNames(s.signUp, 'pageContent')}>
      {loading ? (
        <Loader />
      ) : (
        <div className="container">
          <SignUpForm submit={submit} />
        </div>
      )}
    </div>
  );
}
