import { FILTER_JUMPS } from '../actions/actions'

export default function(state = [], action) {
    switch (action.type) {
        case FILTER_JUMPS:
            return state.concat(action.payload)

        case FILTER_SYSTEM_DELETE:
            let updatedFilter = []
            for(let i = 0; i < state.length; i++) {
              console.log(state[i].system, ' vs. ', action.payload)
              if(state[i].system != action.payload) {
                updatedFilter.push(state[i])
              }
            }
            return updatedFilter

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
            console.log(modifyFilter)
            return modifyFilter
    }
    return state
}

