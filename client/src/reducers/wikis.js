import axios from 'axios'
import { setHeaders } from './headers'
import { setFlash } from './flash'

const ADD_WIKI = 'ADD_WIKI'
const GET_WIKI = 'GET_WIKI'
const GET_WIKIS = 'GET_WIKIS'
const UPDATE_WIKI = 'UPDATE_WIKI'
const DELETE_WIKI = 'DELETE_WIKI'

export const addWiki = (courseId, wiki) => {
  return (dispatch) => {
    axios.post(`/api/courses/${courseId}/wikis`, { wiki })
      .then(({ data, headers }) => {
        dispatch({ type: ADD_WIKI, wikis: data, headers })
        dispatch(setFlash('Wiki added successfully', 'green'))
      })
      .catch(err => {
        dispatch(setHeaders(err.headers))
        dispatch(setFlash('Failed To Add Wiki', 'red'));
      })
  }
}

export const getWiki = (courseId, wikiId) => {
  return (dispatch) => {
    axios.get(`/api/courses/${courseId}/wikis/${wikiId}`)
      .then(({ data, headers }) => dispatch({ type: GET_WIKI, wiki: data, headers }))
      .catch(err => {
        dispatch(setHeaders(err.headers))
        dispatch(setFlash('Failed to find Wiki', 'red'))
      })
  }
}

export const getWikis = (courseId) => {
  return (dispatch) => {
    axios.get(`/api/courses/${courseId}/wikis`)
      .then(({ data, headers }) => dispatch({ type: GET_WIKIS, wikis: data, headers }))
      .catch(err => {
        dispatch(setHeaders(err.headers))
        dispatch(setFlash('Failed to find Wikis', 'red'))
      })
  }
}

export const updateWiki = (courseId, wikiId, wiki, history) => {
  return (dispatch) => {
    axios.put(`/api/courses/${courseId}/wikis/${wikiId}`, { wiki })
      .then(res => {
        dispatch(setHeaders(res.headers))
        dispatch(setFlash('Wiki updated', 'green'))
        dispatch({ type: UPDATE_WIKI, wiki: res.data })
        history.push(`/courses/${courseId}/wikis`)
      })
      .catch((err) => {
        dispatch(setFlash('Failed to update wiki', 'red'))
        dispatch(setHeaders(err.headers))
      })
  }
}

export const deleteWiki = (courseId, wikiId) => {
  return (dispatch) => {
    axios.delete(`/api/courses/${courseId}/wikis/${wikiId}`)
      .then(res => {
        dispatch(setHeaders(res.headers))
        dispatch(setFlash('Wiki deleted', 'green'))
        dispatch({ type: DELETE_WIKI, id: wikiId})
      })
      .catch((err) => {
        dispatch(setFlash('Failed to delete wiki', 'red'))
        dispatch(setHeaders(err.headers))
      })
  }

}

export default (state = [], action) => {
  switch (action.type) {
    case ADD_WIKI:
      return [ action.wikis, ...state ]
    case GET_WIKI:
      return [ action.wiki ]
    case GET_WIKIS:
      return action.wikis
    case UPDATE_WIKI:
      return [ ...state ]
    case DELETE_WIKI:
      return state.filter(w => w.id !== action.id)
    default:
      return state
  }
}
