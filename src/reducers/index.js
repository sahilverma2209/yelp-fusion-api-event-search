import { combineReducers } from 'redux';
import EventReducer from './reducer_event_list';
import InputValue from './reducer_loc_input';
import UserLocation from './reducer_location';

const rootReducer = combineReducers({
  list: EventReducer,
  input: InputValue,
  uLoc: UserLocation
});

export default rootReducer;
