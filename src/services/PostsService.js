import { getAuth } from 'firebase/auth';
import {
  collection,
  deleteDoc,
  doc,
  getDoc,
  getDocs,
  getFirestore,
  limit,
  orderBy,
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
  const q = query(
    collection(db, 'posts'),
    orderBy('createdAt', 'desc'),
    limit(amount)
  );
  const querySnapshot = await getDocs(q);
  const arr = querySnapshot.docs.map((doc) => ({ ...doc.data() }));
  return arr;
}

export async function updatePost(id, changes) {
  const db = getFirestore();
  const postRef = doc(db, 'posts', id);
  const post = {
    ...changes,
    updatedAt: serverTimestamp(),
  };
  await updateDoc(postRef, post);
}

export async function writePost(id, post) {
  const db = getFirestore();
  const auth = getAuth();
  await setDoc(doc(db, 'posts', id), {
    ...post,
    authorId: auth.currentUser.uid,
    createdAt: serverTimestamp(),
    updatedAt: serverTimestamp(),
  });
}
export async function deletePost(id) {
  const db = getFirestore();
  await deleteDoc(doc(db, 'posts', id));
}
