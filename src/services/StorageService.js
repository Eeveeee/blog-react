import { getStorage, uploadBytes, ref, getDownloadURL } from 'firebase/storage';
import { v4 as uuidv4 } from 'uuid';

export async function uploadToStorage(
  file,
  folder = 'posts',
  name = uuidv4(32).replaceAll('-', '')
) {
  const storage = getStorage();
  const storageRef = ref(storage, `${folder}/${name}`);
  console.log(storageRef.bucket);
  console.log(storageRef.fullPath);
  return uploadBytes(storageRef, file).then((snapshot) => {
    console.log('Uploaded a blob or file!');
    return getDownloadURL(storageRef).then((url) => {
      return url;
    });
  });
}
