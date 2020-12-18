import axios from 'axios';
import { baseUrl } from '../apiKeys.json';

const getMessagesByPostId = (postId) => new Promise((resolve, reject) => {
  axios.get(`${baseUrl}/posts/${postId}/comments`)
    .then((response) => resolve(response.data))
    .catch((err) => reject(err));
});

const addnewComment = (commentToAdd) => axios.post(`${baseUrl}/messages`, commentToAdd);

export default { getMessagesByPostId, addnewComment };
