import { combineReducers } from 'redux';
import KillmailReducer from './reducer_killmails'
import TopKill from './reducer_top_kill'

const rootReducer = combineReducers({
  top_kill: TopKill,
  killmail_list: KillmailReducer
});

export default rootReducer;
