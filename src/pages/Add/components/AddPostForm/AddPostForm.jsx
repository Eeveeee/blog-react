import React, { useEffect, useState } from 'react';
import s from './AddPostForm.module.scss';
import { Loader } from '../../../../shared/Loader/Loader';

export function AddPostForm({
  onFileInput,
  onFormSubmit,
  maxFileSize,
  isLoading,
}) {
  function fileInputHandler(e) {
    const input = e.target;
    const inputFiles = input.files;
    if (inputFiles.length) {
      onFileInput(input, inputFiles);
    }
  }
  function formSubmitHandler(e) {
    e.preventDefault();
    onFormSubmit(e.target);
  }
  function inputClickHandler(e) {
    e.target.style.border = `1px solid black`;
  }
  return (
    <div className={s.addPostForm}>
      <form className={s.form} onSubmit={formSubmitHandler}>
        <div className={s.inputTitle}>
          <span className={s.requiredMarker}>*</span>Заголовок:
        </div>
        <input
          required
          name="title"
          onClick={inputClickHandler}
          className={s.input}
          type="text"
        />
        <div className={s.inputTitle}>
          <span className={s.requiredMarker}>*</span>Подзаголовок:
        </div>
        <input
          required
          name="subtitle"
          onClick={inputClickHandler}
          className={s.input}
          type="text"
        />
        <div className={s.inputTitle}>Превью подзаголовка:</div>
        <input
          name="subtitlePreview"
          onClick={inputClickHandler}
          className={s.input}
          type="text"
        />
        <div className={s.inputTitle}>
          <span className={s.requiredMarker}>*</span>Содержание:
        </div>
        <textarea
          required
          name="content"
          onClick={inputClickHandler}
          className={s.textarea}
        />
        <div className={s.inputTitle}>Прикрепленные изображения:</div>
        <div className={s.inputFileWarning}>
          Размер файла не должен превышать {maxFileSize}Мб
        </div>
        <input
          onChange={fileInputHandler}
          accept=".webp,.jpg,.png,.jpeg"
          className={s.inputFile}
          multiple
          name="images"
          type="file"
        />
        {isLoading ? (
          <Loader
            style={{ width: '50px', height: '50px', alignSelf: 'center' }}
          />
        ) : (
          <button type="submit" className={s.submit}>
            Создать пост
          </button>
        )}
      </form>
    </div>
  );
}
