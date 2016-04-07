import { GET_KILLMAIL } from '../actions/actions'
import { INITIALIZE_KILLMAILS } from '../actions/actions'
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
                    attackerCount: kill.attackerCount,
                    attackerShips: getAttackerShips(kill.attackers),
                    attackerAlliance: getAttackerAlliance(kill.attackers),
                    time: time
                }
//                console.log(killmail)
                killmails.push(killmail)
                let localStore = JSON.parse(localStorage.getItem('killmails'))
                if(localStore == null) localStore = []

                if(localStore.length >= 1000) localStorage.setItem('killmails', JSON.stringify(killmails.concat(localStore.slice(0, -1))))
                else localStorage.setItem('killmails', JSON.stringify(killmails.concat(localStore)))
                localStorage.setItem('updateTime', new Date)

            }
            return killmails.concat(state) // concatanate killmails to the beginning of array

        case INITIALIZE_KILLMAILS:
          return JSON.parse(action.payload)

    }
    return state
}

/**
 * Check to make sure this killmail is valid; no pods, shuttles or rookie ships
 * @param   {integer} shipID   - Type ID of the ship
 * @param   {integer} systemID - Type ID of the system
 * @returns {boolean}   - Whether or not the killmail is valid
 */

function isValid(shipID, systemID) {
    if(shipID == 670 || shipID == 33328) return false // ignore pods
    if(groups.RookieShips.indexOf(shipID) != -1) return false // ignore rookie ships
    if(groups.Shuttles.indexOf(shipID) != -1) return false // ignore shuttles
    if(!shipdata[shipID] || !systemData[systemID]) return false // if we do not have the system on record
    return true
}

/**
 * Given a list of attackers iterate through and find the most common alliance
 * @param   {array} attackers [[Description]]
 * @returns {String} most occuring alliance on the killmail
 */

function getAttackerAlliance(attackers) {
  let allianceCount = {}
  for(let i in attackers) {
    const attacker = attackers[i]
    if(attacker.alliance) {
      if(allianceCount[attacker.alliance]) allianceCount[attacker.alliance.name]++
      else allianceCount[attacker.alliance.name] = 1
    }
  }
  return _.max(Object.keys(allianceCount), function (o) { return allianceCount[o]; });
}

/**
 * Return an array of type IDs that correspond to the attacker ships from a killmail
 * @param   {array} attackers array of attackers from the killmail object
 * @returns {array} list of type ids
 */

function getAttackerShips(attackers) {
  let attackerShips = []
  for(let i in attackers) if(attackers[i].shipType) attackerShips.push(attackers[i].shipType.id)
  return attackerShips
}






