import { combineReducers } from 'redux';
import { authentication } from './authentication';
import { registration } from './registration';

const rootReducer = combineReducers({
  authentication,
  registration,
});

export default rootReducer;
