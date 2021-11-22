import {
  getDatabase,
  ref,
  set,
  onValue,
  get,
  child,
  update,
  query,
  orderByChild,
  orderByKey,
  orderByValue,
  equalTo,
  limitToLast,
} from 'firebase/database';
import { v4 as uuidv4 } from 'uuid';
import { getAuth } from '@firebase/auth';

export async function getAllPosts() {
  const dbRef = ref(getDatabase());
  return get(child(dbRef, `posts/`));
}
export async function getUserPosts(uid) {
  const dbRef = ref(getDatabase());
  const postsRef = child(dbRef, 'posts');
  const recentPostsRef = query(postsRef, orderByChild('author'));
  const equalPostsRef = query(recentPostsRef, equalTo(uid));
  return get(equalPostsRef).then((snapshot) => {
    if (snapshot.exists()) {
      return Object.values(snapshot.val());
    } else {
      return false;
    }
  });
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
export async function updatePost(postID, changes) {
  try {
    const oldInfo = await getPost(postID);
    const userPublic = {
      ...oldInfo,
      ...changes,
      updatedAt: Date.now(),
    };
    const updates = {};
    const db = getDatabase();
    updates['/posts/' + postID] = userPublic;
    await update(ref(db), updates);
  } catch (err) {
    console.log(err);
  }
}
export async function writePost(props) {
  const {
    postId,
    author,
    title,
    subtitle,
    subtitlePreview,
    content,
    images,
    previewImage,
  } = props;
  const createdAt = Date.now();
  const db = getDatabase();
  await set(ref(db, `posts/` + postId), {
    postId,
    author,
    createdAt,
    updatedAt: createdAt,
    title,
    subtitle,
    subtitlePreview,
    content,
    images,
    previewImage,
  });
}

// export function writePostsFromJSON(json) {
//   const db = getDatabase();
//   json.forEach((post) => {
//     set(ref(db, 'posts/'), json);
//   });
// }

export async function writeUserPublic(uid, username, photoURL) {
  const db = getDatabase();
  const createdAt = Date.now();
  await set(ref(db, 'users/' + uid), {
    uid,
    createdAt,
    updatedAt: false,
    username,
    photoURL,
    posts: false,
    role: 'admin',
  }).catch((err) => {
    throw new Error(err);
  });
}

export async function updateUserPublic(uid, changes) {
  try {
    const oldInfo = await getUserPublic(uid);
    const userPublic = {
      ...oldInfo,
      ...changes,
      updatedAt: Date.now(),
    };
    const updates = {};
    const db = getDatabase();
    updates['/users/' + uid] = userPublic;
    await update(ref(db), updates);
  } catch (err) {
    console.log(err);
  }
}

export async function getUserPublic(uid) {
  const dbRef = ref(getDatabase());
  return get(child(dbRef, `users/${uid}`)).then((snapshot) => {
    if (snapshot.exists()) {
      return snapshot.val();
    } else {
      return false;
    }
  });
}
