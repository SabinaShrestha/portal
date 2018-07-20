import axios from 'axios'
import { setHeaders } from './headers'
import { setFlash } from './flash'

const ADD_QUESTION = 'ADD_QUESTION'

export const addQuestion = (courseId, quizId, body) => {
  return(dispatch) => {
    axios.post(`/api/courses/${courseId}/quizzes/${quizId}/questions`, { body } )
      .then( ({ data, headers }) => {
        dispatch(setHeaders(headers))
        dispatch({ type: ADD_QUESTION, questions: data, headers })
      })
      .catch( err => {
        dispatch(setHeaders(err.headers))
        dispatch(setFlash('Failed to Add Question', 'red'))
      })
  }
}

export default ( state = [], action ) => {
  switch (action.type) {
    case ADD_QUESTION:
      return [action.questions, ...state]
    default:
      return state
  }
}
