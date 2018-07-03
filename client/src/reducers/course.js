const SET_COURSE = 'SET_COURSE'
const CLEAR_COURSE = 'CLEAR_COURSE'
const UPDATE_COURSE_NAVS = 'UPDATE_COURSE_NAVS'

export const setCourse = (course) => {
  return { type: SET_COURSE, course: { ...course, navs: [] } }
}

export const clearCourse = () => {
  return { type: CLEAR_COURSE }
}

export const updateCourseNavs = (navs = [], headers) => {
  return { type: UPDATE_COURSE_NAVS, navs, headers }
}

export default ( state = { navs: [] }, action ) => {
  switch (action.type) {
    case SET_COURSE:
      return action.course
    case UPDATE_COURSE_NAVS:
      return {
        ...state,
        navs: action.navs
      }
    case CLEAR_COURSE:
      return { navs: []}
    default:
      return state
  }
}

