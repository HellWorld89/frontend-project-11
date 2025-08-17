import * as yup from 'yup';

export const createValidator = (existingFeeds) => yup.string()
  .required('Не должно быть пустым')
  .url('Ссылка должна быть валидным URL')
  .notOneOf(existingFeeds, 'RSS уже существует');

export const validateUrl = (url, schema) => new Promise((resolve, reject) => {
  schema.validate(url)
    .then(resolve)
    .catch((error) => reject(error.message));
});
