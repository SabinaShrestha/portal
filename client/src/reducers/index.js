import { combineReducers } from 'redux'
import user from './user'
import flash from './flash'
import courses from './courses'

const rootReducer = combineReducers({
  user,
  flash,
  courses,
});

export default rootReducer

