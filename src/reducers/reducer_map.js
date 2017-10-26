import {
  SHOW_MAP,
  SET_BROWSER_LOCATION,
  GET_PLACE_DETAILS

} from '../actions/actions_googlemap.js';

const initialState = {
  position: {lat: 37.782703500000004, lng: -122.4194},
  showMap:false,
  placeDetails:{}
};

const MapReducer = (state = initialState, action) => {
  switch (action.type) {
    case  SET_BROWSER_LOCATION :
      return Object.assign({}, state, {
        position : action.payload
      });
    case SHOW_MAP:
      return Object.assign({}, state, {
        showMap: true
      });
    case GET_PLACE_DETAILS:
      return Object.assign({}, state, {
        placeDetails:action.payload
      });
    default:
      return state;
  }
};

export default MapReducer;
