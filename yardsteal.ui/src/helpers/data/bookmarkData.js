import axios from 'axios';
import { baseUrl } from '../apiKeys.json';

const getBookmarks = () => new Promise((resolve, reject) => {
  axios.get(`${baseUrl}/bookmarks`)
    .then((response) => resolve(response.data))
    .catch((err) => reject(err));
});

const addBookmark = (newBookmark) => axios.post(`${baseUrl}/bookmarks`, newBookmark);

const removeBookmark = (postId, uid) => new Promise((resolve, reject) => {
  axios.get(`${baseUrl}/bookmarks`)
    .then((response) => {
      const bookmarks = response.data;
      bookmarks.forEach((b) => {
        if (b.postId === postId && b.uid === uid) {
          axios.delete(`${baseUrl}/bookmarks/${b.id}`);
        }
      });
      resolve();
    })
    .catch((err) => reject(err));
});

export default { getBookmarks, addBookmark, removeBookmark };
