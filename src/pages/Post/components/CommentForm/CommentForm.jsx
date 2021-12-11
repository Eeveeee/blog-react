import React, { useContext } from 'react';
import { NotificationsContext } from '../../../../context/context';
import Button from '../../../../shared/Button/Button';
import s from './CommentForm.module.scss';

export function CommentForm({ onFormSubmit }) {
  const { addNotification } = useContext(NotificationsContext);
  function submitHandler(e) {
    e.preventDefault();
    const form = e.target;
    const content = form.elements['content'].value.normalize().trim();
    if (!content) {
      addNotification({
        type: 'danger',
        message: 'Комментарий не может быть пустым',
      });
      return;
    }
    onFormSubmit(form, content);
  }
  return (
    <form onSubmit={submitHandler} className={s.form}>
      <div className={s.title}>Оставить комментарий</div>
      <textarea name="content" className={s.content}></textarea>
      <Button
        styles={{ padding: '10px', width: 'auto' }}
        type="submit"
        id="submitForm_1"
        text="Оставить комментарий"
      />
    </form>
  );
}
