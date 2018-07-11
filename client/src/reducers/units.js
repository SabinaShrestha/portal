import axios from 'axios';

const GET_UNITS = 'GET_UNITS'; 

export const getUnits = (course) => {
  return(dispatch ) => {
    axios.get(`/api/courses/${course}/units`)
      .then( res => {
        dispatch({ type: GET_UNITS, units: res.data, headers: res.headers })
      })
  }
} 

export default (state = [], action) => {
  switch (action.type) {
    case GET_UNITS:
      return action.units;
    default:
      return state;
  }
};
