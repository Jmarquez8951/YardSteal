import firebase from 'firebase/app';
import authData from './authData';

const uploadImageToFirebase = (postId, file) => new Promise(() => {
  const storage = firebase.storage().ref(`${authData.getUid()}/post${postId}/${file.name}`);
  const task = storage.put(file);
  task.on('state_changed',
    (snapshot) => {
      const percentage = (snapshot.bytesTransferred
      / snapshot.totalBytes) * 100;
      console.log(percentage);
    });
});

const getImage = (postId) => new Promise((resolve, reject) => {
  const storageRef = firebase.storage().ref();
  const listRef = storageRef.child(`${authData.getUid()}/post${postId}`);
  listRef.listAll()
    .then((res) => {
      const urls = [];
      res.items.forEach((itemRef) => {
        itemRef.getDownloadURL().then((url) => {
          const newUrl = {
            src: url,
          };
          urls.push(newUrl);
        });
      });
      Array.from(urls);
      resolve(urls);
    })
    .catch((err) => reject(err));
});

const deleteImageFolder = (postId) => new Promise(() => {
  const storageRef = firebase.storage().ref();
  const listRef = storageRef.child(`${authData.getUid()}/post${postId}`);
  listRef.listAll()
    .then((result) => {
      result.items.forEach((img) => {
        const imageRef = storageRef.child(img.fullPath);
        imageRef.delete().then(() => {
          console.log('image deleted');
        });
      });
    })
    .catch((err) => console.error('could not delete images', err));
});

export default { uploadImageToFirebase, getImage, deleteImageFolder };
