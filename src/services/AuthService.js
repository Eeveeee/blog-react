import {
  createUserWithEmailAndPassword,
  EmailAuthProvider,
  getAuth,
  reauthenticateWithCredential,
  signInWithEmailAndPassword,
  signOut,
} from 'firebase/auth';

export async function signUp(email, password) {
  const auth = getAuth();
  return createUserWithEmailAndPassword(auth, email, password).then(
    (userCredential) => {
      const user = userCredential.user;
      return user;
    }
  );
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
  return signInWithEmailAndPassword(auth, email, password);
}

export function signOutCurrentUser(auth) {
  return signOut(auth);
}
export async function reauthenticateUser(password) {
  const auth = getAuth();
  const user = auth.currentUser;
  const cred = EmailAuthProvider.credential(user.email, password);
  return reauthenticateWithCredential(user, cred);
}
