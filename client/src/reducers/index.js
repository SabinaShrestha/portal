import { combineReducers } from 'redux'
import user from './user'
import flash from './flash'
import courses from './courses'
import course from './course'
import units from './units'
import quiz from './quiz'
import assignments from './assignments'
import enrollments from './enrollments'

const rootReducer = combineReducers({
  user,
  flash,
  courses,
  course,
  assignments,
  units, 
  quiz,
  enrollments,
})

export default rootReducer
