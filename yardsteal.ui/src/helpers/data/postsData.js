import axios from 'axios';
import bookmarkData from './bookmarkData';
import { baseUrl } from '../apiKeys.json';

const getPosts = () => new Promise((resolve, reject) => {
  axios.get(`${baseUrl}/posts`)
    .then((response) => resolve(response.data))
    .catch((err) => reject(err));
});

const getSinglePost = (postId) => new Promise((resolve, reject) => {
  axios.get(`${baseUrl}/posts/${postId}`)
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

const addPost = (newPost) => axios.post(`${baseUrl}/posts`, newPost);

const postUpdate = (postId, updatedPost) => axios.put(`${baseUrl}/posts/${postId}`, updatedPost);

const deletePost = (postId) => axios.delete(`${baseUrl}/posts/${postId}`);

export default {
  getPosts,
  getSinglePost,
  getLatestPosts,
  getOldestPosts,
  addPost,
  postUpdate,
  deletePost,
};
