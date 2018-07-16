import axios from 'axios'
import { setHeaders } from './headers'
import { setFlash } from './flash'

export const ADD_SUBMISSION = 'ADD_SUBMISSION'
export const GET_ASSIGNMENT_SUBMISSIONS = 'GET_ASSIGNMENT_SUBMISSIONS'
export const GET_QUIZ_SUBMISSIONS = 'GET_QUIZ_SUBMISSIONS'

export const addSubmission = (courseId, submission) => {
  return (dispatch) => {
    axios.post(`/api/courses/${courseId}/submissions`, submission)
      .then( res => {
        dispatch({ type: ADD_SUBMISSION, submission: res.data, headers: res.headers })
        dispatch(setFlash(`Submitted Successfully!`, 'green'))
      }).catch( err => {
        dispatch(setFlash(`Failed to Submit ${submission.sub_type}`, 'red'))
        dispatch(setHeaders(err.headers))
      })
  }
}

export const getAssignmentSubmissions = (courseId) => {
  return (dispatch) => {
    axios.get(`/api/courses/${courseId}/submissions`)
      .then( res => {
        dispatch({ type: GET_ASSIGNMENT_SUBMISSIONS, submissions: res.data, headers: res.headers })
      }).catch( err => {
        dispatch(setFlash(`Failed to retrieve submissions for assignments: ${assignment_id}`))
        dispatch(setHeaders(err.headers))
      })
  }
}

export const getQuizSubmissions = (courseId) => {
  return (dispatch) => {
    axios.get(`/api/courses/${courseId}/submissions`)
      .then( res => {
        dispatch({ type: GET_QUIZ_SUBMISSIONS, submissions: res.data, headers: res.headers })
      }).catch( err => {
        dispatch(setFlash(`Failed to Retrieve submissions for quizzes: ${quiz_id}`))
        dispatch(setHeaders(err.headers))
      })
  }
}

export default (state = [], action) => {
  switch (action.type) {
    case GET_ASSIGNMENT_SUBMISSIONS:
      return action.submissions
    case GET_QUIZ_SUBMISSIONS:
      return action.submissions
    case ADD_SUBMISSION:
      return action.submission
    default:
      return state;
  }
}