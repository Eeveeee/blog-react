import React, { useEffect, useState, useContext } from 'react';
import s from './SignUp.module.scss';
import { getStorage, uploadBytes, ref, getDownloadURL } from 'firebase/storage';
import { onAuthStateChanged } from 'firebase/auth';
import { Loader } from '../../../shared/Loader/Loader';
import { signUp } from '../../../services/AuthService';
import { uploadToStorage } from '../../../services/StorageService';
import { writeUserPublic } from '../../../services/DbService';
import { SignUpForm } from '../components/SignUpForm/SignUpForm';
import { getAuth, updateProfile } from '@firebase/auth';
import { validateFile } from '../../../utils/fileValidation';
import { readFile } from '../../../utils/fileReader';
import { NotificationsContext } from '../../../context/context';
import { passwordValidation } from '../../../utils/passwordValidation';

export function SignUp({ setCurrentUser }) {
  const [loading, setLoading] = useState(false);
  const [imagePreview, setImagePreview] = useState(false);
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
      await updateProfile(user, {
        displayName: username,
        photoURL,
      });
      await writeUserPublic(user.uid, username, photoURL);
      const auth = getAuth();
      onAuthStateChanged(auth, (user) => {
        if (user) {
          const refObj = ref(storage, `users/` + user.uid);
          getDownloadURL(refObj).then((photoURL) =>
            setCurrentUser({ ...user, photoURL })
          );
        }
      });
    } catch (error) {
      addNotification({
        type: 'error',
        message: 'Произошла ошибка при регистрации',
      });
    }
  }
  async function fileInput(input, file) {
    const maxFileSize = 10;
    const types = ['image'];
    const extensions = input.accept.split('.').join('').split(',');
    const fileValidation = validateFile(file, {
      types,
      extensions,
      maxFileSize,
    });
    if (fileValidation) {
      readFile(file).then((res) => {
        setImagePreview(res);
      });
    } else {
      addNotification({
        type: 'danger',
        message: 'Выбранное изображение не подходит, попробуйте другое',
      });
      input.value = '';
      return;
    }
  }
  return (
    <div className={s.signUp}>
      {loading ? (
        <Loader />
      ) : (
        <div className={s.container}>
          <SignUpForm
            imagePreview={imagePreview}
            setImagePreview={setImagePreview}
            fileInput={fileInput}
            submit={submit}
          />
        </div>
      )}
    </div>
  );
}
