import React from 'react';
import './MessageCard.scss';

import PropTypes from 'prop-types';
import utils from '../../../helpers/utils';
import usersData from '../../../helpers/data/usersData';

class MessageCard extends React.Component {
  state = {
    user: {},
  }

  static propTypes = {
    message: PropTypes.func.isRequired,
  }

  getInfo = () => {
    const { message } = this.props;
    usersData.getUserByUid(message.uid)
      .then((response) => {
        this.setState({ user: response });
      })
      .catch((err) => console.error('could not get users', err));
  }

  componentDidMount() {
    this.getInfo();
  }

  render() {
    const { user } = this.state;
    const { message } = this.props;

    return (
      <div className="MessageCard col-8 mx-auto m-4">
        <div className="card rounded border-0">
          <div class="row g-0">
            <div class="col-md-3 pr-0 pl-4 pt-2 users-profile-pic d-flex justify-content-center flex-column">
              <h3 className="mx-auto">Posted By:</h3>
              <img className="profile-pic mx-auto" src={user.profilePic} alt=""/>
              <p className="mx-auto">{user.username}</p>
            </div>
            <div className="card-body col-md-8 ml-5 pl-4 pr-0 my-border">
              <p className="card-text">{message.description}</p>
              <h6 className="card-subtitle mb-2"><b>Posted:</b> {utils.dateFix(message.datePosted)}</h6>
            </div>
          </div>
        </div>
      </div>
    );
  }
}

export default MessageCard;
