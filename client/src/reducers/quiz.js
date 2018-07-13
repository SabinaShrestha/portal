import axios from 'axios'
import { setHeaders } from './headers'
import { setFlash } from './flash'

const QUIZZES = 'QUIZZES'
const GET_QUIZZES = 'GET_QUIZZES'
const ADD_QUIZ = 'ADD_QUIZ'
const GET_QUIZ = 'GET_QUIZ'
const UPDATE_QUIZ = 'UPDATE_QUIZ'

export const getQuizzes = (courseId) => {
  return(dispatch) => {
    axios.get(`/api/courses/${courseId}/quizzes`)
      .then( res => {
        dispatch(setHeaders(res.headers))
        dispatch({ type: GET_QUIZZES, quizzes: res.data, header: res.headers })
      })
      .catch( (err) => dispatch(setFlash('Failed to retrieve quizzes.', 'red')) )
  }
}

export const addQuiz = (courseId, quiz, history) => {
  return(dispatch) => {
    axios.post(`/api/courses/${courseId}/quizzes`, { quiz })
      .then( ({ data, headers }) => {
        dispatch(setHeaders(headers))
        dispatch({ type: ADD_QUIZ, quizzes: data, headers })
        history.push(`/courses/${courseId}/quizzes`)
      })
      .catch( err => {
        dispatch(setHeaders(err.headers))
        dispatch(setFlash('Failed To Add Quiz', 'red'));
      })
  }
}

export const getQuiz = (courseId, quizId) => {
  return (dispatch) => {
    axios.get(`/api/courses/${courseId}/quizzes/${quizId}`)
      .then( ({ data, headers }) => dispatch({ type: GET_QUIZ, quiz: data, headers }) )
      .catch( err => {
        dispatch(setHeaders(err.headers))
        dispatch(setFlash('Failed to Find Quiz', 'red'))
      })
  }
}

export const updateQuiz = () => {
  debugger
}

export default ( state = [], action ) => {
  switch (action.type) {
    case QUIZZES:
      return action.quizzes
    case GET_QUIZZES:
      return action.quizzes
    case ADD_QUIZ:
      return [action.quizzes, ...state]
    case GET_QUIZ:
      return action.quiz
    case UPDATE_QUIZ:
      return action.quiz
    default: 
      return state
  }
}
