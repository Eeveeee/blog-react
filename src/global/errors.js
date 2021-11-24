function errors(error) {
  console.error(error);
  switch (error) {
    case 'PERMISSION_DENIED':
      return 'У вас недостаточно прав';
    case 'auth/wrong-password':
      return 'Неверный пароль';
    case 'auth/user-not-found':
      return 'Пользователь с таким логином не найден';
    case 'auth/too-many-requests':
      return 'Слишком много попыток, попробуйте позже';
    case 'auth/email-already-exists':
      return 'Пользователь с таким адресом уже существует';
    case 'PERMISSION_DENIED':
      return 'У вас недостаточно прав для данной операции';
    case 'storage/unauthorized':
      return 'У вас недостаточно прав для данной операции';
    case 'storage/retry-limit-exceeded':
      return 'Превышен лимит ожидания, попробуйте снова';
    case 'storage/retry-limit-exceeded':
      return 'Превышен лимит ожидания, попробуйте снова';
    case 'storage/quota-exceeded':
      return 'В хранилище закончилось место, свяжитесь с поддержкой';

    default:
      return 'Произошла неизвестная ошибка';
  }
}
export default errors;
