import React, { useEffect, useState } from 'react';
import { readFile } from '../../../../utils/fileReader';
import s from './ImagePreview.module.scss';

export function ImagePreview({ file }) {
  const [preview, setPreview] = useState(null);
  useEffect(() => {
    readFile(file).then((base64) => {
      setPreview(base64);
    });
  }, [file]);
  if (!preview) {
    return null;
  }
  return <img className={s.image} src={preview} />;
}
