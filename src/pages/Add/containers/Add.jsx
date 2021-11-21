import { getAuth } from '@firebase/auth';
import React, { useEffect, useState } from 'react';
import { useHistory } from 'react-router';
import { v4 as uuidv4 } from 'uuid';
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

function useFetchState(id) {
  const [state, setState] = useState('init');
  const [context, setContext] = useState('');
  function fetchData() {
    state === 'init' && setState('fetching');
  }
  function success() {
    state === 'fetching' && setState('success');
  }
  function failure() {
    state === 'fetching' && setState('failure');
  }
  function retry() {
    state === 'failure' && setState('fetching');
  }
  function testFetch() {
    const p = Promise.resolve({});
    return p;
  }

  useEffect(() => {
    switch (state) {
      case 'fetching ':
        getPost(id).then((res) => {
          setContext(res);
          success();
        });
        break;

      default:
        break;
    }
  }, [state]);
  return [state, context, { fetchData, success, failure, retry }];
}

export function Add() {
  const [loading, setLoading] = useState(false);
  const [state, context, { fetchData, success, failure, retry }] =
    useFetchState('dghjghj_36944954-01d7-4ec7-9947-69ff3ff1a58c');
  const history = useHistory();

  function getPostData(formData) {
    const auth = getAuth();
    console.log(formData);
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
