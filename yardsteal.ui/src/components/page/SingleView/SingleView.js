import React from 'react';
import authData from '../../../helpers/data/authData';
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
    usersComment: '',
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

  commentChange = (e) => {
    e.preventDefault();
    this.setState({ usersComment: e.target.value });
  }

  createComment = (e) => {
    e.preventDefault();
    const post = this.props.match.params;
    const { usersComment } = this.state;
    const d = new Date();
    const commentToAdd = {
      uid: authData.getUid(),
      description: usersComment,
      datePosted: d.toISOString(),
      postId: parseInt(post.postId, 10),
    };
    messagesData.addnewComment(commentToAdd)
      .then(() => {
        messagesData.getMessagesByPostId(post.postId)
          .then((response) => {
            this.setState({ comments: response });
            this.setState({ usersComment: '' });
          });
      })
      .catch((err) => console.error('could not post comment', err));
  }

  render() {
    const { post, user, comments } = this.state;

    const buildMessageCards = comments.map((message) => (
      <MessageCard key={message.id} message={message} />
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
            <div className="comment-creater d-flex flex-column">
              <textarea className="new-comment col-6 mx-auto" rows="5" onChange={this.commentChange} value={this.state.usersComment}/>
              <button className="btn btn-secondary mx-auto mt-2" onClick={this.createComment}>Send</button>
            </div>
            <div className="d-flex justify-content-center flex-column">
              {buildMessageCards}
            </div>
        </div>
      </div>
    );
  }
}

export default SingleView;
