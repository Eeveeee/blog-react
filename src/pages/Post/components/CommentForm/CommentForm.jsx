import React, { useContext, useState } from 'react';
import { NotificationsContext } from '../../../../context/context';
import { AutoResizableTextarea } from '../../../../forms/AutoResizeableTextarea/AutoResizableTextarea';
import { limits } from '../../../../global/limits';
import Button from '../../../../shared/Button/Button';
import { Counter } from '../../../../shared/Counter/Counter';
import s from './CommentForm.module.scss';

export function CommentForm({ onFormSubmit }) {
  const { addNotification } = useContext(NotificationsContext);
  const limit = limits.comment;
  const [comment, setComment] = useState('');
  function submitHandler(e) {
    e.preventDefault();
    const form = e.target;
    const content = comment.trim().normalize();
    if (!content) {
      addNotification({
        type: 'danger',
        message: 'Комментарий не может быть пустым',
      });
      return;
    }
    if (content.length > 2500) {
      addNotification({
        type: 'danger',
        message: `Комментарий превышает максимально допустимую длину: ${limit}`,
      });
      return;
    }
    onFormSubmit(form, content);
  }
  function onInputChange(value) {
    value = value.replace(/\s+/g, ' ');
    setComment(value || '');
  }
  function onFormReset(e) {
    setComment('');
  }
  return (
    <form onReset={onFormReset} onSubmit={submitHandler} className={s.form}>
      <div className={s.title}>Оставить комментарий</div>
      <AutoResizableTextarea
        onInputCb={onInputChange}
        value={comment}
        limit={limit}
      />
      <div className={s.submitBlock}>
        <Button
          styles={{ padding: '10px', width: 'auto' }}
          type="submit"
          id="submitForm_1"
          text="Оставить комментарий"
        />
      </div>
    </form>
  );
}
