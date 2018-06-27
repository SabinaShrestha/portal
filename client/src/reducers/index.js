import { combineReducers } from 'redux'
import user from './user'
import flash from './flash'
import courses from './courses'
import course from './course'

const rootReducer = combineReducers({
  user,
  flash,
  courses,
  course,
});

export default rootReducer

