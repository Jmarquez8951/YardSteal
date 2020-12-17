import React from 'react';
import messagesData from '../../../helpers/data/messagesData';
import postsData from '../../../helpers/data/postsData';
import usersData from '../../../helpers/data/usersData';
import utils from '../../../helpers/utils';
import MessageCard from '../../shared/MessageCard/MessageCard';
import './SingleView.scss';

class SingleView extends React.Component {
  state = {
    post: {},
    user: {},
    comments: [],
  }

  getInfo = () => {
    const post = this.props.match.params;
    postsData.getSinglePost(post.postId)
      .then((response) => {
        this.setState({ post: response });
        usersData.getUserByUid(response.uid)
          .then((resp) => {
            this.setState({ user: resp });
          });
        messagesData.getMessagesByPostId(post.postId)
          .then((resp) => {
            this.setState({ comments: resp });
          });
      })
      .catch((err) => console.error('could not get post', err));
  }

  componentDidMount() {
    this.getInfo();
  }

  render() {
    const { post, user, comments } = this.state;

    const buildMessageCards = comments.map((message) => (
      <MessageCard message={message} />
    ));

    return (
      <div className="SingleView">
        <h1>{post.title}</h1>
        <p>{utils.dateFix(post.datePosted)}</p>
        <p>{user.username}</p>
        <p>{post.description}</p>
        <p>{post.streetAddress}</p>
        <p>{post.streetAddress2}</p>
        <p>{post.city}</p>
        <p>{post.state}</p>
        <p>{post.zipcode}</p>
        <div className="comment-background">
          <h2>Comments:</h2>
            <div className="d-flex justify-content-center flex-column">
              {buildMessageCards}
            </div>
        </div>
      </div>
    );
  }
}

export default SingleView;
