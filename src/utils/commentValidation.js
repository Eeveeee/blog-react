import { limits } from '../global/limits';

export function commentValidation(comment) {
  const limit = limits.comment;
  const errors = {
    empty: 'Комментарий пуст',
    size: `Размер комментария превышает ${limit}`,
  };
  const check = {
    empty: !comment.trim(),
    size: comment.length > limit,
  };
  const isValid = Object.keys(errors).reduce((acc, error) => {
    if (check[error]) {
      acc.push(errors[error]);
    }
    return acc;
  }, []);

  return isValid;
}
