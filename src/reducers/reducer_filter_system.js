import { FILTER_SYSTEM_CREATE } from '../actions/actions'
import { FILTER_SYSTEM_MODIFY } from '../actions/actions'
import { FILTER_SYSTEM_DELETE } from '../actions/actions'

import { getJumps } from '../actions/actions'

export default function(state = [], action) {
    switch (action.type) {
        case FILTER_SYSTEM_CREATE:
            return state.concat(action.payload)

        case FILTER_SYSTEM_DELETE:
            for(let i = 0; i < state.length; i++) {
              if(state[i].system == action.payload) {
                return state.slice(0, i).concat(state.slice(i + 1))
              }
            }

         case FILTER_SYSTEM_MODIFY:
            console.log(action.payload)
            let modifyFilter = []
            for(let i = 0; i < state.length; i++) {
              if(state[i].system == action.payload.system) {
                let filter = {
                  system: state[i].system,
                  systemId: state[i].systemId,
                  jumps: state[i].jumps,
                  ly: state[i].ly
                }
                filter[action.payload.key] = action.payload.value
                modifyFilter.push(filter)
              }
              else {
                modifyFilter.push(state[i])
              }
            }
            return modifyFilter
    }
    return state
}



