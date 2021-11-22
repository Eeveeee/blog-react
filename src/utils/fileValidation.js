import { convertSize } from './sizeConverter';

export function validateFile(file, options) {
  const { types, extensions, maxFileSize } = options;
  const fileType = file.type.split('/')[0];
  const fileExt = file.type.split('/')[1];
  const fileSize = convertSize(file.size);
  if (
    fileSize > maxFileSize ||
    !extensions.includes(fileExt) ||
    !types.includes(fileType)
  ) {
    return false;
  }
  return true;
}
export function validateFiles(files, options) {
  return files.reduce((acc, file) => {
    if (!acc) {
      return;
    }
    return (acc = validateFile(file, options));
  }, true);
}
