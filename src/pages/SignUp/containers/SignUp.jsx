import React, { useEffect, useState, useContext } from 'react';
import s from './SignUp.module.scss';
import { getStorage, uploadBytes, ref, getDownloadURL } from 'firebase/storage';
import { onAuthStateChanged } from 'firebase/auth';
import { Loader } from '../../../shared/Loader/Loader';
import { signUp } from '../../../services/AuthService';
import { uploadToStorage } from '../../../services/StorageService';
import { SignUpForm } from '../components/SignUpForm/SignUpForm';
import { getAuth, updateProfile } from '@firebase/auth';
import { validateFile } from '../../../utils/fileValidation';
import { readFile } from '../../../utils/fileReader';
import { NotificationsContext } from '../../../context/context';
import { passwordValidation } from '../../../utils/passwordValidation';
import { writeUserPublic } from '../../../services/UserService';
import { extensionsByType } from '../../../utils/extensionsByType';
import { errors } from '../../../global/errors';

export function SignUp({ setCurrentUser }) {
  const [loading, setLoading] = useState(false);
  const { addNotification } = useContext(NotificationsContext);
  async function submit(form, password, email, username, image) {
    const storage = getStorage();
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
      await writeUserPublic(user.uid, { username, photoURL });
    } catch (err) {
      addNotification({
        type: 'error',
        message: errors(err.code, 'Произошла ошибка при регистрации'),
      });
    }
  }
  return (
    <div className={s.signUp}>
      {loading ? (
        <Loader />
      ) : (
        <div className={s.container}>
          <SignUpForm submit={submit} />
        </div>
      )}
    </div>
  );
}
