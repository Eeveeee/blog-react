import classNames from 'classnames';
import React, { useContext, useState } from 'react';
import GlobalSvgSelector from '../../assets/icons/global/GlobalSvgSelector';
import { NotificationsContext } from '../../context/context';
import { errors } from '../../global/errors';
import { limits as globalLimits } from '../../global/limits';
import { Counter } from '../../shared/Counter/Counter';
import s from './EditableTextInput.module.scss';

export function EditableTextInput({
  setFoo,
  type = 'text',
  defaultValue = '',
  name = 'field',
  limit = 100,
  autoComplete = 'off',
}) {
  const { addNotification } = useContext(NotificationsContext);

  const [isEdit, setIsEdit] = useState(false);
  const [content, setContent] = useState({
    state: 'init',
    value: defaultValue,
  });
  const limits = { ...globalLimits };
  function handleChange(e) {
    e.preventDefault();
    const input = e.target;
    const inputVal = e.target.value;
    setContent({ state: 'edit', value: inputVal });
  }
  function toggleEdit(e) {
    e.preventDefault();
    setIsEdit((isEdit) => !isEdit);
  }
  function saveField(e) {
    e.preventDefault();
    const formattedValue = content.value?.trim() || '';
    if (!formattedValue) {
      addNotification({
        type: 'error',
        message: 'Поле не может быть пустым',
      });
      return;
    }
    if (defaultValue === formattedValue) {
      addNotification({
        type: 'danger',
        message: 'Значение совпадает с предыдущим',
      });
      restoreField();
      return;
    }
    setFoo(formattedValue);
  }
  function restoreField() {
    setIsEdit(false);
    setContent({ state: 'init', value: defaultValue });
  }
  return (
    <div className={s.wrapper}>
      <form onSubmit={saveField} className={s.inputBlock}>
        <input
          maxLength={limit}
          onChange={handleChange}
          name={name}
          readOnly={!isEdit}
          value={content.value}
          className={s.input}
          type={type}
          autoComplete={autoComplete}
        />
        <div className={s.manage}>
          {isEdit ? (
            <button type="submit" className={classNames(s.manageBtn, s.save)}>
              <GlobalSvgSelector id="save" />
            </button>
          ) : (
            <button onClick={toggleEdit} className={s.manageBtn}>
              <GlobalSvgSelector id="edit" />
            </button>
          )}

          {isEdit && (
            <button onClick={restoreField} className={s.manageBtn}>
              <GlobalSvgSelector id={'remove'} />
            </button>
          )}
        </div>
      </form>
      <div className={s.inputInfo}>
        <Counter current={content.value.length} limit={limit} />
      </div>
    </div>
  );
}
