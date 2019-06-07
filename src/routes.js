import React, { Component } from 'react';
import { Route, Redirect, Switch } from 'react-router-dom';
import CoursesView from './views/CoursesView.js';
import CourseView from './views/CourseView.js';
import ExamView from './views/ExamView.js';
import UserView from './views/UserView.js';
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
          <Route path='/course/:courseId' render={ (props) => localStorage.getItem('user') ? <CourseView {...props } /> : <Redirect to='/login' /> } />
          <Route path='/exam/:examId' render={ (props) => localStorage.getItem('user') ? <ExamView {...props } /> : <Redirect to='/login' /> } />
          <Route path='/user' render={ (props) => localStorage.getItem('user') ? <UserView {...props } /> : <Redirect to='/login' /> } />
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
