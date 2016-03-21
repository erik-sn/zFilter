import { FILTER_JUMPS } from '../actions/actions'

export default function(state = [], action) {
  console.log(action)
    switch (action.type) {
        case FILTER_JUMPS:
            console.log(action)
    }
    return state
}

