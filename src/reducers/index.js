import { combineReducers } from 'redux';
import KillmailReducer from './reducer_killmails'
import SystemFilterReducer from './reducer_filter_system'

const rootReducer = combineReducers({
  system_filter: SystemFilterReducer,
  killmail_list: KillmailReducer
});

export default rootReducer;
