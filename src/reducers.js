import { combineReducers } from 'redux';

import ticketReducer from './reducers/ticketReducer';
import authReducer from './reducers/authReducer'; // Assuming your reducer is in a separate file

const rootReducer = combineReducers({
  tickets: ticketReducer,
  auth: authReducer,
});

export default rootReducer;
