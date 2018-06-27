import axios from 'axios'
import { setFlash } from './flash'

const COURSES = 'COURSES'

export const getCourses = () => {
  return (dispatch) => {
    axios.get('/api/courses')
      .then( ({ headers, data }) => dispatch({ type: COURSES, courses: data, headers }) )
      .catch( (err) =>  dispatch(setFlash('Failed to retrieve courses.', 'red')) )
  }
}

export default ( state = [], action ) => {
  switch (action.type) {
    case COURSES:
      return action.courses
    default:
      return state
  }
}

