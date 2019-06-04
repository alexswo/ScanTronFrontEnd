import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Route, Redirect } from 'react-router-dom';
import ClassesView from './views/ClassesView.js';
import AssignmentView from './views/AssignmentView.js';
import StudentView from './views/StudentView.js';
import SettingsView from './views/SettingsView.js';
import RegisterView from './views/RegisterView.js';
import LoginView from './views/LoginView';

class Routes extends Component {
  render() {
    const { loggedIn } = this.props;
    return (
      <div>
        <Route exact path='/' render={ () => loggedIn ? <ClassesView /> : <Redirect to='/login' /> } />
        <Route path='/classes' render={ () => loggedIn ? <ClassesView /> : <Redirect to='/login' /> } />
        <Route path='/assignment' render={ () => loggedIn ? <AssignmentView /> : <Redirect to='/login' /> } />
        <Route path='/student' render={ () => loggedIn ? <StudentView /> : <Redirect to='/login' /> } />
        <Route path='/settings' render={ () => loggedIn ? <SettingsView /> : <Redirect to='/login' /> } />
        <Route path='/register' component={ RegisterView } />
        <Route path='/login' component={ LoginView }/>
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
