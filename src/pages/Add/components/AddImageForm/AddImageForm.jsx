import React, { useContext, useRef, useState } from 'react';
import s from './AddImageForm.module.scss';

export function AddImageForm({ handleNewFiles, multiple }) {
  function handleChange(e) {
    const input = e.currentTarget;
    if (!input.files.length) {
      return;
    }
    handleNewFiles(input.files, input);
    input.value = '';
  }
  return (
    <input
      multiple={multiple}
      onChange={handleChange}
      accept="image/png, image/gif, image/jpeg, image/webp"
      className={s.inputFile}
      type="file"
    />
  );
}
