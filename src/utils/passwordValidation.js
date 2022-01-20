import { limits as GlobalLimits } from '../global/limits';

export function passwordValidation(password) {
  const popularWords = ['1q2w3e4r', 'letmein1', 'qwerty', 'qwerty123'];
  const bigLettersRegexp = /([A-Z])|([A-Z][a-z])/;
  const lettersRegexp = /([a-z])/;
  const numbersRegexp = /\d/;
  const limits = { ...GlobalLimits };
  const errors = {
    popular: `Пароль слишком популярен, усложните`,
    symbols: `Пароль должен содержать не менее 8 символов`,
    numbers: `Пароль должен содержать хотя бы одну цифру`,
    bigLetters: `Пароль должен содержать большую букву`,
    letters: `Пароль должен содержать  маленькую букву`,
  };
  const validation = {
    letters: lettersRegexp.test(password),
    bigLetters: bigLettersRegexp.test(password),
    numbers: numbersRegexp.test(password),
    popular: !popularWords.includes(password),
    symbols: password.length > limits.passwordMin,
  };
  const validationErrors = Object.keys(validation).reduce((acc, key) => {
    if (!validation[key]) {
      acc.push(errors[key]);
    }
    return acc;
  }, []);

  const validationResult = {
    status: validationErrors.length ? false : true,
    errors: validationErrors,
  };
  return validationResult;
}
