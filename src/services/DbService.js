import { getDatabase, ref, set, onValue, get, child } from 'firebase/database';
import postsJSON from '../db/posts.json';
import { v4 as uuidv4 } from 'uuid';

export async function getAllPosts() {
  const dbRef = ref(getDatabase());
  return get(child(dbRef, `posts/`));
}

export async function getPost(postID) {
  const dbRef = ref(getDatabase());
  get(child(dbRef, `posts/${postID}`))
    .then((snapshot) => {
      if (snapshot.exists()) {
        console.log(snapshot.val());
      } else {
        console.log('No data available');
      }
    })
    .catch((error) => {
      console.error(error);
    });
}
export async function writePost(
  title,
  subtitle,
  subtitlePreview,
  content,
  images
) {
  const ms = Date.now();
  const postId = uuidv4();
  const db = getDatabase();
  set(ref(db, 'posts/' + postId), {
    postId,
    userId: false,
    ms,
    title,
    subtitle,
    subtitlePreview,
    content,
    images: images,
  });
}

export function writePostsFromJSON() {
  const db = getDatabase();
  postsJSON.forEach((post) => {
    set(ref(db, 'posts/'), postsJSON);
  });
}
