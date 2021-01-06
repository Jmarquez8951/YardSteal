import React from 'react';
import authData from '../../../helpers/data/authData';
import usersData from '../../../helpers/data/usersData';
import bookmarkData from '../../../helpers/data/bookmarkData';
import postsData from '../../../helpers/data/postsData';
import PostCard from '../../shared/PostCard/PostCard';
import './UsersPosts.scss';

class UsersPosts extends React.Component {
  state = {
    posts: [],
  }

  getInfo = () => {
    usersData.getUsersPosts(authData.getUid())
      .then((response) => {
        this.setState({ posts: response });
      })
      .catch((err) => console.error('could not get posts', err));
  }

  componentDidMount() {
    this.getInfo();
  }

  addBookmark = (newBookmark) => {
    bookmarkData.addBookmark(newBookmark)
      .then(() => {
        this.getInfo();
      })
      .catch((err) => console.error('could not add bookmark', err));
  }

  deleteBookmark = (postId, uid) => {
    bookmarkData.removeBookmark(postId, uid)
      .then(() => {
        this.getInfo();
      })
      .catch((err) => console.error('could not remove bookmark', err));
  }

  updatePost = (postId) => {
    postsData.postUpdate(postId)
      .then(() => {
        this.getAllPosts();
      })
      .catch((err) => console.error('could not update post', err));
  }

  deletePost = (postId) => {
    postsData.deletePost(postId)
      .then(() => {
        this.getInfo();
      })
      .catch((err) => console.error('could not delete post', err));
  }

  render() {
    const { posts } = this.state;

    const buildPostCards = posts.map((post) => (
      <PostCard key={post.id} post={post} addBookmark={this.addBookmark} deleteBookmark={this.deleteBookmark} deletePost={this.deletePost} updatePost={this.updatePost} />
    ));
    return (
      <div className="UsersPosts">
        <h1>Users posts page</h1>
        {buildPostCards}
      </div>
    );
  }
}

export default UsersPosts;
