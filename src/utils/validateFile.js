import { convertSize } from './sizeConverter';

export function validateFile(input, file, options) {
  const { types, extensions, maxFileSize } = options;
  const fileType = file.type.split('/')[0];
  const fileExt = file.type.split('/')[1];
  const fileSize = convertSize(file.size);
  if (
    fileSize > maxFileSize ||
    !extensions.includes(fileExt) ||
    !types.includes(fileType)
  ) {
    input.value = null;
    return false;
  }
  return true;
}
