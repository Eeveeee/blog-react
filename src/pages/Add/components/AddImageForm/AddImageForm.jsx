import React, { useRef, useState } from 'react';
import { readFile } from '../../../../utils/fileReader';
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
      accept=".webp,.jpg,.png,.jpeg"
      className={s.inputFile}
      type="file"
    />
  );
}
