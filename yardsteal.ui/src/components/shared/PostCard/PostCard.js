import React from 'react';
import PropTypes from 'prop-types';
import { withRouter } from 'react-router-dom';
import utils from '../../../helpers/utils';
import './PostCard.scss';
import authData from '../../../helpers/data/authData';
import usersData from '../../../helpers/data/usersData';
import bookmarkData from '../../../helpers/data/bookmarkData';

class PostCard extends React.Component {
  state = {
    user: {},
    isUsers: false,
    isVisible: true,
  }

  static propTypes = {
    post: PropTypes.object.isRequired,
  }

  componentDidMount() {
    const Uid = authData.getUid();
    const postId = this.props.post.id;
    const { post } = this.props;
    if (Uid === post.uid) {
      this.setState({ isUsers: true });
    } else {
      this.setState({ isUsers: false });
    }
    usersData.getUserByUid(post.uid)
      .then((response) => {
        this.setState({ user: response });
        bookmarkData.getBookmarks()
          .then((resp) => {
            resp.forEach((bookmark) => {
              if (bookmark.postId === postId && bookmark.uid === Uid) {
                this.setState({ isVisible: false });
              }
            });
          });
      })
      .catch((err) => console.error('could not get user', err));
  }

  goToSingleView = (e) => {
    e.preventDefault();
    const postId = this.props.post.id;
    this.props.history.push(`/posts/${postId}`);
  }

  editPost = (e) => {
    e.preventDefault();
    const postId = this.props.post.id;
    this.props.history.push(`/edit-post/${postId}`);
  }

  removePost = (e) => {
    e.preventDefault();
    const postId = this.props.post.id;
    this.props.deletePost(postId);
  }

  addToBookmarks = (e) => {
    e.preventDefault();
    const postId = this.props.post.id;
    const Uid = authData.getUid();
    const newBookmark = {
      uid: Uid,
      postId,
    };
    this.props.addBookmark(newBookmark);
  }

  render() {
    const { user, isUsers, isVisible } = this.state;
    const { post } = this.props;

    return (
      <div className="PostCard m-2">
        <div className="card rounded">
          <div className="d-flex justify-content-end">
            {isVisible
              ? <button className="btn btn-warning bookmark-btn" onClick={this.addToBookmarks}>Bookmark</button>
              : ''}
            {isUsers
              ? <div className="d-flex justify-content-end">
                  <button className="btn btn-outline-warning ml-1 mr-1" onClick={this.editPost}><i className="fas fa-edit ml-1"></i></button>
                  <button className="btn btn-danger m-0" onClick={this.removePost}><i className="fas fa-trash-alt"></i></button>
                </div>
              : ''}
          </div>
          <div className="row g-0">
            <div className="col-md-3 pr-0 pl-4 pt-2 users-profile-pic d-flex justify-content-center flex-column">
              <h3 className="mx-auto">Posted By:</h3>
              <img className="profile-pic mx-auto" src={user.profilePic} alt=""/>
              <p className="mx-auto">{user.username}</p>
            </div>
            <div className="card-body col-md-9 pt-0 pl-4" onClick={this.goToSingleView}>
              <h5 className="card-title title"><b>{post.title}</b></h5>
              <h6 className="card-subtitle mb-2"><b>Posted:</b> {utils.dateFix(post.datePosted)}</h6>
              <p className="card-text">{post.description}</p>
            </div>
          </div>
        </div>
      </div>
    );
  }
}

export default withRouter(PostCard);
