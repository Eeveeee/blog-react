import {
  doc,
  getDoc,
  getFirestore,
  onSnapshot,
  serverTimestamp,
  setDoc,
  updateDoc,
} from 'firebase/firestore';

export async function writeUserPublic(uid, userData) {
  const db = getFirestore();
  await setDoc(doc(db, 'users', uid), {
    ...userData,
    id: uid,
    createdAt: serverTimestamp(),
    updatedAt: serverTimestamp(),
  });
}

export async function getUserPublic(uid) {
  const docRef = doc(getFirestore(), 'users', uid);
  const snapshot = await getDoc(docRef);
  if (snapshot.exists()) {
    return { ...snapshot.data() };
  }
  return false;
}
export async function updateUserPublic(uid, changes) {
  const db = getFirestore();
  const userRef = doc(db, 'users', uid);
  await updateDoc(userRef, {
    ...changes,
    updatedAt: serverTimestamp(),
  });
}
export function subscribeToPublic(uid, onSuccess, onError) {
  const db = getFirestore();
  return onSnapshot(
    doc(db, 'users', uid),
    (doc) => {
      if (doc.data()) {
        onSuccess(doc.data());
      }
    },
    (error) => {
      onError(error);
    }
  );
}
