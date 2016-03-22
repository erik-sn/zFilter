import axios from 'axios'

import { FILTER_SYSTEM_CREATE } from '../actions/actions'
import { FILTER_SYSTEM_MODIFY } from '../actions/actions'
import { FILTER_SYSTEM_DELETE } from '../actions/actions'


export default function(state = [], action) {

    switch (action.type) {
        case FILTER_SYSTEM_CREATE:
            return action.payload.data.systems

        case FILTER_SYSTEM_DELETE:
            if(action.payload) {
              return action.payload.data.systems
            }
            return state

         case FILTER_SYSTEM_MODIFY:
            return action.payload.data.systems
    }
    return state
}



