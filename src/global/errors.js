export function errors(error, string = 'Произошла неизвестная ошибка') {
  switch (error) {
    case 'PERMISSION_DENIED':
      return 'У вас недостаточно прав для данной операции';

    case 'auth/wrong-password':
      return 'Неверный пароль';
    case 'auth/network-request-failed':
      return 'Неправильное имя пользователя или пароль, либо пользователь с таким логином уже существует';
    case 'auth/user-not-found':
      return 'Пользователь не найден';
    case 'auth/too-many-requests':
      return 'Слишком много попыток, попробуйте позже';
    case 'auth/invalid-email':
      return 'Неправильный адрес электронной почты';
    case 'auth/email-already-exists':
    case 'auth/email-already-in-use':
      return 'Пользователь с таким адресом почты уже существует';
    case 'storage/unauthorized':
      return 'У вас недостаточно прав для данной операции';
    case 'storage/retry-limit-exceeded':
      return 'Превышен лимит ожидания, попробуйте снова';
    case 'storage/quota-exceeded':
      return 'В хранилище закончилось место, свяжитесь с поддержкой';

    default:
      return string;
  }
}
