import { GET_KILLMAIL } from '../actions/actions'
import { GET_KILLMAIL_REDIS } from '../actions/actions'
import _ from 'lodash'

import { getJumpRange } from '../functions/system_functions'

export default function(state = [], action) {
    switch (action.type) {
        case GET_KILLMAIL:
            if(action.payload.data.package == null) return state

            let killmails = []
            const kill = action.payload.data.package.killmail
            const shipID = kill.victim.shipType.id
            const systemID = kill.solarSystem.id
            const security = Math.round(systemData[systemID].security * 10) / 10
            const time = kill.killTime.substring(10,16)


            if(isValid(shipID, systemID)) {
                const killmail = {
                    killID: kill.killID,
                    shipID: shipID,
                    shipName: shipdata[shipID].shipname,
                    systemID: systemID,
                    system: systemData[systemID].name,
                    security: security,
                    victimName: kill.victim.character.name,
                    victimCorp: kill.victim.corporation.name,
                    shipTypeID: shipID,
                    attackerCount: kill.attackerCount,
                    attackerAlliance: getAttackerAlliance(kill.attackers),
                    time: time
                }
                killmails.push(killmail)
            }
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
 * Given a list of attackers iterate through and find the most common alliance
 * @param   {array} attackers [[Description]]
 * @returns {String} most occuring alliance on the killmail
 */

function getAttackerAlliance(attackers) {
  let allianceCount = {}
  for(let i in attackers) {
    let attacker = attackers[i]
    if(allianceCount[attacker.alliance.name]) allianceCount[attacker.alliance.name]++
    else allianceCount[attacker.alliance.name] = 1
  }
  return _.max(Object.keys(allianceCount), function (o) { return allianceCount[o]; });
}







