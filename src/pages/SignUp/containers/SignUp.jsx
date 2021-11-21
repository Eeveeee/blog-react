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

export function SignUp({ setCurrentUser }) {
  const [loading, setLoading] = useState(false);
  const [imagePreview, setImagePreview] = useState(false);

  async function submit(form, password, email, username, image) {
    const storage = getStorage();
    try {
      const auth = getAuth();
      const user = await signUp(email, password);
      const photoURL = image
        ? await uploadToStorage(image, 'users', user.uid)
        : false;
      await updateProfile(user, {
        displayName: username,
        photoURL,
      });
      await writeUserPublic(user.uid, username, photoURL);

      onAuthStateChanged(auth, (user) => {
        if (user) {
          const refObj = ref(storage, `users/` + user.uid);
          getDownloadURL(refObj).then((photoURL) =>
            setCurrentUser({ ...user, photoURL })
          );
        }
      });
    } catch (error) {
      console.error(error);
    }
  }
  async function fileInput(input, file) {
    const maxFileSize = 10;
    const types = ['image'];
    const extensions = input.accept.split('.').join('').split(',');
    if (
      validateFile(input, file, {
        types,
        extensions,
        maxFileSize,
      })
    ) {
      readFile(file).then((res) => {
        setImagePreview(res);
      });
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
