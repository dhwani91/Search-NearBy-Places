import {combineReducers} from 'redux';
import MapReducer from './reducer_map.js';
const rootReducer = combineReducers({
  map:MapReducer

})

export default rootReducer;