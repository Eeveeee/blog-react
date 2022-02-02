import React, { useContext, useEffect, useState } from 'react';
import { useHistory } from 'react-router';
import { useParams } from 'react-router-dom';
import { NotificationsContext } from '../../../context/context';
import { errors } from '../../../global/errors';
import { useAuthState } from '../../../hooks/useAuthState';
import { getPost, updatePost } from '../../../services/PostsService';
import { uploadToStorage } from '../../../services/StorageService';
import { transliterationToEng } from '../../../utils/transliteration';
import { EditForm } from '../components/EditForm/EditForm';
import s from './Edit.module.scss';

export function Edit() {
  const { id } = useParams();
  const [loading, setLoading] = useState(false);
  const [post, setPost] = useState({ state: 'fetching', value: null });
  const history = useHistory();
  const { addNotification } = useContext(NotificationsContext);
  const auth = useAuthState();
  useEffect(() => {
    let isAlive = true;
    async function fetchPost() {
      getPost(id)
        .then((postData) => {
          if (!isAlive) {
            return;
          }
          if (postData && auth.user) {
            if (auth.user?.uid !== postData.authorId) {
              addNotification({
                type: 'error',
                message: 'Вы не можете редактировать чужой пост',
              });
              history.push('/home');
              return;
            }
            setPost({ state: 'success', value: postData });
          } else {
            addNotification({
              type: 'error',
              message: 'Пост не найден',
            });
            history.push('/home');
            return;
          }
        })
        .catch((err) => {
          console.error(err);
          addNotification({
            type: 'error',
            message: errors(err.code, 'Произошла ошибка загрузки поста'),
          });
          history.push('/home');
          return;
        });
    }
    if (post.state === 'fetching') {
      if (auth.user) {
        fetchPost();
      }
    }
    return () => {
      isAlive = false;
    };
  }, [id, history, auth, addNotification, post]);
  async function uploadPost(props) {
    const postModel = { ...post.value, ...props };
    const imageLinks = [];
    const postId = postModel.id;
    postModel.transliteration = transliterationToEng(postModel.title) || '';
    if (postModel.previewImage && typeof postModel.previewImage !== 'string') {
      postModel.previewImage = await uploadToStorage(
        postModel.previewImage,
        'posts'
      );
    }
    if (postModel.images?.length && typeof postModel.images[0] !== 'string') {
      for (const image of postModel.images) {
        await uploadToStorage(image, 'posts').then((link) => {
          imageLinks.push(link);
        });
      }
      postModel.images = imageLinks;
    }
    await updatePost(postId, postModel);
    addNotification({
      type: 'success',
      message: 'Пост успешно изменён',
    });
    history.push(`/post/${postId}/`);
  }

  async function formSubmit(formData) {
    setLoading(true);
    try {
      await uploadPost(formData);
    } catch (err) {
      console.error(err);
      addNotification({
        type: 'error',
        message: 'Произошла ошибка при добавлении поста',
      });
      setLoading(false);
    }
  }
  return (
    <div className={s.add}>
      <div className="container">
        {post.value && (
          <EditForm
            postData={post.value}
            onFormSubmit={formSubmit}
            isLoading={loading}
          />
        )}
      </div>
    </div>
  );
}
