import React, { useContext } from 'react';
import GlobalSvgSelector from '../../../../assets/icons/global/GlobalSvgSelector';
import { NotificationsContext } from '../../../../context/context';
import { RoundedImage } from '../../../../shared/RoundedImage/RoundedImage';
import { passwordValidation } from '../../../../utils/passwordValidation';
import s from './SignUpForm.module.scss';

export function SignUpForm({ submit, fileInput, imagePreview }) {
  const { addNotification } = useContext(NotificationsContext);

  function submitHandler(e) {
    e.preventDefault();
    const form = e.target;
    const password = form.elements.password.value.normalize().trim();
    const email = form.elements.email.value.normalize().trim();
    const username = form.elements.username.value.normalize().trim();
    const image = form.elements.image.files[0] || false;
    const isPasswordValid = passwordValidation(password);
    if (isPasswordValid.status) {
      submit(form, password, email, username, image);
    } else {
      addNotification({
        type: 'error',
        message: isPasswordValid.errors.join(`;`),
      });
    }
  }
  function fileInputHandler(e) {
    const input = e.target;
    const file = input.files[0];
    fileInput(input, file);
  }
  return (
    <div className={s.signUpForm}>
      <form className={s.form} onSubmit={submitHandler}>
        <div className={s.inputTitle}>Почта:</div>
        <input required name="email" className={s.input} type="email" />
        <div className={s.inputTitle}>Пароль:</div>
        <input
          autoComplete="new-password"
          name="password"
          className={s.input}
          required
          type="password"
          minLength="8"
        />
        <div className={s.inputTitle}>Имя пользователя:</div>
        <input name="username" className={s.input} required type="text" />

        <div className={s.inputTitle}>Изображение профиля:</div>
        <div className={s.inputInfo}>*Размер не должен превышать 10Мб </div>
        <input
          onChange={fileInputHandler}
          accept=".webp,.jpg,.png,.jpeg"
          name="image"
          multiple={false}
          className={s.inputFile}
          type="file"
        />
        {imagePreview ? (
          <div className={s.previewWrapper}>
            <RoundedImage src={imagePreview} width={'150px'} height={'150px'} />
          </div>
        ) : null}
        <button type="submit" className={s.submit}>
          Зарегистрироваться
        </button>
        <div className={s.signUpGoogle}>
          Или зарегистрируйтесь через <span>Google</span>
          <div className={s.signUpGoogleIcon}>
            <GlobalSvgSelector id={'google'} />
          </div>
        </div>
      </form>
    </div>
  );
}
