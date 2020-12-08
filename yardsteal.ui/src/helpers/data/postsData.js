import axios from 'axios';
import { baseUrl } from '../constants.json';

const getPosts = () => new Promise((resolve, reject) => {
  axios.get(`${baseUrl}/posts`)
    .then((response) => resolve(response.data))
    .catch((err) => reject(err));
});

export default { getPosts };
