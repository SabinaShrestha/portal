import { setFlash } from './flash'
import { setHeaders } from './headers'
import axios from 'axios'

const ASSIGNMENTS = 'ASSIGNMENTS'
const ADD_ASSIGNMENT = 'ADD_ASSIGNMENT'
const UPDATE_ASSIGNMENT = 'EDIT_ASSIGNMENT'

export const addAssignment = (courseId, assignment) => {
  return ( dispatch ) => {
    axios.post(`/api/courses/${courseId}/assignments`, {assignment})
    .then(res => {
        dispatch({ type: ADD_ASSIGNMENT, assignment: res.data, headers: res.headers })
        dispatch(setFlash('Assignment created successfully', 'green'))
        dispatch(setHeaders(res.headers))
      })
      .catch( (err) =>  {
        dispatch(setFlash('Failed to create assignment.', 'red'))
      })
  }
}

export const updateAssignment = (courseId, assignment) => {
  return ( dispatch ) => {
    axios.put(`/api/courses/${courseId}/assignments`, {assignment})
    .then(res => {
      dispatch({ type: UPDATE_ASSIGNMENT, assignment: res.data })
      const { header } = res
      dispatch(setHeaders(header))
      dispatch(setFlash('Assignment updated', 'green'))
    })
    .catch( (err) => dispatch(setFlash('Failed to update assignment', 'red')))
  }
}

export default ( state = [], action ) => {
  switch ( action.type ){
    case ASSIGNMENTS:
      return action.assignments
    case ADD_ASSIGNMENT:
      return [action.assignment, ...state]
    case UPDATE_ASSIGNMENT:
      return [action.assignment, ...state]
    default:
      return state
  }
}
