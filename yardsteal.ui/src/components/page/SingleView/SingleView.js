import React from 'react';
import { UncontrolledCarousel } from 'reactstrap';
import authData from '../../../helpers/data/authData';
import imageUploader from '../../../helpers/data/imageUploader';
import messagesData from '../../../helpers/data/messagesData';
import postsData from '../../../helpers/data/postsData';
import usersData from '../../../helpers/data/usersData';
import utils from '../../../helpers/utils';
import MessageCard from '../../shared/MessageCard/MessageCard';
import './SingleView.scss';

class SingleView extends React.Component {
  state = {
    currentCount: 2,
    post: {},
    user: {},
    images: [],
    comments: [],
    usersComment: '',
  }

  getInfo = () => {
    const post = this.props.match.params;
    postsData.getSinglePost(post.postId)
      .then((response) => {
        this.setState({ post: response });
        imageUploader.getImage(post.postId)
          .then((request) => {
            this.setState({ images: request });
          });
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
    const intervalId = setInterval(this.timer, 1000);
    this.setState({ intervalId });
  }

  componentWillUnmount() {
    clearInterval(this.state.intervalId);
  }

 timer = () => {
   if (this.state.currentCount === 0) {
     document.getElementById('loader').classList.add('notVisible');
     document.getElementById('main-body').classList.remove('notVisible');
     return this.setState({ currentCount: 0 });
   }
   return this.setState({ currentCount: this.state.currentCount - 1 });
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
    const {
      post, user, comments, images,
    } = this.state;

    const buildMessageCards = comments.map((message) => (
      <MessageCard key={message.id} message={message} />
    ));

    return (
      <div className="SingleView">
        <div className="d-flex justify-content-center">
          <div id="loader" className="loader"></div>
        </div>
        <div id="main-body" className="d-flex justify-content-center flex-column notVisible">
          <h1 className="mx-auto">{post.title}</h1>
          {images[0]
            ? <div>
              <UncontrolledCarousel items={images} />
            </div>
            : ''
          }
          <div className="body-info d-flex justify-content-center flex-column">
            <p className="mx-auto mt-2">Posted on: {utils.dateFix(post.datePosted)}</p>
            <div className="col-md-5 pt-2 users-profile-pic mx-auto d-flex justify-content-center flex-column">
              <h3 className="mx-auto">Posted By:</h3>
              <img className="profile-pic mx-auto" src={user.profilePic} alt=""/>
              <p className="mx-auto">{user.username}</p>
            </div>
            <h4 className="mx-auto border-bottom border-dark mt-2">Description</h4>
            <p className="mx-auto">{post.description}</p>
            <p className="mx-auto">Street Address: {post.streetAddress}</p>
            {post.streetAddress2
              ? <p className="mx-auto">Street Address 2: {post.streetAddress2}</p>
              : ''
            }
            <p className="mx-auto">City: {post.city}</p>
            <p className="mx-auto">State: {post.state}</p>
            <p className="mx-auto">Zipcode: {post.zipcode}</p>
          </div>
          <div className="comment-background">
            <h2 className="pl-3 pt-2">Comments:</h2>
              <div className="comment-creater d-flex flex-column">
                <textarea className="new-comment col-6 mx-auto" rows="5" onChange={this.commentChange} value={this.state.usersComment}/>
                <button className="btn btn-secondary mx-auto mt-2 mb-2" onClick={this.createComment}>Send</button>
              </div>
              <div className="d-flex justify-content-center flex-column">
                {buildMessageCards}
              </div>
          </div>
        </div>
      </div>
    );
  }
}

export default SingleView;
