import { GET_TOP_KILL } from '../actions/index'

export default function(state = -1, action) {
    switch (action.type) {
        case GET_TOP_KILL:
            console.log(action.payload.data[0].killID)
            return action.payload.data[0].killID
    }
    return state
}
