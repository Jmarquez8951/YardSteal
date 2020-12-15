import React from 'react';
import authData from '../../../helpers/data/authData';
import './CreateAccount.scss';

class CreateAccount extends React.Component {
  state = {
    user: {
      email: '',
      password: '',
      phoneNumber: '',
      profilePic: 'https://st4.depositphotos.com/1156795/20814/v/600/depositphotos_208142514-stock-illustration-profile-placeholder-image-gray-silhouette.jpg',
      username: '',
      dateJoined: '',
    },
  }

  componentDidMount() {
    const temp = { ...this.state.user };
    const d = new Date();
    temp.dateJoined = d.toISOString();
    this.setState({ user: temp });
  }

  emailChange = (e) => {
    e.preventDefault();
    const temp = { ...this.state.user };
    temp.email = e.target.value;
    this.setState({ user: temp });
  }

  passwordChange = (e) => {
    e.preventDefault();
    const temp = { ...this.state.user };
    temp.password = e.target.value;
    this.setState({ user: temp });
  }

  phoneNumberChange = (e) => {
    e.preventDefault();
    const temp = { ...this.state.user };
    temp.phoneNumber = e.target.value;
    this.setState({ user: temp });
  }

  usernameChange = (e) => {
    e.preventDefault();
    const temp = { ...this.state.user };
    temp.username = e.target.value;
    this.setState({ user: temp });
  }

  submit = (e) => {
    e.preventDefault();
    const { user } = this.state;
    authData.registerUser(user)
      .then(() => {
        this.props.history.push('/home');
      })
      .catch((err) => console.error('could not register user', err));
  }

  render() {
    return (
      <div className="CreateAccount">
        <div className="mb-3">
          <label htmlFor="users-email" className="form-label">Email address</label>
          <input type="email" className="form-control" id="users-email" onChange={this.emailChange} aria-describedby="emailHelp"/>
        </div>
        <div className="mb-3">
          <label htmlFor="users-password" className="form-label">Password</label>
          <input type="password" className="form-control" id="users-password" onChange={this.passwordChange}/>
        </div>
        <div className="mb-3">
          <label htmlFor="users-phoneNumber" className="form-label">Phone Number</label>
          <input type="text" className="form-control" id="users-phoneNumber" onChange={this.phoneNumberChange}/>
        </div>
        <div className="mb-3">
          <label htmlFor="users-username" className="form-label">Username</label>
          <input type="text" className="form-control" id="users-username" onChange={this.usernameChange}/>
        </div>
        <button type="submit" className="btn btn-primary" onClick={this.submit}>Submit</button>
      </div>
    );
  }
}

export default CreateAccount;
