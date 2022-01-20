import React from 'react';
import s from './AddFileForm.module.scss';

export function AddFileForm({
  handleNewFiles,
  multiple,
  text = 'Выбрать файл',
}) {
  function handleChange(e) {
    const input = e.currentTarget;
    if (!input.files.length) {
      return;
    }
    handleNewFiles(input.files);
    input.value = '';
  }
  return (
    <div className={s.inputBlock}>
      <input
        multiple={multiple}
        onChange={handleChange}
        accept="image/png, image/gif, image/jpeg, image/webp"
        className={s.inputFile}
        type="file"
        htmlFor="upload"
      />
      <button id="upload" className={s.inputFake}>
        {text}
      </button>
    </div>
  );
}
