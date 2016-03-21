import { combineReducers } from 'redux';
import KillmailReducer from './reducer_killmails'
import SystemFilterReducer from './reducer_filter_system'
import SystemJumpFilterReducer from './reducer_jumps'

const rootReducer = combineReducers({
  system_filter: SystemFilterReducer,
  killmail_list: KillmailReducer,
  system_jump_filter: SystemJumpFilterReducer
});

export default rootReducer;
