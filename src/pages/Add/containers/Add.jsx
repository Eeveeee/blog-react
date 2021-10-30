import React, { useEffect, useState, useContext } from 'react';
import s from './Add.module.scss';
import { addPost } from '../../../services/services';
import { uploadToStorage } from '../../../services/StorageService';
import { AddPostForm } from '../components/AddPostForm/AddPostForm';
import { validateFile } from '../../../utils/validateFile';
import { writePost } from '../../../services/DbService';
import { NotificationsContext } from '../../../context/context';
export function Add() {
  console.log();
  const maxFileSize = 10;
  const [loading, setLoading] = useState(false);
  const { notifications, setNotifications } = useContext(NotificationsContext);
  function checkFileInput(input, files) {
    Array.from(files).forEach((file) => {
      const types = ['image'];
      const extensions = input.accept.split('.').join('').split(',');
      validateFile(input, file, notifications, setNotifications, {
        types,
        extensions,
        maxFileSize,
      });
    });
  }

  async function formSubmit(form) {
    const files = Array.from(form.images.files);
    const imageLinks = [];
    setLoading(true);
    for (const file of files) {
      await uploadToStorage(file)
        .then((link) => {
          console.log(link);
          imageLinks.push(link);
        })
        .catch((err) => {
          console.error(err, 'at images loading process');
          return;
        });
    }
    writePost(
      form.title.value,
      form.subtitle.value,
      form.subtitlePreview.value || form.subtitle.value,
      form.content.value,
      imageLinks
    )
      .then(() => {
        setLoading(false);
        form.reset();
      })
      .catch((err) => {
        console.log(err, 'at formSubmit process');
        return;
      });
  }
  const time = 5000;
  return (
    <div className={s.add}>
      <div className={s.container}>
        <AddPostForm
          onFormSubmit={formSubmit}
          onFileInput={checkFileInput}
          maxFileSize={maxFileSize}
          isLoading={loading}
        />
      </div>
    </div>
  );
}
