import axios from 'axios';
import parseRSS from './parser';

export const fetchRSS = (url) => {
  const proxyUrl = `https://allorigins.hexlet.app/get?disableCache=true&url=${encodeURIComponent(url)}`;
  return axios.get(proxyUrl)
    .then((response) => {
      if (response.data.status.http_code !== 200) {
        throw new Error('errors.network');
      }
      return response.data.contents;
    })
    .catch((error) => {
      if (error.isAxiosError) {
        throw new Error('errors.network');
      }
      throw error;
    });
};

export const processFeed = (url, data) => {
  try {
    return parseRSS(data);
  } catch (error) {
    throw new Error('errors.parsing');
  }
};
