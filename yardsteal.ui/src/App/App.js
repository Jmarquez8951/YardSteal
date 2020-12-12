import React from 'react';
import {
  BrowserRouter,
  Route,
  Redirect,
  Switch,
} from 'react-router-dom';

import Home from '../components/page/Home/Home';
import SingleView from '../components/page/SingleView/SingleView';
import MyNavbar from '../components/shared/MyNavbar/MyNavbar';

import './App.scss';

class App extends React.Component {
  render() {
    return (
      <div className="App">
        <BrowserRouter>
          <React.Fragment>
            <MyNavbar />
            <div className="container">
              <Switch>
                <Route path='/home' component={Home} />
                <Route path='/posts/:postId' component={SingleView} />
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
