import React, { Component } from 'react';
import { Route, Redirect, Switch } from 'react-router-dom';
import CoursesView from './views/CoursesView.js';
import AssignmentView from './views/AssignmentView.js';
import SettingsView from './views/SettingsView.js';
import RegisterView from './views/RegisterView.js';
import VerifyView from './views/VerifyView.js';
import LoginView from './views/LoginView';

class Routes extends Component {
  render() {
    return (
      <div>
        <Switch>
          <Route exact path='/' render={ (props) => localStorage.getItem('user') ? <CoursesView  {...props } /> : <Redirect to='/login' /> } />
          <Route path='/courses' render={ (props) => localStorage.getItem('user') ? <CoursesView {...props } /> : <Redirect to='/login' /> } />
          <Route path='/course/:courseId' render={ (props) => localStorage.getItem('user') ? <AssignmentView {...props } /> : <Redirect to='/login' /> } />
          <Route path='/settings' render={ (props) => localStorage.getItem('user') ? <SettingsView {...props } /> : <Redirect to='/login' /> } />
          <Route path='/register' component={ RegisterView } />
          <Route path='/verify' component={ VerifyView } />
          <Route path='/login' component={ LoginView }/>
          <Redirect to='/login' />
        </Switch>
      </div>
    )
  }
};

export default Routes;
