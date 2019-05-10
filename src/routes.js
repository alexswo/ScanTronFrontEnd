import React from 'react';
import { Route } from 'react-router-dom';

import ClassView from './views/classView.js';
import AssignmentView from './views/assignmentView.js';
import StudentView from './views/studentView.js';
import SettingsView from './views/settingsView.js';

export const Routes = () => {
  return (
    <div>
      <Route exact path='/' component={ClassView} />
      <Route path='/class' component={ClassView} />
      <Route path='/assignment' component={AssignmentView} />
      <Route path='/student' component={StudentView} />
      <Route path='/settings' component={SettingsView} />
    </div>
  )
};