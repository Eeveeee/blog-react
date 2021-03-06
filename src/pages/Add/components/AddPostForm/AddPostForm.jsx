import classNames from 'classnames';
import { getAuth } from 'firebase/auth';
import React, { useContext, useEffect, useState } from 'react';
import { NotificationsContext } from '../../../../context/context';
import Button from '../../../../shared/Button/Button';
import { Loader } from '../../../../shared/Loader/Loader';
import { extensionsByType } from '../../../../utils/extensionsByType';
import { validateFile, validateFiles } from '../../../../utils/fileValidation';
import { Counter } from '../../../../shared/Counter/Counter';
import s from './AddPostForm.module.scss';
import { ImagePreview } from '../../../../forms/ImagePreview/ImagePreview';
import { AddFileForm } from '../../../../forms/AddFileForm/AddFileForm';
import { autoResize } from '../../../../utils/autoResize';
import { limits } from '../../../../global/limits';
import { postModel } from '../../../../models/postModel';
import { limit } from '@firebase/firestore';
export function AddPostForm({ onFormSubmit, isLoading }) {
  const types = ['image'];
  const maxFileSize = 10;
  const { addNotification } = useContext(NotificationsContext);
  const required = ['title', 'subtitle', 'content'];
  const [post, setPost] = useState({ ...postModel });
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
    const form = e.target;
    const auth = getAuth();
    const formattedPost = getFormattedPost(post);
    const required = checkRequired(formattedPost);
    const limits = checkLimits(formattedPost);
    if (!limits) {
      addNotification({
        type: 'danger',
        message: '?????????????????? ???????????????????? ????????????????',
      });
    }
    if (!required) {
      addNotification({
        type: 'danger',
        message: '???????????????????????? ???????? ???????????? ???????? ??????????????????',
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
  function inputClickHandler(e) {
    e.target.style.border = `1px solid black`;
  }
  function handleNewFiles(files, input) {
    const filesArr = Array.from(files) || [];
    if (filesArr.length > limits.filesLimit) {
      addNotification({
        type: 'danger',
        message: `?????????????????????? ???????????? ???????? ???? ?????????? ${limits.filesLimit}`,
      });
      return;
    }
    const extensions = extensionsByType('image');
    const validation = validateFiles(filesArr, {
      types,
      extensions,
      maxFileSize,
    });
    if (!validation) {
      addNotification({
        type: 'danger',
        message: '?????????????????? ?????????????????????? ???? ????????????????, ???????????????????? ????????????',
      });
      return;
    }
    if (!validation) {
      addNotification({
        type: 'danger',
        message: '?????????????????? ?????????????????????? ???? ????????????????, ???????????????????? ????????????',
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
        message: '?????????????????? ?????????????????????? ???? ????????????????, ???????????????????? ????????????',
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
  function onInputChange(e) {
    const input = e.currentTarget;
    const type = input.name;
    const inputVal = input.value;
    if (type === 'content') {
      autoResize(input);
    }
    setPost((post) => ({ ...post, [type]: inputVal }));
  }
  return (
    <div className={s.addPostForm}>
      <form className={s.form} onSubmit={formSubmitHandler}>
        <div className={s.inputTitle}>
          <span className={s.requiredMarker}>*</span>??????????????????:
        </div>
        <div className={s.inputWrapper}>
          <div className={s.counterWrapper}>
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
          />
        </div>
        <div className={s.inputTitle}>
          <span className={s.requiredMarker}>*</span>????????????????????????:
        </div>
        <div className={s.inputWrapper}>
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
        </div>
        <div className={s.inputTitle}>???????????? ????????????????????????:</div>
        <div className={s.inputWrapper}>
          <div className={s.counterWrapper}>
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
          />
        </div>
        <div className={s.inputTitle}>
          <span className={s.requiredMarker}>*</span>????????????????????:
        </div>
        <div className={s.inputWrapper}>
          <div className={s.counterWrapper}>
            <Counter current={post.content?.length} limit={limits.content} />
          </div>
          <textarea
            autoComplete="off"
            required
            name="content"
            defaultValue={post.content || ''}
            onClick={inputClickHandler}
            onInput={onInputChange}
            className={classNames(s.input, s.inputText, s.textarea)}
          />
        </div>
        <div className={s.inputTitle}>???????????? ?????????? / ??????????:</div>
        <div className={s.inputFileWarning}>
          ???????????? ?????????? ???? ???????????? ?????????????????? {maxFileSize}????
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
        <div className={s.inputTitle}>?????????????????????????? ??????????????????????:</div>
        <div className={s.inputFileWarning}>
          ???????????? ?????????? ???? ???????????? ?????????????????? {maxFileSize}????
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
          <Button id="submitForm_1" text="?????????????? ????????????" />
        )}
      </form>
    </div>
  );
}
