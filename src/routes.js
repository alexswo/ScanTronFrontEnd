import React from 'react';
import { Route, Redirect } from 'react-router-dom';

import ClassesView from './views/ClassesView.js';
import AssignmentView from './views/AssignmentView.js';
import StudentView from './views/StudentView.js';
import SettingsView from './views/SettingsView.js';
import RegisterView from './views/RegisterView.js';

export const Routes = () => {
  return (
    <div>
      <Route exact path='/' render={ () => (localStorage.getItem('user') ? <ClassesView /> : <Redirect to='/login' />) } />
      <Route exact path='/classes' render={ () => (localStorage.getItem('user') ? <ClassesView /> : <Redirect to='/login' />) } />
      <Route path='/assignment' render={ () => (localStorage.getItem('user') ? <AssignmentView /> : <Redirect to='/login' />) } />
      <Route path='/student' render={ () => (localStorage.getItem('user') ? <StudentView /> : <Redirect to='/login' />) } />
      <Route path='/settings' render={ () => (localStorage.getItem('user') ? <SettingsView /> : <Redirect to='/login' />) } />
      <Route path='/register' component={RegisterView} />
    </div>
  )
};
