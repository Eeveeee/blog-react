import React, { useEffect, useState } from 'react';
import { readFile } from '../../utils/fileReader';
import { getMediaLink } from '../../utils/mediaHelper';
import s from './ImagePreview.module.scss';

export function ImagePreview({ file }) {
  const [preview, setPreview] = useState(null);
  useEffect(() => {
    if (typeof file === 'string') {
      setPreview(file);
      return;
    }
    if (file instanceof File) {
      readFile(file).then((base64) => {
        setPreview(base64);
      });
      return;
    }
    setPreview(getMediaLink(file));
  }, [file]);
  if (!preview) {
    return null;
  }
  return <img alt="Превью" className={s.image} src={preview} />;
}
