import { getAuth } from 'firebase/auth';
import {
  collection,
  doc,
  getDoc,
  getDocs,
  getFirestore,
  query,
  serverTimestamp,
  setDoc,
  updateDoc,
  where,
} from 'firebase/firestore';

export async function getUserPosts(uid) {
  const db = getFirestore();
  const ref = collection(db, 'posts');
  const queryRef = query(ref, where('authorId', '==', uid));
  const querySnapshot = await getDocs(queryRef);
  const posts = querySnapshot.docs.map((snapshot) => ({
    ...snapshot.data(),
    id: snapshot.id,
  }));
  return posts;
}

export async function writeUserPublic(uid, userData) {
  const db = getFirestore();
  await setDoc(doc(db, 'users', uid), {
    createdAt: serverTimestamp(),
    updatedAt: serverTimestamp(),
    ...userData,
  });
}

export async function getUserPublic(uid) {
  const docRef = doc(getFirestore(), 'users', uid);
  const snapshot = await getDoc(docRef);
  if (snapshot.exists()) {
    return { ...snapshot.data(), id: snapshot.id };
  }
  return false;
}
export async function updateUserPublic(uid, changes) {
  const db = getFirestore();
  const userRef = doc(db, 'users', uid);
  await updateDoc(userRef, {
    updatedAt: serverTimestamp(),
    ...changes,
  });
}
