import React from 'react';
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

  deletePost = (postId) => {
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

    const buildPostsCards = () => posts.map((post) => (
        <PostCard key={post.id} post={post} deletePost={this.deletePost} updatePost={this.updatePost}/>
    ));

    return (
      <div className="Home">
        <div className="d-flex justify-content-center flex-column">
          <h1>Home Page</h1>
          <DropdownComponent getNewestPosts={this.getNewestPosts} getOldestPosts={this.getOldestPosts} />
          <div className="mx-auto">
            {buildPostsCards()}
          </div>
        </div>
      </div>
    );
  }
}

export default Home;
