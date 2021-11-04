import React, { useEffect, useState, useContext } from 'react';
import s from './Add.module.scss';
import { addPost } from '../../../services/services';
import { uploadToStorage } from '../../../services/StorageService';
import { AddPostForm } from '../components/AddPostForm/AddPostForm';
import { validateFile } from '../../../utils/validateFile';
import { writePost } from '../../../services/DbService';
import { NotificationsContext } from '../../../context/context';
import { transliterationToEng } from '../../../utils/transliteration';

export function Add() {
  const [loading, setLoading] = useState(false);
  const maxFileSize = 10;
  function checkFileInput(input, files) {
    const types = ['image'];
    const extensions = input.accept.split('.').join('').split(',');
    Array.from(files).forEach((file) => {
      validateFile(input, file, {
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
    const postPrefix = transliterationToEng(form.title.value);
    writePost(
      form.title.value,
      form.subtitle.value,
      form.subtitlePreview.value || form.subtitle.value,
      form.content.value,
      imageLinks,
      postPrefix
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
