import React from 'react';
import PropTypes from 'prop-types';
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

    const dateFix = (datePosted) => new Date(datePosted).toLocaleDateString();

    return (
      <div className="PostCard m-2">
        <div className="card rounded m-3" onClick={this.goToSingleView}>
          <div className="card-body">
            <h5 className="card-title title"><b>City:</b> {post.city}</h5>
            <h6 className="card-subtitle mb-2"><b>Posted:</b> {dateFix(post.datePosted)}</h6>
            <p className="card-text"><b>Street Address:</b> {post.streetAddress}</p>
            {post.streetAddress2
              ? <p className="card-text"><b>Street Address 2:</b> {post.streetAddress2}</p>
              : ''}
            <p className="card-text"><b>State:</b> {post.state}</p>
            <p className="card-text"><b>Zipcode:</b> {post.zipcode}</p>
            <p className="card-text"><b>Description:</b></p>
            <p className="card-text">{post.description}</p>
          </div>
        </div>
      </div>
    );
  }
}

export default PostCard;
