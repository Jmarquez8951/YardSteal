import firebase from 'firebase/app';
import authData from './authData';

const uploadImageToFirebase = (postId, file) => new Promise(() => {
  const uploader = document.getElementById('uploader');
  const storage = firebase.storage().ref(`${authData.getUid()}/post${postId}/${file.name}`);
  const task = storage.put(file);
  task.on('state_changed',
    (snapshot) => {
      const percentage = (snapshot.bytesTransferred
      / snapshot.totalBytes) * 100;
      uploader.value = percentage;
    });
});

const getImage = (postId) => new Promise((resolve, reject) => {
  const storageRef = firebase.storage().ref();
  const listRef = storageRef.child(`${authData.getUid()}/${postId}`);
  listRef.listAll()
    .then((res) => {
      const urls = [];
      res.items.forEach((itemRef) => {
        itemRef.getDownloadURL().then((url) => {
          urls.push(url);
        });
      });
      resolve(urls);
    })
    .catch((err) => reject(err));
});

export default { uploadImageToFirebase, getImage };
