import firebase from 'firebase';
import axios from 'axios';
import { baseUrl } from '../constants.json';

// interceptors work by changing the outbound request before the xhr is sent
// or by changing the response before it's returned to our .then() method.
axios.interceptors.request.use((request) => {
  const token = sessionStorage.getItem('token');

  if (token != null) {
    request.headers.Authorization = `Bearer ${token}`;
  }

  return request;
}, (err) => Promise.reject(err));

const registerUser = (user) => firebase.auth().createUserWithEmailAndPassword(user.email.trim(), user.password).then((cred) => {
  // get email from firebase
  const userInfo = {
    email: cred.user.email,
    password: user.password,
    phoneNumber: user.phoneNumber,
    profilePic: user.profilePic,
    username: user.username,
    usersUid: cred.user.uid,
    dateJoined: user.dateJoined,
  };

  // get token from firebase
  cred.user.getIdToken()
  // save the token to the session storage
    .then((token) => sessionStorage.setItem('token', token))
  // save the user to the the api
    .then(() => axios.post(`${baseUrl}/users`, userInfo));
});
const loginUser = (user) => firebase.auth().signInWithEmailAndPassword(user.email, user.password).then((cred) => {
  // get token from firebase
  cred.user.getIdToken()
    // save the token to the session storage
    .then((token) => sessionStorage.setItem('token', token));
});
const logoutUser = () => firebase.auth().signOut();

const getUid = () => firebase.auth().currentUser.uid;

export default {
  getUid, loginUser, logoutUser, registerUser,
};
