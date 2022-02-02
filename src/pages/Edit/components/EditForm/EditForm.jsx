import classNames from 'classnames';
import { getAuth } from 'firebase/auth';
import React, { useContext, useEffect, useState } from 'react';
import { NotificationsContext } from '../../../../context/context';
import Button from '../../../../shared/Button/Button';
import { Loader } from '../../../../shared/Loader/Loader';
import { extensionsByType } from '../../../../utils/extensionsByType';
import { validateFile, validateFiles } from '../../../../utils/fileValidation';
import { Counter } from '../../../../shared/Counter/Counter';
import s from './EditForm.module.scss';
import { ImagePreview } from '../../../../forms/ImagePreview/ImagePreview';
import { AddFileForm } from '../../../../forms/AddFileForm/AddFileForm';
import { limits as globalLimits } from '../../../../global/limits';
import { AutoResizableTextarea } from '../../../../forms/AutoResizeableTextarea/AutoResizableTextarea';

export function EditForm({ postData, onFormSubmit, isLoading }) {
  const types = ['image'];
  const maxFileSize = 10;
  const { addNotification } = useContext(NotificationsContext);
  const required = ['title', 'subtitle', 'content'];
  const limits = {
    ...globalLimits,
  };
  const [post, setPost] = useState({
    title: null,
    subtitle: null,
    subtitlePreview: null,
    content: null,
    images: [],
    previewImage: null,
    ...postData,
  });
  function checkLimits(post) {
    return !Object.keys(post).find((key) => {
      if (post[key]?.length > limits[key]) {
        return post[key];
      }
      return false;
    });
  }
  function checkRequired(post) {
    return !Object.keys(post).find((key) => {
      if (required.includes(key)) {
        return !post[key];
      }
      return false;
    });
  }
  function getFormattedPost(post) {
    const formatted = Object.keys(post).reduce((acc, current) => {
      if (typeof post[current] === 'string') {
        const newVal = post[current].trim().normalize();
        !newVal ? (acc[current] = null) : (acc[current] = newVal);
      }
      return acc;
    }, {});
    return { ...post, ...formatted };
  }
  function formSubmitHandler(e) {
    e.preventDefault();
    const auth = getAuth();
    const formattedPost = getFormattedPost(post);
    const required = checkRequired(formattedPost);
    const limits = checkLimits(formattedPost);
    if (!limits) {
      addNotification({
        type: 'danger',
        message: 'Превышено количество символов',
      });
    }
    if (!required) {
      addNotification({
        type: 'danger',
        message: 'Обязательные поля должны быть заполнены',
      });
    }
    if (!required || !limits) {
      return;
    }
    const formData = {
      authorId: auth.currentUser.uid,
      ...formattedPost,
    };
    onFormSubmit(formData);
  }
  function handleNewFiles(files, input) {
    const filesArr = Array.from(files) || [];
    const extensions = extensionsByType('image');
    const validation = validateFiles(filesArr, {
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
    setPost((post) => ({ ...post, images: filesArr }));
  }
  function handleNewHeaderImage(files) {
    const headerImage = files[0];
    const extensions = extensionsByType('image');
    const validation = validateFile(headerImage, {
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
    setPost((post) => ({ ...post, previewImage: headerImage }));
  }

  function removeImage(image, e) {
    e.preventDefault();
    setPost((post) => ({
      ...post,
      images: post.images.filter((a) => a !== image),
    }));
  }
  function removeHeaderImage(e) {
    e.preventDefault();
    setPost((post) => ({ ...post, previewImage: null }));
  }
  function onInputChange(value, e) {
    const input = e.currentTarget;
    const name = input.name;
    if (name === 'content') {
      input.style.height = 'inherit';
      input.style.height = input.scrollHeight + 'px';
    }
    setPost((post) => ({ ...post, [name]: value }));
  }
  return (
    <div className={s.addPostForm}>
      <form className={s.form} onSubmit={formSubmitHandler}>
        <div className={s.inputTitle}>
          <span className={s.requiredMarker}>*</span>Заголовок:
        </div>
        <div className={s.inputWrapper}>
          <AutoResizableTextarea
            limit={limits.title}
            onInputCb={onInputChange}
            value={post.title || ''}
            name="title"
          />
          {/* <div className={s.counterWrapper}>
            <Counter current={post.title?.length} limit={limits.title} />
          </div>
          <input
            autoComplete="off"
            required
            name="title"
            onClick={inputClickHandler}
            className={classNames(s.input, s.inputText)}
            onInput={onInputChange}
            type="text"
            defaultValue={post.title || ''}
          /> */}
        </div>
        <div className={s.inputTitle}>
          <span className={s.requiredMarker}>*</span>Подзаголовок:
        </div>
        <AutoResizableTextarea
          limit={limits.subtitle}
          onInputCb={onInputChange}
          value={post.subtitle || ''}
          name="subtitle"
        />
        {/* <div className={s.inputWrapper}>
          <div className={s.counterWrapper}>
            <Counter current={post.subtitle?.length} limit={limits.subtitle} />
          </div>
          <input
            autoComplete="off"
            required
            name="subtitle"
            onClick={inputClickHandler}
            className={classNames(s.input, s.inputText)}
            onInput={onInputChange}
            type="text"
            defaultValue={post.subtitle || ''}
          />
        </div> */}
        <div className={s.inputTitle}>Превью подзаголовка:</div>
        <div className={s.inputWrapper}>
          <AutoResizableTextarea
            limit={limits.subtitlePreview}
            onInputCb={onInputChange}
            value={post.subtitlePreview || ''}
            name="subtitlePreview"
          />
          {/* <div className={s.counterWrapper}>
            <Counter
              current={post.subtitlePreview?.length}
              limit={limits.subtitlePreview}
            />
          </div>
          <input
            autoComplete="off"
            name="subtitlePreview"
            onClick={inputClickHandler}
            className={classNames(s.input, s.inputText)}
            onInput={onInputChange}
            type="text"
            defaultValue={post.subtitlePreview || ''}
          /> */}
        </div>
        <div className={s.inputTitle}>
          <span className={s.requiredMarker}>*</span>Содержание:
        </div>
        <div className={s.inputWrapper}>
          <AutoResizableTextarea
            limit={limits.content}
            onInputCb={onInputChange}
            value={post.content || ''}
            name="content"
          />
          {/* <div className={s.counterWrapper}>
            <Counter current={post.content?.length} limit={limits.content} />
          </div>
          <textarea
            autoComplete="off"
            required
            name="content"
            defaultValue={post.content || ''}
            onInput={onInputChange}
            className={classNames(s.input, s.inputText, s.textarea)}
          /> */}
        </div>
        <div className={s.inputTitle}>Превью поста / шапка:</div>
        <div className={s.inputFileWarning}>
          Размер файла не должен превышать {maxFileSize}Мб
        </div>
        <AddFileForm handleNewFiles={handleNewHeaderImage} multiple={false} />
        {post.previewImage && (
          <div className={s.ImagePreviewWrapper}>
            <button onClick={removeHeaderImage} className={s.removeBtn}>
              <span></span>
            </button>
            <ImagePreview file={post.previewImage} />
          </div>
        )}
        <div className={s.inputTitle}>Прикрепленные изображения:</div>
        <div className={s.inputFileWarning}>
          Размер файла не должен превышать {maxFileSize}Мб
        </div>
        <AddFileForm handleNewFiles={handleNewFiles} multiple={true} />
        {!!post.images?.length && (
          <div className={s.previewsWrapper}>
            <div className={s.imagePreviews}>
              {post.images.map((image, idx) => (
                <div key={idx} className={s.ImagePreviewWrapper}>
                  <button
                    onClick={(e) => removeImage(image, e)}
                    className={s.removeBtn}
                  >
                    <span></span>
                  </button>
                  <ImagePreview file={image} />
                </div>
              ))}
            </div>
          </div>
        )}
        {isLoading ? (
          <Loader
            style={{ width: '50px', height: '50px', alignSelf: 'center' }}
          />
        ) : (
          <Button id="submitForm_1" text="Сохранить изменения" />
        )}
      </form>
    </div>
  );
}
