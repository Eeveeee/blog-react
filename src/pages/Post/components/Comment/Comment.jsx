import { getAuth } from '@firebase/auth';
import React, { useContext, useEffect, useState } from 'react';
import GlobalSvgSelector from '../../../../assets/icons/global/GlobalSvgSelector';
import { getUserPublic } from '../../../../services/UserService';
import { Loader } from '../../../../shared/Loader/Loader';
import { RoundedImage } from '../../../../shared/RoundedImage/RoundedImage';
import { getFullTime, timestampToTime } from '../../../../utils/time';
import s from './Comment.module.scss';
import classNames from 'classnames';
import { Link } from 'react-router-dom';
import {
  deleteComment,
  editComment,
} from '../../../../services/CommentsService';
import { NotificationsContext } from '../../../../context/context';
import { commentValidation } from '../../../../utils/commentValidation';

export function Comment({ comment, onDeleteComment, onCommentUpdate }) {
  const { authorId, createdAt, content, id } = comment;
  const [author, setAuthor] = useState({ state: 'fetching', value: null });
  const [edit, setEdit] = useState({ state: false, value: null });
  const { addNotification } = useContext(NotificationsContext);
  const isMore = content.length > 300;
  const [reveal, setReveal] = useState(content.length <= 300);
  console.log(isMore);
  const { photoURL, username } = author.value || {};
  const currentUid = getAuth().currentUser?.uid || null;
  useEffect(() => {
    getUserPublic(authorId)
      .then((info) => {
        setAuthor({ state: 'success', value: { ...info } });
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
  function toggleReveal() {
    setReveal((reveal) => !reveal);
  }
  async function removeHandler() {
    const res = window.confirm('Вы уверены, что хотите удалить комментарий?');
    if (!res) {
      return;
    }
    onDeleteComment(id);
  }
  async function toggleEdit() {
    const errors = commentValidation(edit.value);
    if (errors?.length) {
      addNotification({
        type: 'error',
        message: errors.join(';'),
      });
      return;
    }
    if (edit.state) {
      onCommentUpdate(id, edit.value);
    }
    setEdit((edit) => ({ state: !edit.state, value: content }));
  }
  async function onCommentChange(e) {
    const newContent = e.currentTarget.value;
    setEdit((edit) => ({ state: edit.state, value: newContent }));
  }
  return (
    <div className={s.comment}>
      {author.state === 'success' ? (
        <div className={s.header}>
          <div className={s.author}>
            <Link to={`/profile/${authorId}`} className={s.avatarWrapper}>
              <RoundedImage src={photoURL} />
            </Link>
            <Link to={`/profile/${authorId}`} className={s.authorName}>
              {username}
            </Link>
            <div className={s.createdAt}>{defineCreatedAt(createdAt)}</div>
          </div>
          {currentUid === authorId && (
            <div className={s.manageComment}>
              <button
                onClick={toggleEdit}
                className={classNames(s.edit, { [s.save]: edit.state })}
              >
                <GlobalSvgSelector id={edit.state ? 'save' : 'edit'} />
              </button>
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
        <textarea
          onChange={onCommentChange}
          value={edit.value}
          className={s.editText}
        ></textarea>
      ) : (
        <div className={s.contentBlock}>
          <div className={s.content}>
            {reveal ? content : `${content.substr(0, 350)}...`}
          </div>
          {isMore && (
            <button onClick={toggleReveal} className={s.reveal}>
              {reveal ? 'Скрыть' : 'Читать дальше'}
            </button>
          )}
        </div>
      )}
    </div>
  );
}
