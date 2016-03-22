import { combineReducers } from 'redux';
import KillmailReducer from './reducer_killmails'
import SystemFilterReducer from './reducer_filter_system'
import JumpFilterReducer from './reducer_filter_jumps'

const rootReducer = combineReducers({
  system_filter: SystemFilterReducer,
  jump_filter: JumpFilterReducer,
  killmail_list: KillmailReducer
});

export default rootReducer;
