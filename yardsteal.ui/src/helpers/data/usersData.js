import axios from 'axios';
import { baseUrl } from '../apiKeys.json';

const getUserByUid = (uid) => new Promise((resolve, reject) => {
  axios.get(`${baseUrl}/users/${uid}`)
    .then((response) => {
      const theUser = response.data;
      const user = {
        id: theUser.id,
        usersUid: theUser.usersUid,
        username: theUser.username,
        phoneNumber: theUser.phoneNumber,
        profilePic: theUser.profilePic,
        dateJoined: theUser.dateJoined,
      };
      resolve(user);
    })
    .catch((err) => reject(err));
});

const getUsersPosts = (uid) => new Promise((resolve, reject) => {
  axios.get(`${baseUrl}/users/${uid}/posts`)
    .then((response) => resolve(response.data))
    .catch((err) => reject(err));
});

const updateUser = (userId, updatedUser) => axios.put(`${baseUrl}/users/${userId}`, updatedUser);

export default { getUserByUid, getUsersPosts, updateUser };
