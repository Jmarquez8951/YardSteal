import React from 'react';
import authData from '../../../helpers/data/authData';
import bookmarkData from '../../../helpers/data/bookmarkData';
import usersData from '../../../helpers/data/usersData';
import Bookmark from '../../shared/Bookmark/Bookmark';
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

  render() {
    const { bookmarks } = this.state;

    const makeBookmarks = bookmarks.map((bookmark) => (
      <Bookmark key={bookmark.id} post={bookmark} deleteBookmark={this.deleteBookmark} addBookmark={this.addBookmark}/>
    ));

    return (
      <div className="Bookmarks">
        <h1>Bookmarks page</h1>
        <div className="d-flex justify-content-center flex-column">
          {makeBookmarks}
        </div>
      </div>
    );
  }
}

export default Bookmarks;
