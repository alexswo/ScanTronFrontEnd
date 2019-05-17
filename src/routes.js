import React from 'react';
import { Route, Redirect } from 'react-router-dom';

import ClassView from './views/ClassView.js';
import AssignmentView from './views/AssignmentView.js';
import StudentView from './views/StudentView.js';
import SettingsView from './views/SettingsView.js';
import RegisterView from './views/RegisterView.js';

export const Routes = () => {
  return (
    <div>
      <Route exact path='/' render={ () => (sessionStorage.getItem('user') ? <ClassView /> : <Redirect to='/login' />) } />
      <Route path='/class' render={ () => (sessionStorage.getItem('user') ? <ClassView /> : <Redirect to='/login' />) } />
      <Route path='/assignment' render={ () => (sessionStorage.getItem('user') ? <AssignmentView /> : <Redirect to='/login' />) } />
      <Route path='/student' render={ () => (sessionStorage.getItem('user') ? <StudentView /> : <Redirect to='/login' />) } />
      <Route path='/settings' render={ () => (sessionStorage.getItem('user') ? <SettingsView /> : <Redirect to='/login' />) } />
      <Route path='/register' component={RegisterView} />
    </div>
  )
};
