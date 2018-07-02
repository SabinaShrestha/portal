import { combineReducers } from 'redux'
import user from './user'
import flash from './flash'
import courses from './courses'
import course from './course'
import units from './units'

const rootReducer = combineReducers({
  user,
  flash,
  courses,
  course,
  units, 
})

export default rootReducer

