import * as yup from 'yup';

export const createValidator = (existingFeeds) => yup.string()
  .required()
  .url()
  .notOneOf(existingFeeds);

export const validateUrl = (url, schema) => new Promise((resolve, reject) => {
  schema.validate(url)
    .then(resolve)
    .catch((error) => {
      let errorKey = 'errors.unknown';

      if (error.type === 'required') errorKey = 'errors.required';
      else if (error.type === 'url') errorKey = 'errors.url';
      else if (error.type === 'notOneOf') errorKey = 'errors.notOneOf';

      reject(errorKey);
    });
});
