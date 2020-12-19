import React from 'react';
import authData from '../../../helpers/data/authData';
import usersData from '../../../helpers/data/usersData';
import PostCard from '../../shared/PostCard/PostCard';
import './Bookmarks.scss';

class Bookmarks extends React.Component {
  state = {
    bookmarks: [],
  }

  getInfo = () => {
    usersData.getUsersBookmarks(authData.getUid())
      .then((response) => {
        this.setState({ bookmarks: response });
      })
      .catch((err) => console.error('could not get bookmarks', err));
  }

  componentDidMount() {
    this.getInfo();
  }

  render() {
    const { bookmarks } = this.state;

    const makePostCards = bookmarks.map((bookmark) => (
      <PostCard key={bookmark.id} post={bookmark} />
    ));

    return (
      <div className="Bookmarks">
        <h1>Bookmarks page</h1>
        {makePostCards}
      </div>
    );
  }
}

export default Bookmarks;
