import axios from 'axios'
import { setFlash } from './flash'
import { setHeaders } from './headers'
import { setCourse } from './course'

const COURSES = 'COURSES'
const ADD_COURSE = 'ADD_COURSE'
const COPY_COURSE = 'COPY_COURSE'
const DELETE_COURSE = 'DELETE_COURSE'
const UPDATE_COURSE = 'UPDATE_COURSE'

export const updateCourse = (course) => {
  return (dispatch, getState) => {
    const courseState = getState().course
    axios.put(`/api/courses/${course.id}`, { course })
      .then( ({ data, headers }) => {
        dispatch({ type: UPDATE_COURSE, course: data, headers })
        dispatch(setCourse({...courseState, ...data}))
        dispatch(setFlash('Course has been updated', 'green'))
      })
      .catch( e => {
        dispatch(setHeaders(e.headers))
        dispatch(setFlash(e.errors, 'red'))
      })
  }
}

export const copyCourse = (course) => {
  return (dispatch, getState) => {
    const courseState = getState().course
    dispatch(setFlash('Starting course copy...', 'blue'))
    axios.post(`/api/courses/${course.id}/copy_course/${course.id}`, { course })
      .then( ({ data, headers }) => {
        dispatch({ type: COPY_COURSE, course: data, headers })
        dispatch(setCourse({...courseState, ...data}))
        dispatch(setFlash('Course copy created successfully.', 'green'))
      })
      .catch( e => {
        dispatch(setHeaders(e.headers))
        dispatch(setFlash(e.errors, 'red'))
      })
  }
}

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

export const deleteCourse = () => {
  console.log('Got it!')
}

export default ( state = [], action ) => {
  switch (action.type) {
    case COURSES:
      return action.courses
    case ADD_COURSE:
      return [action.course, ...state]
    case UPDATE_COURSE:
      return state.map( c => {
        if ( c.id === action.course.id )
          return action.course
        return c
      })
    case DELETE_COURSE:
      return state.filter( c => c.id !== action.id )
    default:
      return state
  }
}

