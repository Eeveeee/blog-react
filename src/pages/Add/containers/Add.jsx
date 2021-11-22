import { getAuth } from '@firebase/auth';
import React, { useContext, useEffect, useState } from 'react';
import { useHistory } from 'react-router';
import { v4 as uuidv4 } from 'uuid';
import { NotificationsContext } from '../../../context/context';
import {
  getPost,
  getUserPublic,
  updateUserPublic,
  writePost,
} from '../../../services/DbService';
import { uploadToStorage } from '../../../services/StorageService';
import { transliterationToEng } from '../../../utils/transliteration';
import { AddPostForm } from '../components/AddPostForm/AddPostForm';
import s from './Add.module.scss';

export function Add() {
  const [loading, setLoading] = useState(false);
  const history = useHistory();
  const { addNotification } = useContext(NotificationsContext);
  console.log(addNotification);
  function getPostData(formData) {
    const auth = getAuth();
    const postPrefix = transliterationToEng(formData.title);
    const postData = {
      postId: postPrefix + '_' + uuidv4(),
      author: auth.currentUser.uid,
      ...formData,
    };
    return postData;
  }

  async function uploadPost(props) {
    const postModel = { ...props };
    const auth = getAuth();
    const imageLinks = [];
    postModel.previewImage = await uploadToStorage(
      postModel.previewImage,
      'posts'
    );
    for (const image of postModel.images) {
      await uploadToStorage(image, 'posts').then((link) => {
        imageLinks.push(link);
      });
    }
    postModel.images = imageLinks;
    await writePost(postModel);
    const userPublic = await getUserPublic(auth.currentUser.uid);
    if (!userPublic.posts) {
      userPublic.posts = [];
    }
    const posts = userPublic.posts.length
      ? [...userPublic.posts, postModel.postId]
      : [postModel.postId];
    await updateUserPublic(auth.currentUser.uid, { posts });
  }

  function formSubmit(formData) {
    setLoading(true);
    const postData = getPostData(formData);
    uploadPost(postData)
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
