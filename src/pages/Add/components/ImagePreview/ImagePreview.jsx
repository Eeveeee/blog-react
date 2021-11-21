import React, { useEffect, useState } from 'react';
import { readFile } from '../../../../utils/fileReader';
import s from './ImagePreview.module.scss';

export function ImagePreview({ file }) {
  const [preview, setPreview] = useState(null);
  useEffect(async () => {
    setPreview(await readFile(file));
  }, []);
  if (!preview) {
    return null;
  }
  return <img className={s.image} src={preview} />;
}
