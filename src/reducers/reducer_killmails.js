import { GET_KILLMAIL } from '../actions/actions'

export default function(state = [], action) {
    switch (action.type) {
        case GET_KILLMAIL:
            let killmails = []
            let filterIDs = [30000142, 30002537]
            for(let kill of action.payload.data) {
                const shipID = kill.victim.shipTypeID
                const systemID = kill.solarSystemID
                const security = Math.round(systemData[systemID].security *10) / 10
                const time = kill.killTime.substring(10,16)
                if(isValid(shipID, systemID)) {
                    const killmail = {
                        killID: kill.killID,
                        shipID: shipID,
                        shipName: shipdata[shipID].shipname,
                        systemID: systemID,
                        system: systemData[systemID].name,
                        security: security,
                        victimName: kill.victim.characterName,
                        victimCorp: kill.victim.corporationName,
                        victimAlliance: kill.victim.allianceName,
                        shipTypeID: kill.victim.shipTypeID,
                        time: time
                    }
                    killmails.push(killmail)
                }
            }
            console.log('Adding kills to list: ', killmails.length)
            return killmails.concat(state) // concatanate killmails to the beginning of array
    }
    return state
}

/**
 * Check to make sure this killmail is valid (ship or pos)
 * @param   {integer} shipID   - Type ID of the ship
 * @param   {integer} systemID - Type ID of the system
 * @returns {boolean}   - Whether or not the killmail is valid
 */

function isValid(shipID, systemID) {
    if(!shipdata[shipID] || !systemData[systemID]) {
        return false;
    }
    return true;
}








