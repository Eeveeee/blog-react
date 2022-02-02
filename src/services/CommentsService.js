// @ts-check
import { getAuth } from '@firebase/auth';
import { deleteDoc, doc, orderBy, updateDoc } from '@firebase/firestore';
import {
  addDoc,
  collection,
  getDocs,
  getFirestore,
  limit,
  query,
  serverTimestamp,
  setDoc,
  where,
  startAfter,
} from 'firebase/firestore';
/**
 *
 * @param {string} postId
 * @param {string} comment
 */
export async function addPostComment(postId, authorId, comment) {
  const db = getFirestore();
  const ref = collection(db, 'comments');
  const auth = getAuth();
  if (!auth.currentUser) {
    throw new Error('not authorized');
  }
  await addDoc(ref, {
    postId,
    authorId,
    content: comment,
    createdAt: serverTimestamp(),
    updatedAt: serverTimestamp(),
  });
}
/**
 * @param {string} postId
 */
export async function getCommentsAmount(postId, amount) {
  const db = getFirestore();
  const ref = collection(db, 'comments');
  const queryRef = query(
    ref,
    where('postId', '==', postId),
    orderBy('createdAt', 'asc'),
    limit(amount)
  );
  const querySnapshot = await getDocs(queryRef);
  const comments = querySnapshot.docs.map((snapshot) => ({
    ...snapshot.data(),
    id: snapshot.id,
  }));
  return comments;
}
export async function deleteComment(commentId) {
  const db = getFirestore();
  await deleteDoc(doc(db, 'comments', commentId));
}
export async function editComment(commentId, content) {
  const db = getFirestore();
  const commentRef = doc(db, 'comments', commentId);
  await updateDoc(commentRef, { content, updatedAt: serverTimestamp() });
}
