import axios from 'axios';
import { baseUrl } from '../constants.json';

const getUserByUid = (uid) => new Promise((resolve, reject) => {
  axios.get(`${baseUrl}/users/${uid}`)
    .then((response) => {
      const theUser = response.data;
      const user = {
        id: theUser.id,
        usersUid: theUser.usersUid,
        username: theUser.username,
        profilePic: theUser.profilePic,
        dateJoined: theUser.dateJoined,
      };
      resolve(user);
    })
    .catch((err) => reject(err));
});

export default { getUserByUid };
