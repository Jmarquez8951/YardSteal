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
    user.phoneNumber = user.phoneNumber.slice(0, 10);
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
      <div className="Account m-1 p-1">
        <h1>Account page</h1>
        {isEditing
          ? <div className="d-flex flex-auto flex-column justify-content-start">
              <div>
                <button className="btn btn-dark" onClick={this.goBack}>Back</button>
              </div>
              <div>
                <p>Username:</p>
                <input type="text" className="col-6 m-2" onChange={this.usernameChange} value={user.username}/>
              </div>
              <div>
                <p>Phone Number:</p>
                <input type="text" className="col-6 m-2" onChange={this.phoneNumberChange} value={user.phoneNumber}/>
              </div>
              <div>
                <p>Profile Picture:</p>
                <input type="text" className="col-6 m-2" onChange={this.profilePicChange} value={user.profilePic}/>
              </div>
              <button className="btn btn-dark col-6 mx-auto" onClick={this.submitChanges}>Submit</button>
            </div>
          : <div className="d-flex flex-auto flex-column justify-content-start">
              <div className="info d-flex flex-column m-2">
                <div className="mt-4 ml-4">
                  <button className="btn btn-dark" onClick={this.editChange}><i className="far fa-edit"></i> Edit</button>
                </div>
                <h3 className="mx-auto"><u><b>Username</b></u>: {user.username}</h3>
                <h3 className="mx-auto"><u><b>Phone Number</b></u>: {user.phoneNumber}</h3>
                <img className="profile-pic mx-auto mb-2" src={user.profilePic} alt=''/>
              </div>
            </div>
        }
      </div>
    );
  }
}

export default Account;
