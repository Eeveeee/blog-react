import {
  getStorage,
  uploadBytes,
  ref,
  getDownloadURL,
  deleteObject,
} from 'firebase/storage';
import { v4 as uuidv4 } from 'uuid';

export async function uploadToStorage(
  file,
  folder,
  name = uuidv4(32).replaceAll('-', '')
) {
  const storage = getStorage();
  const storageRef = ref(storage, `${folder}/${name}`);
  await uploadBytes(storageRef, file);
  return await getDownloadURL(storageRef);
}
export async function removeFromStorage(folder, name) {
  const storage = getStorage();
  const fileRef = ref(storage, `${folder}/${name}`);
  return await deleteObject(fileRef);
}
