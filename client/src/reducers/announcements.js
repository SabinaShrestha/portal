import axios from 'axios'
import { setFlash } from './flash'
import { setHeaders } from './headers'

const GET_ANNOUNCEMENTS = 'GET_ANNOUNCEMENTS'
const ADD_ANNOUNCEMENT = 'ADD_ANNOUNCEMENT'
const EDIT_ANNOUNCEMENT = 'EDIT_ANNOUNCEMENT'
const DELETE_ANNOUNCEMENT = 'DELETE_ANNOUNCEMENT'

export const getAnnouncements = courseId => {
  return(dispatch) => {
    axios.get(`/api/courses/${courseId}/announcements`)
      .then( res => {
        const announcements = res.data
        dispatch({ type: GET_ANNOUNCEMENTS, announcements })
      }).catch( ({ headers }) => {
        dispatch(setFlash('Could not get announcement. Please try again.', 'red'))
        dispatch(setHeaders(headers))
    })
  }
}

export const addAnnouncement = (courseId, announcement) => {
  return(dispatch) => {
    axios.post(`/api/courses/${courseId}/announcements`, announcement)
      .then( res => {
        const { headers } = res
        dispatch({ type: ADD_ANNOUNCEMENT, announcement: res.data, headers })
        dispatch(setFlash(`Announcement successfully added!`, 'green'))
      }).catch( ({ headers }) => {
        dispatch(setFlash('Could not add announcement. Please try again.', 'red'))
        dispatch(setHeaders(headers))
    })
  }
}

export const editAnnouncement = (courseId, announcement, id) => {
  return(dispatch) => {
    axios.put(`/api/courses/${courseId}/announcements/${id}`, announcement)
      .then( res => {
        const { headers } = res
        dispatch({ type: EDIT_ANNOUNCEMENT, announcement: res.data, headers })
        dispatch(setFlash(`Announcement successfully updated!`, 'green'))
      }).catch( ({ headers }) => {
        dispatch(setFlash('Could not update announcement. Please try again.', 'red'))
        dispatch(setHeaders(headers))
    })
  }
}

export const deleteAnnouncement = (courseId, id) => {
  return(dispatch) => {
    axios.delete(`/api/courses/${courseId}/announcements/${id}`)
      .then( res => {
        const { headers } = res
        dispatch({ type: DELETE_ANNOUNCEMENT, id, headers })
        dispatch(setFlash(`Announcement successfully deleted!`, 'green'))
      }).catch( ({ headers }) => {
        dispatch(setFlash('Could not delete announcement. Please try again.', 'red'))
        dispatch(setHeaders(headers))
    })
  }
}

export default (state = [], action) => {
  switch(action.type) {
    case 'GET_ANNOUNCEMENTS':
      return action.announcements;
    case 'ADD_ANNOUNCEMENT':
      return [action.announcement, ...state]
    case 'EDIT_ANNOUNCEMENT':
      return state.map( a => {
        if(a.id === action.announcement.id)
          return action.announcement;
        return a
      })
    case 'DELETE_ANNOUNCEMENT':
      return state.filter( a => a.id !== action.id && a )
    default: 
      return state
  }
}
