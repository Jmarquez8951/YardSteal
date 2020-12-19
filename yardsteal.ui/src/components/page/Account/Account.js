import React from 'react';
import authData from '../../../helpers/data/authData';
import usersData from '../../../helpers/data/usersData';
import './Account.scss';

class Account extends React.Component {
  state = {
    user: {},
    isEditing: false,
  }

  getInfo = () => {
    usersData.getUserByUid(authData.getUid())
      .then((response) => {
        this.setState({ user: response });
      })
      .catch((err) => console.error('could not get user', err));
  }

  componentDidMount() {
    this.getInfo();
  }

  editChange = (e) => {
    e.preventDefault();
    this.setState({ isEditing: true });
  }

  goBack = (e) => {
    e.preventDefault();
    this.setState({ isEditing: false });
    this.getInfo();
  }

  submitChanges = (e) => {
    e.preventDefault();
    const { user } = this.state;
    usersData.updateUser(user.id, user)
      .then(() => {
        this.setState({ isEditing: false });
        this.getInfo();
      })
      .catch((err) => console.error('could not update user', err));
  }

  usernameChange = (e) => {
    e.preventDefault();
    const temp = { ...this.state.user };
    temp.username = e.target.value;
    this.setState({ user: temp });
  }

  phoneNumberChange = (e) => {
    e.preventDefault();
    const temp = { ...this.state.user };
    temp.phoneNumber = e.target.value;
    this.setState({ user: temp });
  }

  profilePicChange = (e) => {
    e.preventDefault();
    const temp = { ...this.state.user };
    temp.profilePic = e.target.value;
    this.setState({ user: temp });
  }

  render() {
    const { user, isEditing } = this.state;

    return (
      <div className="Account">
        <h1>Account page</h1>
        {isEditing
          ? <div className="d-flex flex-auto flex-column justify-content-start">
              <div>
                <button className="btn btn-dark" onClick={this.goBack}>Back</button>
              </div>
              <input type="text" className="col-6 m-2" onChange={this.usernameChange} value={user.username}/>
              <input type="text" className="col-6 m-2" onChange={this.phoneNumberChange} value={user.phoneNumber}/>
              <input type="text" className="col-6 m-2" onChange={this.profilePicChange} value={user.profilePic}/>
              <button className="btn btn-dark" onClick={this.submitChanges}>Submit</button>
            </div>
          : <div className="d-flex flex-auto flex-column justify-content-start">
              <div>
                <button className="btn btn-dark" onClick={this.editChange}>Edit</button>
              </div>
              <p>{user.username}</p>
              <p>{user.phoneNumber}</p>
              <img className="mx-auto" src={user.profilePic} alt=''/>
            </div>
        }
      </div>
    );
  }
}

export default Account;
