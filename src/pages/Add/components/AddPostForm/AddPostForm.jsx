import { getAuth } from 'firebase/auth';
import React, { useContext, useState } from 'react';
import { NotificationsContext } from '../../../../context/context';
import Button from '../../../../shared/Button/Button';
import { Loader } from '../../../../shared/Loader/Loader';
import { extensionsByType } from '../../../../utils/extensionsByType';
import { validateFile, validateFiles } from '../../../../utils/fileValidation';
import { AddImageForm } from '../AddImageForm/AddImageForm';
import { ImagePreview } from '../ImagePreview/ImagePreview';
import s from './AddPostForm.module.scss';
export function AddPostForm({ onFormSubmit, isLoading }) {
  const [headerImage, setHeaderImage] = useState(null);
  const [images, setImages] = useState([]);
  const types = ['image'];
  const maxFileSize = 10;
  const { addNotification } = useContext(NotificationsContext);
  function formSubmitHandler(e) {
    e.preventDefault();
    const form = e.target;
    const auth = getAuth();
    const formData = {
      authorId: auth.currentUser.uid,
      title: form.title.value,
      subtitle: form.subtitle.value,
      subtitlePreview: form.subtitlePreview.value || form.subtitle.value,
      content: form.content.value,
      images: images || [],
      previewImage: headerImage || [],
    };
    onFormSubmit(formData);
  }
  function inputClickHandler(e) {
    e.target.style.border = `1px solid black`;
  }
  function handleNewFiles(files, input) {
    const filesArr = Array.from(files);
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
    setImages(filesArr);
  }
  function handleNewHeaderImage(files, input) {
    const extensions = extensionsByType('image');
    const validation = validateFile(files[0], {
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
    setHeaderImage(files[0]);
  }

  function removeImage(image, e) {
    e.preventDefault();
    setImages((images) => images.filter((a) => a !== image));
  }
  function removeHeaderImage(e) {
    e.preventDefault();
    setHeaderImage(null);
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
        <div className={s.inputTitle}>Превью поста / шапка:</div>
        <div className={s.inputFileWarning}>
          Размер файла не должен превышать {maxFileSize}Мб
        </div>
        <AddImageForm handleNewFiles={handleNewHeaderImage} multiple={false} />
        {!!headerImage && (
          <div className={s.ImagePreviewWrapper}>
            <button onClick={removeHeaderImage} className={s.removeBtn}>
              <span></span>
            </button>
            <ImagePreview file={headerImage} />
          </div>
        )}
        <div className={s.inputTitle}>Прикрепленные изображения:</div>
        <div className={s.inputFileWarning}>
          Размер файла не должен превышать {maxFileSize}Мб
        </div>
        <AddImageForm handleNewFiles={handleNewFiles} multiple={true} />
        <div className={s.imagePreviews}>
          {images.map((image, idx) => (
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
        {isLoading ? (
          <Loader
            style={{ width: '50px', height: '50px', alignSelf: 'center' }}
          />
        ) : (
          <Button id="submitForm_1" text="Создать статью" />
        )}
      </form>
    </div>
  );
}
