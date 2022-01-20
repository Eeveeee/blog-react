import React, { useContext, useState } from 'react';
import { NotificationsContext } from '../../../../context/context';
import Button from '../../../../shared/Button/Button';
import { Counter } from '../../../../shared/Counter/Counter';
import s from './CommentForm.module.scss';

export function CommentForm({ onFormSubmit }) {
  const { addNotification } = useContext(NotificationsContext);
  const limit = 2500;
  const [comment, setComment] = useState(null);
  function submitHandler(e) {
    e.preventDefault();
    const form = e.target;
    const content = form.elements['content'].value.trim().normalize();
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
  function onInputChange(e) {
    const input = e.currentTarget;
    input.style.height = 'inherit';
    input.style.height = input.scrollHeight + 'px';
    setComment(input.value || null);
  }
  function onFormReset(e) {
    const form = e.target;
    setComment(null);
    form.elements['content'].style.height = 'inherit';
  }
  return (
    <form onReset={onFormReset} onSubmit={submitHandler} className={s.form}>
      <div className={s.title}>Оставить комментарий</div>
      <div className={s.inputBlock}>
        <textarea
          autoComplete="off"
          onChange={onInputChange}
          name="content"
          height={'auto'}
          className={s.content}
        >
          {comment}
        </textarea>
        <div className={s.counterWrapper}>
          <Counter current={comment?.length || 0} limit={limit} />
        </div>
      </div>
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
