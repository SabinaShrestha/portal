import axios from 'axios'
import { setFlash } from './flash'
import { setHeaders } from './headers';

const COURSES = 'COURSES'
const ADD_COURSE = 'ADD_COURSE'

export const getCourses = () => {
  return (dispatch) => {
    axios.get('/api/courses')
      .then( ({ headers, data }) => dispatch({ type: COURSES, courses: data, headers }) )
      .catch( (err) =>  dispatch(setFlash('Failed to retrieve courses.', 'red')) )
  }
}

export const addCourse = (course) => {
  return (dispatch) => {
    axios.post('/api/courses', { course })
      .then ( res => {
        dispatch({ type: ADD_COURSE, course: res.data })
        const { headers } = res
        dispatch(setHeaders(headers))
        dispatch(setFlash('Course added successfully!', 'green'))
      })
      .catch( (err) =>  dispatch(setFlash('Failed to add course.', 'red')) )
  }
}

export default ( state = [], action ) => {
  switch (action.type) {
    case COURSES:
      return action.courses
    case ADD_COURSE:
      return [action.course, ...state]
    default:
      return state
  }
}

