export const SET_BROWSER_LOCATION = 'SET_BROWSER_LOCATION';
export const SHOW_MAP='SHOW_MAP';
export const SEARCH_PLACE = 'SEARCH_PLACE';
export const GET_PLACES_LIST='GET_PLACES_LIST';
export const GET_PLACE_DETAILS = 'GET_PLACE_DETAILS';

export const showMapContainer = () => {
  return{
    type:SHOW_MAP
  }
}

export const setBrowserLocation = (position) => {
  return {
    type: SET_BROWSER_LOCATION,
    payload: position
  }
}
export const getPlaceDetails = (results) => {
return {
  type:GET_PLACE_DETAILS,
  payload:results
}
}

