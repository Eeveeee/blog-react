import { getStorage, uploadBytes, ref, getDownloadURL } from 'firebase/storage';
import { v4 as uuidv4 } from 'uuid';

export async function uploadToStorage(
  file,
  folder,
  name = uuidv4(32).replaceAll('-', '')
) {
  const storage = getStorage();
  const storageRef = ref(storage, `${folder}/${name}`);
  return uploadBytes(storageRef, file)
    .then((snapshot) => {
      return getDownloadURL(storageRef)
        .then((url) => {
          return url;
        })
        .catch((err) => {
          throw new Error(err);
        });
    })
    .catch((err) => {
      throw new Error(err);
    });
}
