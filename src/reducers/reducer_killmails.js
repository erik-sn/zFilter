import { GET_KILLMAIL } from '../actions/index'

export default function(state = [], action) {
    switch (action.type) {
        case GET_KILLMAIL:
            let killmails = []
            for(let kill of action.payload.data) {
                 const killmail = {
                    killID: kill.killID,
                    solarSystemID: kill.solarSystemID,
                    victimName: kill.victim.characterName,
                    shipTypeID: kill.victim.shipTypeID,
                    time: kill.killTime
                }
                console.log('Name: ', killmail.victimName, ' ID: ', killmail.killID, ' Time: ', killmail.time)
                killmails.push(killmail)
            }
            console.log('Adding kills to list: ', killmails.length)
            return killmails.concat(state) // concatanate killmails to the beginning of array
    }
    return state
}


