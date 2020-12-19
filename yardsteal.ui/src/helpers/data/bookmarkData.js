import axios from 'axios';
import { baseUrl } from '../apiKeys.json';

const getBookmarks = () => new Promise((resolve, reject) => {
  axios.get(`${baseUrl}/bookmarks`)
    .then((response) => resolve(response.data))
    .catch((err) => reject(err));
});

const addBookmark = (newBookmark) => axios.post(`${baseUrl}/bookmarks`, newBookmark);

export default { getBookmarks, addBookmark };
