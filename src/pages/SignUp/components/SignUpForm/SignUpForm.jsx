import React, { useContext, useState } from 'react';
import GlobalSvgSelector from '../../../../assets/icons/global/GlobalSvgSelector';
import { NotificationsContext } from '../../../../context/context';
import { AddFileForm } from '../../../../forms/AddFileForm/AddFileForm';
import { ImagePreview } from '../../../../forms/ImagePreview/ImagePreview';
import { limits } from '../../../../global/limits';
import { Counter } from '../../../../shared/Counter/Counter';
import { RoundedImage } from '../../../../shared/RoundedImage/RoundedImage';
import { extensionsByType } from '../../../../utils/extensionsByType';
import { validateFile } from '../../../../utils/fileValidation';
import { passwordValidation } from '../../../../utils/passwordValidation';
import s from './SignUpForm.module.scss';

export function SignUpForm({ submit, fileInput, imagePreview }) {
  const { addNotification } = useContext(NotificationsContext);
  const [data, setData] = useState({ preview: null, username: null });
  const types = ['image'];
  const maxNameLength = limits.username;
  const maxFileSize = limits.fileSize;
  function submitHandler(e) {
    e.preventDefault();
    const form = e.target;
    const username = form.elements.username.value.normalize().trim() || '';
    if (!username.length) {
      addNotification({
        type: 'danger',
        message: `Имя пользователя не может быть пустым`,
      });
      return;
    }
    if (username.length > maxNameLength) {
      addNotification({
        type: 'danger',
        message: `Имя пользователя должно быть до ${maxNameLength}`,
      });
      return;
    }
    const password = form.elements.password.value.normalize().trim();
    const email = form.elements.email.value.normalize().trim();
    const image = data?.preview || null;
    const isPasswordValid = passwordValidation(password);
    if (isPasswordValid.status) {
      submit(password, email, username, image);
    } else {
      addNotification({
        type: 'danger',
        message: isPasswordValid.errors.join(`;`),
      });
    }
  }

  function fileInputHandler(files) {
    if (!files?.length) {
      return;
    }
    const image = files[0];
    const extensions = extensionsByType('image');
    const validation = validateFile(image, {
      types,
      extensions,
      maxFileSize,
    });
    if (!validation) {
      addNotification({
        type: 'danger',
        message: 'Выбранное изображение не подходит, попробуйте другое',
      });
      return;
    }
    setData((data) => ({ ...data, preview: image }));
  }
  function removePreview(e) {
    e.preventDefault();
    setData((data) => ({ ...data, preview: null }));
  }
  function onUsernameChange(e) {
    const input = e.target;
    const text = input.value;
    setData((data) => ({ ...data, username: text || null }));
  }
  return (
    <div className={s.signUpForm}>
      <form autoComplete="on" className={s.form} onSubmit={submitHandler}>
        <div className={s.inputTitle}>Почта:</div>
        <input
          autoComplete="email"
          required
          name="email"
          className={s.input}
          type="email"
        />
        <div className={s.inputTitle}>Пароль:</div>
        <input
          autoComplete="new-password"
          name="password"
          className={s.input}
          required
          type="password"
          minLength="8"
          maxLength="16"
        />
        <div className={s.inputTitle}>Имя пользователя:</div>
        <div className={s.inputInfo}>*Не более 100 символов </div>
        <input
          onChange={onUsernameChange}
          autoComplete="nickname"
          name="username"
          className={s.input}
          required
          type="text"
        />
        <div className={s.counterWrapper}>
          <Counter current={data.username?.length || 0} limit={maxNameLength} />
        </div>

        <div className={s.inputTitle}>Изображение профиля:</div>
        <div className={s.inputInfo}>*Размер не должен превышать 10Мб </div>
        <AddFileForm handleNewFiles={fileInputHandler} multiple={false} />
        {data?.preview && (
          <div className={s.imagePreviewBlock}>
            <button onClick={removePreview} className={s.removeBtn}>
              <span></span>
            </button>
            <div className={s.imagePreviewWrapper}>
              <ImagePreview file={data.preview} />
            </div>
          </div>
        )}
        <button type="submit" className={s.submit}>
          Зарегистрироваться
        </button>
      </form>
    </div>
  );
}
