import React from 'react';
import './Bookmark.scss';

import PropTypes from 'prop-types';
import { withRouter } from 'react-router-dom';
import authData from '../../../helpers/data/authData';
import usersData from '../../../helpers/data/usersData';
import bookmarkData from '../../../helpers/data/bookmarkData';
import utils from '../../../helpers/utils';

class Bookmark extends React.Component {
  state = {
    user: {},
    isVisible: false,
  }

  static propTypes = {
    post: PropTypes.object.isRequired,
  }

  getInfo = () => {
    const Uid = authData.getUid();
    const postId = this.props.post.id;
    const { post } = this.props;
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

  componentDidMount() {
    this.getInfo();
  }

  addToBookmarks = (e) => {
    e.preventDefault();
    const postId = this.props.post.id;
    const Uid = authData.getUid();
    const newBookmark = {
      uid: Uid,
      postId,
    };
    this.setState({ isVisible: false });
    this.props.addBookmark(newBookmark);
  }

  removeBookmark = (e) => {
    e.preventDefault();
    const postId = this.props.post.id;
    this.setState({ isVisible: true });
    this.props.deleteBookmark(postId, authData.getUid());
    this.props.history.push('/home');
  }

  goToSingleView = (e) => {
    e.preventDefault();
    const postId = this.props.post.id;
    this.props.history.push(`/posts/${postId}`);
  }

  render() {
    const { isVisible, user } = this.state;
    const { post } = this.props;

    return (
      <div className="Bookmark m-3 d-flex justify-content-center">
        <div className="card rounded col-10">
          <div className="d-flex justify-content-end">
            {isVisible
              ? <button className="btn btn-warning bookmark-btn" onClick={this.addToBookmarks}>Bookmark</button>
              : <button className="btn btn-danger bookmark-btn" onClick={this.removeBookmark}>Remove Bookmark</button>}
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

export default withRouter(Bookmark);
