import React from 'react';
import authData from '../../../helpers/data/authData';
import './Login.scss';

class Login extends React.Component {
  state = {
    user: {
      email: '',
      password: '',
    },
  }

  toSignUpPage = (e) => {
    e.preventDefault();
    e.view.location.pathname = '/sign-up';
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

  logMeIn = (e) => {
    e.preventDefault();
    const { user } = this.state;
    authData.loginUser(user)
      .then()
      .catch((err) => console.error('could not log in user', err));
  }

  render() {
    return (
      <div className="Login">
        <div className="mb-3">
          <label htmlFor="users-email" className="form-label">Email address</label>
          <input type="email" className="form-control" id="users-email" onChange={this.emailChange} aria-describedby="emailHelp"/>
        </div>
        <div className="mb-3">
          <label htmlFor="users-password" className="form-label">Password</label>
          <input type="password" className="form-control" id="users-password" onChange={this.passwordChange}/>
        </div>
        <button className="btn btn-dark" onClick={this.logMeIn}>Login</button>
        <p>Don't have an account yet? <small className="border-bottom border-dark" onClick={this.toSignUpPage}>Click Here</small></p>
      </div>
    );
  }
}

export default Login;
