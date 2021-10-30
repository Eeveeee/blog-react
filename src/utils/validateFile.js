import { convertSize } from './sizeConverter';

export function validateFile(
  input,
  file,
  notifications,
  setNotifications,
  options
) {
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
    setNotifications([
      ...notifications,
      { text: `Невалидный файл,${Date.now()}` },
    ]);
    return false;
  }
  return true;
}
