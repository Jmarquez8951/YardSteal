import React from 'react';
import './CreatePost.scss';
import postsData from '../../../helpers/data/postsData';
import authData from '../../../helpers/data/authData';
import imageUploader from '../../../helpers/data/imageUploader';

class CreatePost extends React.Component {
  state = {
    images: [],
    userTitle: '',
    userDescription: '',
    userStreet: '',
    userStreet2: '',
    userCity: '',
    userState: '',
    userZipcode: '',
    userDatePosted: '',
  }

  imageChange = (e) => {
    e.preventDefault();
    const allFiles = Array.from(e.target.files);
    this.setState({ images: allFiles });
  }

  titleChange = (e) => {
    e.preventDefault();
    this.setState({ userTitle: e.target.value });
  }

  descriptionChange = (e) => {
    e.preventDefault();
    this.setState({ userDescription: e.target.value });
  }

  streetChange = (e) => {
    e.preventDefault();
    this.setState({ userStreet: e.target.value });
  }

  streetChange2 = (e) => {
    e.preventDefault();
    this.setState({ userStreet2: e.target.value });
  }

  cityChange = (e) => {
    e.preventDefault();
    this.setState({ userCity: e.target.value });
  }

  stateChange = (e) => {
    e.preventDefault();
    this.setState({ userState: e.target.value });
  }

  zipcodeChange = (e) => {
    e.preventDefault();
    this.setState({ userZipcode: e.target.value });
  }

  submit = (e) => {
    e.preventDefault();
    const uid = authData.getUid();
    const newPost = {
      uid,
      title: this.state.userTitle,
      description: this.state.userDescription,
      streetAddress: this.state.userStreet,
      streetAddress2: this.state.userStreet2,
      city: this.state.userCity,
      state: this.state.userState,
      zipcode: this.state.userZipcode,
      datePosted: this.state.userDatePosted,
    };
    postsData.addPost(newPost)
      .then((response) => {
        this.state.images.forEach((image) => {
          imageUploader.uploadImageToFirebase(response.data.id, image);
        });
        this.props.history.push('/home');
      })
      .catch((err) => console.error('could not add post', err));
  }

  componentDidMount() {
    const d = new Date();
    this.setState({ userDatePosted: d.toISOString() });
  }

  render() {
    return (
      <div className="CreatePost">
        <div className="mb-3">
          <label htmlFor="users-title" className="form-label">Title</label>
          <input type="text" className="form-control" id="users-title" onChange={this.titleChange}/>
        </div>
        <div className="mb-3">
          <progress value="0" max="100" id="uploader">0%</progress>
          <label htmlFor="users-images" className="form-label">Choose Images</label>
          <input type="file" className="" id="users-images" onChange={this.imageChange} multiple/>
        </div>
        <div className="mb-3">
          <label htmlFor="users-description" className="form-label">Description</label>
          <input type="text" className="form-control" id="users-description" onChange={this.descriptionChange}/>
        </div>
        <div className="mb-3">
          <label htmlFor="users-street" className="form-label">Street Address</label>
          <input type="text" className="form-control" id="users-street" onChange={this.streetChange}/>
        </div>
        <div className="mb-3">
          <label htmlFor="users-street2" className="form-label">Street Address 2</label>
          <input type="text" className="form-control" id="users-street2" onChange={this.streetChange2}/>
        </div>
        <div className="mb-3">
          <label htmlFor="users-city" className="form-label">City</label>
          <input type="text" className="form-control" id="users-city" onChange={this.cityChange}/>
        </div>
        <div className="mb-3">
          <label htmlFor="users-state" className="form-label">State</label>
          <input type="text" className="form-control" id="users-state" onChange={this.stateChange}/>
        </div>
        <div className="mb-3">
          <label htmlFor="users-zipcode" className="form-label">Zipcode</label>
          <input type="text" className="form-control" id="users-zipcode" onChange={this.zipcodeChange}/>
        </div>
        <button className="btn btn-dark" onClick={this.submit}>Submit</button>
      </div>
    );
  }
}

export default CreatePost;
