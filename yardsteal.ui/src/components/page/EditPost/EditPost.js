import React from 'react';
import './EditPost.scss';

import postsData from '../../../helpers/data/postsData';

class EditPost extends React.Component {
  state = {
    post: {},
  }

  getInfo = () => {
    const post = this.props.match.params;
    postsData.getSinglePost(post.postId)
      .then((response) => {
        this.setState({ post: response });
      })
      .catch((err) => console.error('could not get post', err));
  }

  componentDidMount() {
    this.getInfo();
  }

  titleChange = (e) => {
    e.preventDefault();
    const temp = { ...this.state.post };
    temp.title = e.target.value;
    this.setState({ post: temp });
  }

  descriptionChange = (e) => {
    e.preventDefault();
    const temp = { ...this.state.post };
    temp.description = e.target.value;
    this.setState({ post: temp });
  }

  streetChange = (e) => {
    e.preventDefault();
    const temp = { ...this.state.post };
    temp.streetAddress = e.target.value;
    this.setState({ post: temp });
  }

  streetChange2 = (e) => {
    e.preventDefault();
    const temp = { ...this.state.post };
    temp.streetAddress2 = e.target.value;
    this.setState({ post: temp });
  }

  cityChange = (e) => {
    e.preventDefault();
    const temp = { ...this.state.post };
    temp.city = e.target.value;
    this.setState({ post: temp });
  }

  stateChange = (e) => {
    e.preventDefault();
    const temp = { ...this.state.post };
    temp.state = e.target.value;
    this.setState({ post: temp });
  }

  zipcodeChange = (e) => {
    e.preventDefault();
    const temp = { ...this.state.post };
    temp.zipcode = e.target.value;
    this.setState({ post: temp });
  }

  editPost = (e) => {
    e.preventDefault();
    const post = this.props.match.params;
    postsData.postUpdate(post.postId, this.state.post)
      .then(() => {
        this.props.history.push('/home');
      })
      .catch((err) => console.error('could not update post', err));
  }

  render() {
    const { post } = this.state;

    return (
      <div className="EditPost">
        <div className="mb-3">
          <label htmlFor="users-title" className="form-label">Title</label>
          <input type="text" className="form-control" id="users-title" onChange={this.titleChange} value={post.title}/>
        </div>
        <div className="mb-3">
          <label htmlFor="users-description" className="form-label">Description</label>
          <input type="text" className="form-control" id="users-description" onChange={this.descriptionChange} value={post.description}/>
        </div>
        <div className="mb-3">
          <label htmlFor="users-street" className="form-label">Street Address</label>
          <input type="text" className="form-control" id="users-street" onChange={this.streetChange} value={post.streetAddress}/>
        </div>
        <div className="mb-3">
          <label htmlFor="users-street2" className="form-label">Street Address 2</label>
          <input type="text" className="form-control" id="users-street2" onChange={this.streetChange2} value={post.streetAddress2}/>
        </div>
        <div className="mb-3">
          <label htmlFor="users-city" className="form-label">City</label>
          <input type="text" className="form-control" id="users-city" onChange={this.cityChange} value={post.city}/>
        </div>
        <div className="mb-3">
          <label htmlFor="users-state" className="form-label">State</label>
          <input type="text" className="form-control" id="users-state" onChange={this.stateChange} value={post.state}/>
        </div>
        <div className="mb-3">
          <label htmlFor="users-zipcode" className="form-label">Zipcode</label>
          <input type="text" className="form-control" id="users-zipcode" onChange={this.zipcodeChange} value={post.zipcode}/>
        </div>
        <button className="btn btn-dark" onClick={this.editPost}>Submit</button>
      </div>
    );
  }
}

export default EditPost;
