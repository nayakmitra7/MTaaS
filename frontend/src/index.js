import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import Landing from './landing/landing.js';
import HomepageTester from './homepage/homepageTester';
import HomepageManager from './homepage/homepageManager';
import HomepageAdmin from './homepage/homepageAdmin';
import ProfileTester from './profile/profileTester';
import ProfileManager from './profile/profileManager';
import ProfileAdmin from './profile/profileAdmin';
import CreateProject from './createProject/createProject';
import SignUp from './signup/signup.js';
import Login from './login/login.js';
import BugTracker from './bugTracker/bugtracker.js';
import { ToastContainer } from 'react-toastify';
import * as serviceWorker from './serviceWorker';
import 'bootstrap/dist/css/bootstrap.min.css';
import 'react-toastify/dist/ReactToastify.css';

import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';

class Routes extends React.Component {

  render(){
    return(
      <Router>
        <ToastContainer autoClose={3000} />
        <Switch>
          <Route exact path='/' component={Landing}/>
          <Route exact path='/homeTester' component={HomepageTester}/>
          <Route exact path='/homeManager' component={HomepageManager}/>
          <Route exact path='/homeAdmin' component={HomepageAdmin}/>
          <Route exact path='/profileTester' component={ProfileTester}/>
          <Route exact path='/profileManager' component={ProfileManager}/>
          <Route exact path='/profileAdmin' component={ProfileAdmin}/>
          <Route exact path='/createProject' component={CreateProject}/>
          <Route exact path='/signup' component={SignUp}/>
          <Route exact path='/login' component={Login}/>
          <Route exact path='/bugtracker' component={BugTracker}/>
        </Switch>
      </Router>
    )
  }
}


ReactDOM.render(
  <React.StrictMode>
    <Routes />
  </React.StrictMode>,
  document.getElementById('root')
);

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: https://bit.ly/CRA-PWA
serviceWorker.unregister();
