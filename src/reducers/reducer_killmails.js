import { GET_KILLMAIL } from '../actions/actions'
import { SET_KILLMAIL_FILTERID } from '../actions/actions'
import _ from 'lodash'

import { getJumpRange } from '../functions/system_functions'

export default function(state = [], action) {
    switch (action.type) {
        case GET_KILLMAIL:
            if(action.payload.data.package == null) return state // see if any new killmails have arrived

            const kill = action.payload.data.package.killmail
            const shipID = kill.victim.shipType.id
            const systemID = kill.solarSystem.id
            const victimInfo = getVictimInfo(kill.victim)
            const attackerAllianceInfo = getAttackerAlliance(kill.attackers)
            if(isValid(shipID,systemID)) {
                const killmail = [{
                    killID: kill.killID,
                    shipID: shipID,
                    shipName: shipdata[shipID].shipname,
                    systemID: systemID,
                    system: systemData[systemID].name,
                    security: Math.round(systemData[systemID].security * 10) / 10,
                    victimName: victimInfo[0],
                    victimCorp: victimInfo[1],
                    victimGroupID: victimInfo[2],
                    attackerCount: kill.attackerCount,
                    attackerShips: getAttackerShips(kill.attackers),
                    attackerAlliance: attackerAllianceInfo[0],
                    attackerAllianceIDs: attackerAllianceInfo[1],
                    time:  kill.killTime.substring(10,16),
                    passedFilters: []
                }]
                updateLocalStore(killmail)
                return killmail.concat(state) // concatanate killmails to the beginning of array
            }
            return state


    }
    return state
}

/**
 * Generate victim information from killmail
 * @param victim - victim object from killmail
 * @returns {array} Index 0: Name of victim
 *                Index 1: Victim's alliance if it exists, victim's corporation if not
 *                Index 2: Type ID corresponding to the victimGroup
 */
function getVictimInfo(victim) {
    let victimName = 'Unknown'
    if(victim.character) victimName = victim.character.name
    // victim group chooses alliance if it exists, corporation if not
    let victimGroup = victim.corporation.name
    let victimGroupID = victim.corporation.id
    if(victim.alliance) {
        victimGroup = victim.alliance.name
        victimGroupID = victim.alliance.id
    }
    return [victimName, victimGroup, victimGroupID]
}
/**
 * Update the local storage that holds processed killmails. If the store is over a specified amount of kills
 * remove the last element to stay at that limit
 * @param killmails {array} - array of killmail objects
 */
function updateLocalStore(killmails) {
    let localStore = JSON.parse(localStorage.getItem('killmails'))
    if(localStore == null) localStore = []

    if(localStore.length >= 1000) localStorage.setItem('killmails', JSON.stringify(killmails.concat(localStore.slice(0, -1))))
    else localStorage.setItem('killmails', JSON.stringify(killmails.concat(localStore)))
    localStorage.setItem('updateTime', new Date)
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
 * @param   {array} attackers - attacker object from zkill killmail
 * @returns {array} Index 0: most occuring alliance on the killmail
 *                  Index 1: array of alliance type ids that were involved on the kill
 */
function getAttackerAlliance(attackers) {
  let allianceCount = {}
  let allianceIDs = []
  for(let i in attackers) {
    const attacker = attackers[i]
    if(attacker.alliance) {
      if(!(attacker.alliance.name in allianceCount)) {
          allianceCount[attacker.alliance.name] = 1
          allianceIDs.push(attacker.alliance.id)
      }
      else allianceCount[attacker.alliance.name]++
    }
  }
  let alliance = _.max(Object.keys(allianceCount), function (o) { return allianceCount[o]; });
  if(alliance == -Infinity) alliance = getAttackerCorporation(attackers)
  return [alliance, allianceIDs]
}

/**
 * Given a list of attackers iterate through and find the most common corporation
 * @param   {array} attackers - attacker object from zkill killmail
 * @returns {String} most occuring corporation on the killmail
 */
function getAttackerCorporation(attackers) {
    let corpCount = {}
    for(let i in attackers) {
        const attacker = attackers[i]
        if(attacker.corporation) {
            if(corpCount[attacker.corporation]) corpCount[attacker.corporation.name]++
            else corpCount[attacker.corporation.name] = 1
        }
    }
    let corporation = _.max(Object.keys(corpCount), function (o) { return corpCount[o]; })
    if(corporation == -Infinity) corporation = 'Unknown'
    return corporation
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





