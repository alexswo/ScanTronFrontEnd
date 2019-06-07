import { combineReducers } from 'redux';
import { authentication } from './authentication';
import { registration } from './registration';
import { user } from './user';
import { courses } from './courses';
import { exams } from './exams';

const rootReducer = combineReducers({
  authentication,
  registration,
  user,
  courses,
  exams,
});

export default rootReducer;
