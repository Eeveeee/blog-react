import { convertSize } from './sizeConverter';

export function validateFile(file, options) {
  console.log(file);
  const { types, extensions, maxFileSize } = options;
  const fileType = file.type.split('/')[0];
  const fileExt = file.type.split('/')[1];
  const fileSize = convertSize(file.size);
  const isValid = fileSize < maxFileSize && types.includes(fileType);
  return isValid;
}

export function validateFiles(files, options) {
  return !files.find((file) => !validateFile(file, options));
}
