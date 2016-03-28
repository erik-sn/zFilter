import { combineReducers } from 'redux';
import KillmailReducer from './reducer_killmails'
import SystemFilterReducer from './reducer_filter_system'
import JumpFilterReducer from './reducer_filter_jumps'
import PilotFilterReducer from './reducer_filter_pilot'
import OptionReducer from './reducer_options'

const rootReducer = combineReducers({
  system_filter: SystemFilterReducer,
  jump_filter: JumpFilterReducer,
  pilot_filter: PilotFilterReducer,
  killmail_list: KillmailReducer,
  options: OptionReducer
});

export default rootReducer;
