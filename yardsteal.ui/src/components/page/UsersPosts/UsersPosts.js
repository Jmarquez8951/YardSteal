import React from 'react';
import authData from '../../../helpers/data/authData';
import usersData from '../../../helpers/data/usersData';
import PostCard from '../../shared/PostCard/PostCard';
import './UsersPosts.scss';

class UsersPosts extends React.Component {
  state = {
    posts: [],
  }

  componentDidMount() {
    usersData.getUsersPosts(authData.getUid())
      .then((response) => {
        this.setState({ posts: response });
      })
      .catch((err) => console.error('could not get posts', err));
  }

  render() {
    const { posts } = this.state;

    const buildPostCards = posts.map((post) => (
      <PostCard key={post.id} post={post} />
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
