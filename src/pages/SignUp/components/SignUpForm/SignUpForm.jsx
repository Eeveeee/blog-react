import React, { useEffect } from 'react';
import s from './SignUpForm.module.scss';
import GlobalSvgSelector from '../../../../assets/icons/global/GlobalSvgSelector';
import testImage from '../../../../assets/test/test1.jpg';
import { RoundedImage } from '../../../../shared/RoundedImage/RoundedImage';
import { validateFile } from '../../../../utils/validateFile';

export function SignUpForm({
  submit,
  fileInput,
  setImagePreview,
  imagePreview,
}) {
  function submitHandler(e) {
    e.preventDefault();
    const form = e.target;
    const password = form.elements.password.value;
    const email = form.elements.email.value;
    const username = form.elements.username.value;
    const image = form.elements.image.files[0];
    if (email.trim() && password.trim() && username.trim()) {
      submit(form, password, email, username, image);
    }
  }
  function fileInputHandler(e) {
    const input = e.target;
    const file = input.files[0];
    fileInput(input, file, setImagePreview);
  }
  return (
    <div className={s.signUpForm}>
      <form className={s.form} onSubmit={submitHandler}>
        <div className={s.inputTitle}>Почта:</div>
        <input required name="email" className={s.input} type="email" />
        <div className={s.inputTitle}>Пароль:</div>
        <input
          autoComplete="current-password"
          name="password"
          className={s.input}
          required
          type="password"
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
