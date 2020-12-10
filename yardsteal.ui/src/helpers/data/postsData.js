import axios from 'axios';
import { baseUrl } from '../constants.json';

const getPosts = () => new Promise((resolve, reject) => {
  axios.get(`${baseUrl}/posts`)
    .then((response) => resolve(response.data))
    .catch((err) => reject(err));
});

const getLatestPosts = () => new Promise((resolve, reject) => {
  axios.get(`${baseUrl}/posts/newest`)
    .then((response) => resolve(response.data))
    .catch((err) => reject(err));
});

const getOldestPosts = () => new Promise((resolve, reject) => {
  axios.get(`${baseUrl}/posts/oldest`)
    .then((response) => resolve(response.data))
    .catch((err) => reject(err));
});

export default { getPosts, getLatestPosts, getOldestPosts };
