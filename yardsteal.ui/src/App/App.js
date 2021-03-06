import React from 'react';
import firebase from 'firebase/app';
import 'firebase/auth';
import './App.scss';

import {
  BrowserRouter,
  Route,
  Redirect,
  Switch,
} from 'react-router-dom';

import Home from '../components/page/Home/Home';
import UsersPosts from '../components/page/UsersPosts/UsersPosts';
import SingleView from '../components/page/SingleView/SingleView';
import CreateAccount from '../components/page/CreateAccount/CreateAccount';
import Account from '../components/page/Account/Account';
import Bookmarks from '../components/page/Bookmarks/Bookmarks';
import CreatePost from '../components/page/CreatePost/CreatePost';
import EditPost from '../components/page/EditPost/EditPost';
import Login from '../components/page/Login/Login';
import MyNavbar from '../components/shared/MyNavbar/MyNavbar';

import fbConnection from '../helpers/data/connection';

fbConnection();

const PublicRoute = ({ component: Component, authed, ...rest }) => {
  const routeChecker = (props) => (authed === false
    ? (<Component {...props} />)
    : (<Redirect to={{ pathname: '/home', state: { from: props.location } }} />));
  return <Route {...rest} render={(props) => routeChecker(props)} />;
};

const PrivateRoute = ({ component: Component, authed, ...rest }) => {
  const routeChecker = (props) => (authed === true
    ? (<Component {...props} />)
    : (<Redirect to={{ pathname: '/sign-up', state: { from: props.location } }} />));
  return <Route {...rest} render={(props) => routeChecker(props)} />;
};

class App extends React.Component {
  state = {
    authed: false,
  }

  componentDidMount() {
    this.removeListener = firebase.auth().onAuthStateChanged((user) => {
      if (user) {
        this.setState({ authed: true });
      } else {
        this.setState({ authed: false });
      }
    });
  }

  componentWillUnmount() {
    this.removeListener();
  }

  render() {
    const { authed } = this.state;

    return (
      <div className="App">
        <BrowserRouter>
          <React.Fragment>
            <MyNavbar authed={authed}/>
            <div className="container">
              <Switch>
                <PrivateRoute path='/home' component={Home} authed={authed} />
                <PrivateRoute path='/posts/:postId' component={SingleView} authed={authed} />
                <PrivateRoute path='/account' component={Account} authed={authed} />
                <PrivateRoute path='/bookmarks' component={Bookmarks} authed={authed}/>
                <PrivateRoute path='/my-posts' component={UsersPosts} authed={authed} />
                <PrivateRoute path='/new-post' component={CreatePost} authed={authed} />
                <PrivateRoute path='/edit-post/:postId' component={EditPost} authed={authed}/>
                <PublicRoute path='/sign-up' component={CreateAccount} authed={authed} />
                <PublicRoute path='/log-in' component={Login} authed={authed} />
                <Redirect from="*" to="/home"/>
              </Switch>
            </div>
          </React.Fragment>
        </BrowserRouter>
      </div>
    );
  }
}

export default App;
