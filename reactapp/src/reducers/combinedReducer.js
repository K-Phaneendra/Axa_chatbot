import { combineReducers } from 'redux';
import chatReducer from './chatReducer';
import crudReducer from './crudReducer';

const combinedReducer = combineReducers({
  chatReducer,
  crudReducer
});

export default combinedReducer;
