import React from 'react';
import postsData from '../../../helpers/data/postsData';
import './Home.scss';

class Home extends React.Component {
  state = {
    posts: [],
  }

  componentDidMount() {
    postsData.getPosts()
      .then((response) => {
        this.setState({ posts: response });
      })
      .catch((err) => console.error('could not get posts', err));
  }

  render() {
    const { posts } = this.state;

    const buildPostsCards = () => posts.map((post) => (
        <h2>{post.city}</h2>
    ));

    return (
      <div className="Home">
        <h1>Home Page</h1>
        {buildPostsCards()}
      </div>
    );
  }
}

export default Home;
