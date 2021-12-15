import { getAuth } from '@firebase/auth';
import React, { useContext, useEffect, useState } from 'react';
import { useHistory } from 'react-router';
import { v4 as uuidv4 } from 'uuid';
import { NotificationsContext } from '../../../context/context';
import { getPost, writePost } from '../../../services/PostsService';
import { uploadToStorage } from '../../../services/StorageService';
import { getUserPublic, updateUserPublic } from '../../../services/UserService';
import { transliterationToEng } from '../../../utils/transliteration';
import { AddPostForm } from '../components/AddPostForm/AddPostForm';
import s from './Add.module.scss';

export function Add() {
  const [loading, setLoading] = useState(false);
  const history = useHistory();
  const { addNotification } = useContext(NotificationsContext);

  async function uploadPost(props) {
    const postModel = { ...props };
    const auth = getAuth();
    const imageLinks = [];
    const postPrefix = transliterationToEng(postModel.title);
    const postId = postPrefix + '_' + uuidv4();
    if (postModel.previewImage) {
      postModel.previewImage = await uploadToStorage(
        postModel.previewImage,
        'posts'
      );
    }
    if (postModel.images?.length) {
      for (const image of postModel.images) {
        await uploadToStorage(image, 'posts').then((link) => {
          imageLinks.push(link);
        });
      }
    }
    postModel.images = imageLinks.length ? imageLinks : [];
    await writePost(postId, postModel);
  }

  function formSubmit(formData) {
    setLoading(true);
    uploadPost(formData)
      .then(() => {
        setLoading(false);
        history.push('/home');
      })
      .catch((err) => {
        console.error(err);
        addNotification({
          type: 'error',
          message: 'Произошла ошибка при добавлении поста',
        });
        setLoading(false);
      });
  }
  return (
    <div className={s.add}>
      <div className={s.container}>
        <AddPostForm onFormSubmit={formSubmit} isLoading={loading} />
      </div>
    </div>
  );
}
