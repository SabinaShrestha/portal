const SET_COURSE = 'SET_COURSE'
const CLEAR_COURSE = 'CLEAR_COURSE'

export const setCourse = (course) => {
  return { type: SET_COURSE, course }
}

export const clearCourse = () => {
  return { type: CLEAR_COURSE }
}

export default ( state = {}, action ) => {
  switch (action.type) {
    case SET_COURSE:
      return action.course
    case CLEAR_COURSE:
      return {}
    default:
      return state
  }
}

