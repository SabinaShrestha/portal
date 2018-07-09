import axios from 'axios'
import { setHeaders } from './headers'
import { setFlash } from './flash'

const QUIZZES = 'QUIZZES'
const ADD_QUIZ = 'ADD_QUIZ'
const GET_QUIZ = 'GET_QUIZ'
const UPDATE_QUIZ = 'UPDATE_QUIZ'

export const addQuiz = (courseId, quiz, history) => {
  return(dispatch) => {
    axios.post(`/api/courses/${courseId}/quizzes`, { quiz })
      .then( res => {
        dispatch({ type: 'ADD_QUIZ', quizzes: res.data, header: res.headers })
        history.push(`/courses/${courseId}/quizzes`)
      }).catch( err => {
        dispatch(setHeaders(err.headers))
        dispatch(setFlash('Failed To Add Quiz', 'red'));
      })
  }
}

export const getQuiz = (courseId, quizId) => {
  return (dispatch) => {
    axios.get(`/api/courses${courseId}/quizzes/${quizId}`)
  }
}

export const updateQuiz = () => {
}

export default ( state = { navs: [] }, action ) => {
  switch (action.type) {
    case QUIZZES:
      return action.quizzes
    case ADD_QUIZ: 
      return [action.quiz, ...state]
    case GET_QUIZ:
      return action.quiz
    case UPDATE_QUIZ:
      return action.quiz
    default: 
      return state
  }
}
