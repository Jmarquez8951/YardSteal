import React from 'react';
import PropTypes from 'prop-types';
import { withRouter } from 'react-router-dom';
import utils from '../../../helpers/utils';
import './PostCard.scss';
import authData from '../../../helpers/data/authData';

class PostCard extends React.Component {
  state = {
    isUsers: false,
  }

  static propTypes = {
    post: PropTypes.object.isRequired,
  }

  componentDidMount() {
    const Uid = authData.getUid();
    const { post } = this.props;
    if (Uid === post.uid) {
      this.setState({ isUsers: true });
    } else {
      this.setState({ isUsers: false });
    }
  }

  goToSingleView = (e) => {
    e.preventDefault();
    const postId = this.props.post.id;
    this.props.history.push(`/posts/${postId}`);
  }

  render() {
    const { isUsers } = this.state;
    const { post } = this.props;

    return (
      <div className="PostCard m-2">
        <div className="card rounded">
          {isUsers
            ? <div className="d-flex justify-content-end">
                <button className="btn btn-danger m-0">X</button>
              </div>
            : ''}
          <div className="card-body pt-0" onClick={this.goToSingleView}>
            <h5 className="card-title title"><b>{post.title}</b></h5>
            <h6 className="card-subtitle mb-2"><b>Posted:</b> {utils.dateFix(post.datePosted)}</h6>
            <p className="card-text">{post.description}</p>
          </div>
        </div>
      </div>
    );
  }
}

export default withRouter(PostCard);
