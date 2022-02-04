import React, { useContext, useEffect } from 'react';
import { NotificationsContext } from '../../../../context/context';
import { useAuthState } from '../../../../hooks/useAuthState';
import {
  addPostComment,
  deleteComment,
  editComment,
  getCommentsAmount,
} from '../../../../services/CommentsService';
import { Comment } from '../Comment/Comment';
import { CommentForm } from '../CommentForm/CommentForm';
import s from './Comments.module.scss';
import { settings } from '../../../../settings';
import { Loader } from '../../../../shared/Loader/Loader';

export function Comments({ postData }) {
  const auth = useAuthState();
  const [commentsAmount, setCommentsAmount] = React.useState(
    settings.commentsToLoad
  );
  const [isShowMore, setIsShowMore] = React.useState(true);
  const [comments, setComments] = React.useState({
    state: 'fetching',
    value: null,
  });
  const { addNotification } = useContext(NotificationsContext);
  useEffect(() => {
    let isAlive = true;
    if (comments.state === 'fetching') {
      async function fetchData() {
        getCommentsAmount(postData.id, commentsAmount)
          .then((res) => {
            if (!isAlive) {
              return;
            }
            if (res.length !== commentsAmount) {
              setIsShowMore(false);
            } else {
              setIsShowMore(true);
            }
            setComments(() => {
              return {
                state: 'success',
                value: res,
              };
            });
          })
          .catch((err) => {
            if (!isAlive) {
              return;
            }
            console.error(err);
            addNotification({
              type: 'error',
              message: 'Произошла ошибка загрузки комментариев',
            });
            setComments(() => ({ state: 'failed', value: null }));
          });
      }
      fetchData();
    }
    return () => {
      isAlive = false;
    };
  }, [postData, commentsAmount, comments, addNotification, isShowMore]);
  async function addComment(form, content) {
    addPostComment(postData.id, auth.user.uid, content)
      .then(() => {
        addNotification({
          type: 'success',
          message: 'Комментарий успешно добавлен',
        });
        setComments((comments) => ({
          state: 'fetching',
          value: comments.value,
        }));
        form.reset();
      })
      .catch((err) => {
        console.error(err);
        addNotification({
          type: 'error',
          message: 'Произошла ошибка добавления комментария',
        });
      });
  }
  function toggleShowMore() {
    setComments((comments) => ({
      state: 'fetching',
      value: comments.value,
    }));
    setCommentsAmount(
      (commentsAmount) => commentsAmount + settings.commentsToLoad
    );
  }
  async function onDeleteComment(id) {
    deleteComment(id)
      .then(() => {
        addNotification({
          type: 'success',
          message: 'Комментарий успешно удалён',
        });
        setComments((comments) => ({
          state: 'fetching',
          value: comments.value,
        }));
      })
      .catch((err) => {
        console.error(err);
        addNotification({
          type: 'error',
          message: 'Не удалось удалить комментарий',
        });
      });
  }
  async function onCommentUpdate(id, newContent) {
    try {
      await editComment(id, newContent);
      addNotification({
        type: 'success',
        message: 'Комментарий изменён',
      });
      setComments((comments) => ({
        state: 'fetching',
        value: comments.value,
      }));
    } catch (err) {
      console.error(err);
      addNotification({
        type: 'error',
        message: 'Ошибка изменения комментария',
      });
    }
  }

  return (
    <div className={s.commentsOuter}>
      {auth.state === 'auth' && <CommentForm onFormSubmit={addComment} />}
      {comments.value && (
        <div className={s.comments}>
          {comments.value.map((comment, idx) => (
            <Comment
              onDeleteComment={onDeleteComment}
              onCommentUpdate={onCommentUpdate}
              key={idx}
              comment={comment}
            />
          ))}
        </div>
      )}
      {isShowMore && comments.state !== 'fetching' && (
        <button onClick={toggleShowMore} className={s.showMore}>
          Показать ещё
        </button>
      )}
      {comments.state === 'fetching' && (
        <div className={s.loaderContainer}>
          <Loader />
        </div>
      )}
    </div>
  );
}
