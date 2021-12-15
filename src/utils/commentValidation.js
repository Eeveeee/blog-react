export function commentValidation(comment) {
  if (!comment) {
    return false;
  }
  const errors = {
    empty: 'Комментарий пуст',
    normal: 'Комментарий содержит спец символы',
    size: 'Размер комментария превышает 5000',
  };
  const check = {
    empty: !comment.trim(),
    normal: !comment.normalize(),
    size: comment.length > 5000,
  };
  const isValid = Object.keys(errors).reduce((acc, error) => {
    if (check[error]) {
      acc.push(errors[error]);
    }
    return acc;
  }, []);
  if (isValid.length) {
    return isValid;
  }
  return true;
}
