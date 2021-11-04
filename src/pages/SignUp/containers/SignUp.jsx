import React, { useEffect, useState, useContext } from 'react';
import s from './SignUp.module.scss';
import { Loader } from '../../../shared/Loader/Loader';
import { signUp } from '../../../services/AuthService';
import { uploadToStorage } from '../../../services/StorageService';
import { writeUserInfo } from '../../../services/DbService';
import { SignUpForm } from '../components/SignUpForm/SignUpForm';
import { getAuth, updateProfile } from '@firebase/auth';
import { AuthContext } from '../../../context/context';
import { validateFile } from '../../../utils/validateFile';

export function SignUp() {
  const [loading, setLoading] = useState(false);
  const [imagePreview, setImagePreview] = useState(false);
  async function submit(form, password, email, username, image) {
    try {
      const user = await signUp(email, password);
      const imageUrl = await uploadToStorage(image, 'users');
      updateProfile(user, {
        displayName: username,
        photoURL: imageUrl,
      });
      writeUserInfo(user.uid, username, imageUrl);
    } catch (error) {
      console.error(error);
    }
  }
  async function fileInput(input, file, setImagePreview) {
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
      console.log('file valid');
      let reader = new FileReader();
      reader.readAsDataURL(file);
      reader.onload = () => {
        setImagePreview(reader.result);
      };
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
