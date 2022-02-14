import classNames from 'classnames';
import React, { useContext, useState } from 'react';
import { useHistory } from 'react-router';
import { v4 as uuidv4 } from 'uuid';
import { NotificationsContext } from '../../../context/context';
import { writePost } from '../../../services/PostsService';
import { uploadToStorage } from '../../../services/StorageService';
import { transliterationToEng } from '../../../utils/transliteration';
import { AddPostForm } from '../components/AddPostForm/AddPostForm';
import s from './Add.module.scss';

export function Add() {
  const [loading, setLoading] = useState(false);
  const history = useHistory();
  const { addNotification } = useContext(NotificationsContext);

  async function uploadPost(props) {
    const transliteration = transliterationToEng(props.title);
    const id = uuidv4();
    const postModel = { ...props, transliteration, id };
    const imageLinks = [];
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
    await writePost(id, postModel);
  }

  function formSubmit(formData) {
    setLoading(true);
    uploadPost(formData)
      .then(() => {
        setLoading(false);
        history.push('/home');
        return;
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
    <div className={classNames(s.add, 'pageContent')}>
      <div className="container">
        <AddPostForm onFormSubmit={formSubmit} isLoading={loading} />
      </div>
    </div>
  );
}
