import { FILTER_SYSTEM_CREATE } from '../actions/actions'
import { FILTER_SYSTEM_MODIFY } from '../actions/actions'

export default function(state = [], action) {
    switch (action.type) {
        case FILTER_SYSTEM_CREATE:
            console.log('Create Filter Reducer: ', action.payload)
            return state.concat(action.payload)
    }
    return state
}

//export default function(state = [], action) {
//    switch (action.type) {
//        case FILTER_SYSTEM_MODIFY:
//            const modifiedFilter = action.payload
//            let filters = state
//            for(let filter in filters) {
//              if(filter.system == modifiedFilter.system) {
//                filter.jumps = modifiedFilter.jumps
//                filter.ly = modifiedFilter.ly
//              }s
//            }
//            return filters
//    }
//    return state
//}
