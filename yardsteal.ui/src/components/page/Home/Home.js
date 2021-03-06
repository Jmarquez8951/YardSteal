import React from 'react';
import bookmarkData from '../../../helpers/data/bookmarkData';
import postsData from '../../../helpers/data/postsData';

import DropdownComponent from '../../shared/Dropdown/Dropdown';
import PostCard from '../../shared/PostCard/PostCard';
import './Home.scss';

class Home extends React.Component {
  state = {
    posts: [],
  }

  getAllPosts = () => {
    postsData.getPosts()
      .then((response) => {
        this.setState({ posts: response });
      })
      .catch((err) => console.error('could not get posts', err));
  }

  getNewestPosts = () => {
    postsData.getLatestPosts()
      .then((response) => this.setState({ posts: response }))
      .catch((err) => console.error('could not get latest posts', err));
  }

  getOldestPosts = () => {
    postsData.getOldestPosts()
      .then((response) => this.setState({ posts: response }))
      .catch((err) => console.error('could not get oldest posts', err));
  }

  componentDidMount() {
    this.getAllPosts();
  }

  addBookmark = (newBookmark) => {
    bookmarkData.addBookmark(newBookmark)
      .then(() => {
        this.getAllPosts();
      })
      .catch((err) => console.error('could not add bookmark', err));
  }

  deleteBookmark = (postId, uid) => {
    bookmarkData.removeBookmark(postId, uid)
      .then(() => {
        this.getAllPosts();
      })
      .catch((err) => console.error('could not remove bookmark', err));
  }

  deletePostFromHome = (postId) => {
    postsData.deletePost(postId)
      .then(() => {
        this.getAllPosts();
      })
      .catch((err) => console.error('could not delete post', err));
  }

  updatePost = (postId) => {
    postsData.postUpdate(postId)
      .then(() => {
        this.getAllPosts();
      })
      .catch((err) => console.error('could not update post', err));
  }

  render() {
    const { posts } = this.state;

    const buildPostsCards = posts.map((post) => (
        <PostCard key={post.id} post={post} addBookmark={this.addBookmark} deleteBookmark={this.deleteBookmark} deletePost={this.deletePostFromHome} updatePost={this.updatePost}/>
    ));

    return (
      <div className="Home">
        <div className="d-flex justify-content-center flex-column">
          <div className="pl-3">
            <DropdownComponent getNewestPosts={this.getNewestPosts} getOldestPosts={this.getOldestPosts} />
          </div>
          <div className="mx-auto">
            {buildPostsCards}
          </div>
        </div>
      </div>
    );
  }
}

export default Home;
