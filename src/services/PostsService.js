import { getDatabase, update } from '@firebase/database';
import { ref } from '@firebase/storage';
import {
  collection,
  doc,
  getDoc,
  getDocs,
  getFirestore,
  limit,
  orderBy,
  query,
  startAfter,
  startAt,
  serverTimestamp,
  setDoc,
  deleteDoc,
} from 'firebase/firestore';

export async function getPost(id) {
  const docRef = doc(getFirestore(), 'posts', id);
  const snapshot = await getDoc(docRef);
  if (snapshot.exists()) {
    return { ...snapshot.data(), id: snapshot.id };
  }
  return false;
}
export async function getPostsAmount(amount) {
  const db = getFirestore();
  const q = query(collection(db, 'posts'), orderBy('createdAt'), limit(amount));
  const querySnapshot = await getDocs(q);
  const arr = querySnapshot.docs.map((doc) => ({ ...doc.data(), id: doc.id }));
  return arr;
}

export async function updatePost(id, changes) {
  const oldInfo = await getPost(id);
  const userPublic = {
    ...oldInfo,
    ...changes,
    updatedAt: serverTimestamp(),
  };
  const updates = {};
  const db = getDatabase();
  updates['/posts/' + id] = userPublic;
  await update(ref(db), updates);
}

export async function writePost(id, post) {
  const db = getFirestore();
  await setDoc(doc(db, 'posts', id), {
    createdAt: serverTimestamp(),
    updatedAt: serverTimestamp(),
    ...post,
  });
}
export async function deletePost(id) {
  const db = getFirestore();
  await deleteDoc(doc(db, 'posts', id));
}
