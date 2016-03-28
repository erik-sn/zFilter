import axios from 'axios'

import { FILTER_SYSTEM_CREATE } from '../actions/actions'
import { FILTER_SYSTEM_MODIFY } from '../actions/actions'
import { FILTER_SYSTEM_DELETE } from '../actions/actions'

import { getJumpRangeUrl } from '../functions/system_functions'

export default function(state = [], action) {

    switch (action.type) {
        case FILTER_SYSTEM_CREATE:
            console.log('Reducer: ', action.meta.filter)
            return action.meta.filter

        case FILTER_SYSTEM_DELETE:
            return action.meta.filter

         case FILTER_SYSTEM_MODIFY:
            return action.meta.filter
    }
    return state
}



