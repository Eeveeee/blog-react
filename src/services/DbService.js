import { getDatabase, ref, set, onValue, get, child } from 'firebase/database';
import postsJSON from '../db/posts.json';
import { v4 as uuidv4 } from 'uuid';

export async function getAllPosts() {
  const dbRef = ref(getDatabase());
  return get(child(dbRef, `posts/`));
}

export async function getPost(postID) {
  const dbRef = ref(getDatabase());
  return get(child(dbRef, `posts/${postID}`))
    .then((snapshot) => {
      if (snapshot.exists()) {
        return snapshot.val();
      } else {
        return false;
      }
    })
    .catch((error) => {
      console.error(error);
      return false;
    });
}
export async function writePost(
  title,
  subtitle,
  subtitlePreview,
  content,
  images,
  postPrefix = ''
) {
  const createdAt = Date.now();
  const postId = postPrefix + '_' + uuidv4();
  const db = getDatabase();
  set(ref(db, 'posts/' + postId), {
    postId,
    userId: false,
    createdAt,
    title,
    subtitle,
    subtitlePreview,
    content,
    images: images.length ? images : false,
  });
}

export function writePostsFromJSON() {
  const db = getDatabase();
  postsJSON.forEach((post) => {
    set(ref(db, 'posts/'), postsJSON);
  });
}
export function writeUserInfo(uid, username, imageURL) {
  const db = getDatabase();
  const createdAt = Date.now();
  set(ref(db, 'users/' + uid), {
    uid,
    createdAt,
    username,
    imageURL,
  });
}
export function getUserInfo(uid) {
  const dbRef = ref(getDatabase());
  return get(child(dbRef, `users/${uid}`))
    .then((snapshot) => {
      if (snapshot.exists()) {
        return snapshot.val();
      } else {
        return false;
      }
    })
    .catch((error) => {
      throw new Error(error);
    });
}
