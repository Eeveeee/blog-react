import PBKDF2 from 'crypto-js/pbkdf2';
import MD5 from 'crypto-js/md5';
import WordArray from 'crypto-js/lib-typedarrays';
import {
  getAuth,
  signOut,
  signInWithPopup,
  GoogleAuthProvider,
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
} from 'firebase/auth';
import { writeUserInfo } from './DbService';
import { v4 as uuidv4 } from 'uuid';

export async function signUp(email, password) {
  const auth = getAuth();
  return createUserWithEmailAndPassword(auth, email, password)
    .then((userCredential) => {
      const auth = getAuth();
      const user = userCredential.user;
      return auth.currentUser;
    })
    .catch((err) => {
      const errCode = err.code;
      const errMessage = err.message;
      throw new Error(errMessage, errCode);
    });
}
export function signUpGoogle() {}

export function getAccessToken() {
  return window.localStorage.getItem('accessToken');
}
export function setAccessToken(token) {
  window.localStorage.setItem('accessToken', token);
}

export async function signIn(email, password) {
  const auth = getAuth();
  signInWithEmailAndPassword(auth, email, password)
    .then((userCredential) => {
      const user = userCredential.user;
    })
    .catch((error) => {
      const errorCode = error.code;
      const errorMessage = error.message;
      console.log(errorCode);
    });
}

export async function signOutCurrentUser(auth) {
  signOut(auth)
    .then(() => {
      console.log('signed out');
    })
    .catch((err) => {
      throw new Error(err);
    });
}
