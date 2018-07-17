import { setFlash } from './flash'
import { setHeaders } from './headers'
import axios from 'axios'

const ASSIGNMENTS = 'ASSIGNMENTS'
const ADD_ASSIGNMENT = 'ADD_ASSIGNMENT'
const EDIT_ASSIGNMENT = 'EDIT_ASSIGNMENT'
const DELETE_ASSIGNMENT = 'DELETE_ASSIGNMENT'

export const getAssignments = (course_id) => {
  return (dispatch) => {
    axios.get(`/api/courses/${course_id}/assignments`)
      .then( res => {
        dispatch(setHeaders(res.headers))
        dispatch({ type: ASSIGNMENTS, assignments: res.data })
      })
  }
}

export const addAssignment = (courseId, assignment) => {
  return ( dispatch ) => {
    axios.post(`/api/courses/${courseId}/assignments`, {assignment})
    .then(res => {
        dispatch({ type: ADD_ASSIGNMENT, assignment: res.data, headers: res.headers })
        dispatch(setFlash('Assignment created successfully', 'green'))
        dispatch(setHeaders(res.headers))
      })
      .catch( e => {
        dispatch(setHeaders(e.headers))
        dispatch(setFlash(e.errors, 'red'))
      })
  }
}

export const editAssignment = (courseId, assignment) => {
  return ( dispatch ) => {
    axios.put(`/api/courses/${courseId}/assignments/${assignment.id}`, {assignment})
    .then(res => {
      dispatch(setHeaders(res.headers))
      dispatch(setFlash('Assignment updated', 'green'))
      dispatch({ type: EDIT_ASSIGNMENT, assignment: res.data })
    })
    .catch( e => {
      dispatch(setHeaders(e.headers))
      dispatch(setFlash(e.errors, 'red'))
    })
  }
}

export const deleteAssignment = (courseId, assignment, history) => {
  return (dispatch) => {
    axios.delete(`/api/courses/${courseId}/assignments/${assignment.id}`)
      .then( res => {
        dispatch(setHeaders(res.headers))
        dispatch(setFlash('Assignment deleted', 'green'))
        dispatch({ type: DELETE_ASSIGNMENT, assignment })
        history.push(`/courses/${courseId}/assignments`)
      })
      .catch( e => {
        dispatch(setHeaders(e.headers))
        dispatch(setFlash(e.errors, 'red'))
      })
  }
}

export default ( state = [], action ) => {
  switch ( action.type ){
    case ASSIGNMENTS:
      return action.assignments
    case ADD_ASSIGNMENT:
      return [action.assignment, ...state]
    case EDIT_ASSIGNMENT:
      return state.map( a => {
        if (a.id === action.assignment.id)
          return action.assignment
        return a
      })
    case DELETE_ASSIGNMENT:
      return state.filter( a => a.id !== action.id )
    default:
      return state
  }
}
