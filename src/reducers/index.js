import { combineReducers } from 'redux';
import { authentication } from './authentication';
import { registration } from './registration';
import { user } from './user';
import { courses } from './courses';
import { exams } from './exams';
import { alert } from './alert';

const rootReducer = combineReducers({
  authentication,
  registration,
  user,
  courses,
  exams,
  alert,
});

export default rootReducer;
