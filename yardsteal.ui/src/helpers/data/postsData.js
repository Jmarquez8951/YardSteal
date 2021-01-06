import axios from 'axios';
import { baseUrl } from '../apiKeys.json';
import imageUploader from './imageUploader';

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

const deletePost = (postId) => new Promise((resolve, reject) => {
  axios.delete(`${baseUrl}/posts/${postId}`)
    .then(() => {
      imageUploader.deleteImageFolder(postId);
      resolve();
    })
    .catch((err) => reject(err));
});

export default {
  getPosts,
  getSinglePost,
  getLatestPosts,
  getOldestPosts,
  addPost,
  postUpdate,
  deletePost,
};
