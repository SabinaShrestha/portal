import axios from 'axios';
import { setFlash } from './flash'
import { setHeaders } from './headers'

const GET_UNITS = 'GET_UNITS'; 
const ADD_UNIT = 'ADD_UNIT'; 
const UPDATE_UNIT = 'UPDATE_UNIT';
const DELETE_UNIT = 'DELETE_UNIT'; 
const SET_UNIT = 'SET_UNIT'; 

export const getUnits = (course) => {
  return(dispatch) => {
    axios.get(`/api/courses/${course}/units`)
      .then( ({ headers, data }) => {
        dispatch({ type: GET_UNITS, units: data, headers })
      })
  }
} 

export const setUnit = (course, unit) => {
  return { type: SET_UNIT, unit: { ...unit, navs: [] } }
}

export const addUnit = (courseId, unit) => {
  return (dispatch) => {
    axios.post(`/api/courses/${courseId}/units`, unit )
      .then ( res => {
        dispatch({ type: ADD_UNIT, unit: res.data })
        const { headers } = res
        dispatch(setHeaders(headers))
        dispatch(setFlash('Unit added successfully!', 'green'))
      })
      .catch( (err) =>  dispatch(setFlash('Failed to add unit.', 'red')) )
  }
}

export const updateUnit = (courseId, unitId, unit) => {
  return (dispatch, getState) => {
    debugger 
    axios.put(`/api/courses/${courseId}/units/${unitId}`, { unit })
      .then( ({ data, headers }) => {
        dispatch({ type: UPDATE_UNIT, unit: data, headers })
        dispatch(setFlash('Unit has been updated', 'green'))
      })
      .catch( e => {
        dispatch(setHeaders(e.headers))
        dispatch(setFlash(e.errors, 'red'))
      })
  }
}

export const  deleteUnit = (courseId, unitId) => {
  axios.delete(`/api/courses/${courseId}/units/${unitId}`)
  return 
}

export default (state = [], action) => {
  switch (action.type) {
    case GET_UNITS:
      return action.units;
    case ADD_UNIT:
      return [action.unit, ...state]
    case UPDATE_UNIT:
    return state.map( u => {
      if ( u.id === action.unit.id )
        return action.unit
      return u
    })
    default:
      return state;
  }
};
