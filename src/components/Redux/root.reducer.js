import {combineReducers} from 'redux';
import userReducer from './user/user.reducer';

const allReducer = combineReducers({
  user:userReducer
});

export default allReducer;