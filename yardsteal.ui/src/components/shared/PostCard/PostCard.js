import React from 'react';
import PropTypes from 'prop-types';
import utils from '../../../helpers/utils';
import './PostCard.scss';

class PostCard extends React.Component {
  static propTypes = {
    post: PropTypes.object.isRequired,
  }

  goToSingleView = (e) => {
    e.preventDefault();
    const postId = this.props.post.id;
    e.view.location.pathname = `/posts/${postId}`;
  }

  render() {
    const { post } = this.props;

    return (
      <div className="PostCard m-2">
        <div className="card rounded m-3" onClick={this.goToSingleView}>
          <div className="card-body">
            <h5 className="card-title title"><b>{post.title}</b></h5>
            <h6 className="card-subtitle mb-2"><b>Posted:</b> {utils.dateFix(post.datePosted)}</h6>
            <p className="card-text">{post.description}</p>
          </div>
        </div>
      </div>
    );
  }
}

export default PostCard;
