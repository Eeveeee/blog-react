import { getAuth } from '@firebase/auth';
import classNames from 'classnames';
import React, { useContext, useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import GlobalSvgSelector from '../../../../assets/icons/global/GlobalSvgSelector';
import { NotificationsContext } from '../../../../context/context';
import { AutoResizableTextarea } from '../../../../forms/AutoResizeableTextarea/AutoResizableTextarea';
import { limits } from '../../../../global/limits';
import { getUserPublic } from '../../../../services/UserService';
import { Loader } from '../../../../shared/Loader/Loader';
import { RoundedImage } from '../../../../shared/RoundedImage/RoundedImage';
import { commentValidation } from '../../../../utils/commentValidation';
import { getFullTime, timestampToTime } from '../../../../utils/time';
import s from './Comment.module.scss';

export function Comment({ comment, onDeleteComment, onCommentUpdate }) {
  const { authorId, createdAt, content, id } = comment;
  const [author, setAuthor] = useState({ state: 'fetching', value: null });
  const [edit, setEdit] = useState({ state: false, value: content || '' });
  const { addNotification } = useContext(NotificationsContext);
  const isMore = edit.state
    ? edit.value > limits.commentPreview
    : content.length > limits.commentPreview;
  const [hidden, setHidden] = useState(content.length > limits.commentPreview);
  const { photoURL, username } = author.value || {};
  const currentUid = getAuth().currentUser?.uid || null;
  useEffect(() => {
    getUserPublic(authorId)
      .then((info) => {
        if (Object.keys(info).length) {
          setAuthor({ state: 'success', value: { ...info } });
          return;
        }
        setAuthor({ state: 'success', value: null });
      })
      .catch((err) => {
        console.error(err);
        setAuthor({ state: 'failure', value: null });
      });
  }, [authorId]);
  function defineCreatedAt(createdAt) {
    const now = new Date();
    const createdAtDate = createdAt.toDate();
    const yearCheck = createdAtDate.getFullYear() === now.getFullYear();
    const monthCheck = createdAtDate.getMonth() === now.getMonth();
    const dayCheck = createdAtDate.getDate() === now.getDate();
    if (yearCheck && monthCheck && dayCheck) {
      return `Сегодня, в ${timestampToTime(createdAt)}`;
    }
    return getFullTime(createdAt);
  }
  function toggleHidden() {
    setHidden((hidden) => !hidden);
  }
  async function removeHandler() {
    const res = window.confirm('Вы уверены, что хотите удалить комментарий?');
    if (!res) {
      return;
    }
    onDeleteComment(id);
  }
  async function handleEdit() {
    const value = edit.value.normalize();
    const errors = commentValidation(value);
    if (errors?.length) {
      addNotification({
        type: 'error',
        message: errors.join('\n'),
      });
      return;
    }
    onCommentUpdate(id, value).then(() => {
      setHidden(value.length > limits.commentPreview);
    });
    setEdit((edit) => ({ ...edit, state: false }));
  }
  async function onCommentChange(value) {
    value = value.replace(/\s+/g, ' ');
    setEdit((edit) => ({ state: edit.state, value: value }));
  }
  function returnValue() {
    setEdit({ state: false, value: content });
  }
  function turnEditOn() {
    setEdit((edit) => ({ ...edit, state: true }));
  }
  return (
    <div className={s.comment}>
      {author.state === 'success' ? (
        <div className={s.header}>
          <div className={s.author}>
            {author.value ? (
              <Link to={`/profile/${authorId}`} className={s.avatarWrapper}>
                <RoundedImage src={photoURL} />
              </Link>
            ) : (
              <span className={s.avatarWrapper}>
                <RoundedImage src={photoURL} />
              </span>
            )}
            {author.value ? (
              <Link to={`/profile/${authorId}`} className={s.authorName}>
                {username}
              </Link>
            ) : (
              <span className={s.authorName}>Пользователь удалён</span>
            )}
          </div>
          {currentUid === authorId && (
            <div className={s.manageComment}>
              {edit.state && (
                <button
                  onClick={returnValue}
                  className={classNames(s.edit, s.return)}
                >
                  <GlobalSvgSelector id="return" />
                </button>
              )}
              {edit.state ? (
                <button
                  onClick={handleEdit}
                  className={classNames(s.edit, s.save)}
                >
                  <GlobalSvgSelector id={'save'} />
                </button>
              ) : (
                <button onClick={turnEditOn} className={s.edit}>
                  <GlobalSvgSelector id={'edit'} />
                </button>
              )}

              <button onClick={removeHandler} className={s.remove}>
                <GlobalSvgSelector id={'remove'} />
              </button>
            </div>
          )}
        </div>
      ) : (
        <Loader />
      )}
      {edit.state ? (
        <AutoResizableTextarea
          onInputCb={onCommentChange}
          value={edit.value}
          limit={limits.comment}
        />
      ) : (
        <div className={s.contentBlock}>
          <div className={s.content}>
            {hidden ? `${content.substr(0, 350)}...` : content}
          </div>
          {isMore && (
            <button onClick={toggleHidden} className={s.reveal}>
              {hidden ? 'Читать дальше' : 'Скрыть'}
            </button>
          )}
        </div>
      )}
      <div className={s.createdAt}>{defineCreatedAt(createdAt)}</div>
    </div>
  );
}
