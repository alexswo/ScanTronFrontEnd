import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Route, Redirect, Switch } from 'react-router-dom';
import CoursesView from './views/CoursesView.js';
import AssignmentView from './views/AssignmentView.js';
import SettingsView from './views/SettingsView.js';
import RegisterView from './views/RegisterView.js';
import VerifyView from './views/VerifyView.js';
import LoginView from './views/LoginView';

class Routes extends Component {
  render() {
    const { loggedIn } = this.props;
    return (
      <div>
        <Switch>
          <Route exact path='/' render={ (props) => loggedIn ? <CoursesView  {...props } /> : <Redirect to='/login' /> } />
          <Route path='/courses' render={ (props) => loggedIn ? <CoursesView {...props } /> : <Redirect to='/login' /> } />
          <Route path='/course/:courseId' render={ (props) => loggedIn ? <AssignmentView {...props } /> : <Redirect to='/login' /> } />
          <Route path='/settings' render={ (props) => loggedIn ? <SettingsView {...props } /> : <Redirect to='/login' /> } />
          <Route path='/register' component={ RegisterView } />
          <Route path='/verify' component={ VerifyView } />
          <Route path='/login' component={ LoginView }/>
          <Redirect to='/login' />
        </Switch>
      </div>
    )
  }
};

function mapStateToProps(state) {
  const { loggedIn } = state.authentication;
  return {
      loggedIn
  };
}

export default connect(mapStateToProps)(Routes);
