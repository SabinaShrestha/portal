import axios from 'axios'

const ENROLLMENTS = 'ENROLLMENTS'
const DELETE_ENROLLMENT = 'DELETE_ENROLLMENT'
const UPDATE_ENROLLMENT = 'UPDATE_ENROLLMENT'

export const getEnrollments = (courseId) => {
  return (dispatch) => {
    axios.get(`/api/courses/${courseId}/enrollments`)
      .then( res => {
        dispatch({ type: ENROLLMENTS, enrollments: res.data, headers: res.headers })
      })
  }
}

export const deleteEnrollment = (courseId, id) => {
  return (dispatch) => {
    axios.delete(`/api/courses/${courseId}/enrollments/${id}`)
      .then( res => {
        dispatch({ type: DELETE_ENROLLMENT, id, headers: res.headers })
      })
  }
}

export const updateEnrollment = (courseId, enrollment) => {
  return (dispatch) => {
    axios.put(`/api/courses/${courseId}/enrollments/${enrollment.id}`, { enrollment })
      .then( res => {
        dispatch({ type: UPDATE_ENROLLMENT, enrollment: res.data, headers: res.headers })
      })
  }
}

export default ( state = [], action ) => {
  switch (action.type) {
    case ENROLLMENTS:
      return action.enrollments
    case UPDATE_ENROLLMENT:
      return state.map( enrollment => {
        if (enrollment.id === action.enrollment.id)
          return { ...enrollment, ...action.enrollment }
        return enrollment
      })
    case DELETE_ENROLLMENT:
      return state.filter( e => e.id !== action.id )
    default:
      return state
  }
}
