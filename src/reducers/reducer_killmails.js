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
                        system: systemData[systemID].name,
                        security: security,
                        victimName: kill.victim.characterName,
                        victimCorp: kill.victim.corporationName,
                        victimAlliance: kill.victim.allianceName,
                        shipTypeID: kill.victim.shipTypeID,
                        time: time
                    }
                    console.log('Name: ', killmail.victimName, ' Ship: ', killmail.shipName,' Time: ', killmail.time)
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

/**
 * Given a target system, one or more systems to check against, and a limit, determine
 * if the target system is within light year range of at least one of the filtering
 * systems.
 *
 * @param   {integer} systemID  - The ID of the system the kill occured in
 * @param   {Array} filterIDs   - Array of integers that contains the systems to filter against
 * @param   {integer} limit     - The lightyear limit the kill must be within range of
 * @returns {array}             - First index is a boolean determining whether or not the system
 *                              is in range. Second index is the lightyear distance or -1 if it is
 *                              not in range.
 */

function inLyRange(systemID, filterIDs, limit) {
    const xDestination = systemData[systemID].x
    const yDestination = systemData[systemID].y
    const zDestination = systemData[systemID].z

    for(let filterID of filterIDs) {
        const xOrigin = systemData[filterID].x
        const yOrigin = systemData[filterID].y
        const zOrigin = systemData[filterID].z
        const distance = Math.sqrt(Math.pow((xOrigin - xDestination), 2)
                                   + Math.pow((yOrigin - yDestination), 2)
                                   + Math.pow((zOrigin - zDestination), 2))/9.461e15
        if(distance <= limit) {
            return [true, distance]
        }
    }
    return [false, -1]
}





