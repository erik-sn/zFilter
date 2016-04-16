import _ from 'lodash'

import { GET_KILLMAIL } from '../actions/actions'
import { INITIALIZE_KILLMAILS } from '../actions/actions'
import { FILTER_KILLMAILS } from '../actions/actions'

import { inLyRange } from '../functions/system_functions'

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
                    passedFilters: [],
                    active: isActiveAny(this, action.meta.props, [])
                }]
                updateLocalStore(killmail) // this is a side effect, need to refactor
                return killmail.concat(state) // concatanate killmails to the beginning of array
            }
            return state

        case INITIALIZE_KILLMAILS:
            return setAllActive(JSON.parse(action.payload))

        case FILTER_KILLMAILS:
            const props = action.payload.props
            if(evaluateNoFilters(props)) {
                return setAllActive(props.killmail_list)
            }

            console.time('Total')
            const filterIDs = getActiveFilterIDs(props)
            console.log(filterIDs)
            const killmails = props.killmail_list.map((killmail) => {
                let passedFilter = isActiveAny(killmail, props, filterIDs)
                if(passedFilter) {
                    killmail.active = true
                    killmail.passedFilters.push(passedFilter)
                }
                else killmail.active = false
                return killmail
            })

            console.timeEnd('Total')
            return killmails

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

    if(localStore.length >= 1000) {
        localStorage.setItem('killmails', JSON.stringify(killmails.concat(localStore.slice(0, -1))))
    }
    else localStorage.setItem('killmails', JSON.stringify(killmails.concat(localStore)))
    localStorage.setItem('updateTime', new Date)
}

/**
 * Take in a list of killmails and set all of them active
 * @param killmails - array of killmail objects
 * @returns {*}
 */
function setAllActive(killmails) {
    return killmails.map((killmail) => {
        killmail.active = true
        return killmail
    })
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


/**
 * Determine if the input is an integer - used to test user inputs
 * @param   {Unknown} input field being tested
 * @returns {Boolean}  if the input is an integer or can be converted
 *                     to an integer
 */
function isInteger(input) {
    if (input == parseInt(input, 10)) return true
    return false
}

// gatecamps
// time
function isActiveAny(killmail, props, filterIDs) {
    //console.time('evaluateExistingFilter')
    if(evaluateExistingFilter(killmail, filterIDs)) return true
    //console.timeEnd('evaluateExistingFilter')

    if(evaluateNoFilters(props)) return true
    if(!killmail) return false

    //console.time('evaluateGroupFilter')
    const groupEvaluate =  evaluateGroupFilter(props.filters.groups, killmail)
    //console.timeEnd('evaluateGroupFilter')
    if(props.filters.groups.length > 0 && groupEvaluate) return groupEvaluate

    //console.time('evaluateShipFilter')
    const shipEvaluate = evaluateShipFilter(props.filters.ships, killmail)
    //console.timeEnd('evaluateShipFilter')
    if(props.filters.ships.length > 0 && shipEvaluate) return shipEvaluate

    //console.time('evaluateAllianceFilter')
    const allianceEvaluate = evaluateAllianceFilter(props.filters.alliances, killmail)
    //console.timeEnd('evaluateAllianceFilter')
    if(props.filters.alliances.length > 0 && allianceEvaluate) return allianceEvaluate

    //console.time('evaluateSystemFilter')
    const systemEvaluate = evaluateSystemFilter(props.system_filter, killmail, props.jump_filter)
    //console.timeEnd('evaluateSystemFilter')
    if(props.system_filter.length > 0 && systemEvaluate) return systemEvaluate

    //console.time('evaluateRegionFilter')
    const regionEvaluate = evaluateRegionFilter(props.filters.regions, killmail)
    //console.timeEnd('evaluateRegionFilter')
    if(props.filters.regions.length > 0 && regionEvaluate) return regionEvaluate
    return false
}

/**
 * Find the intersection between the passedFilters variable on a killmail and the
 * list of filter ids in the Redux store. If an intersection exists then the killmail
 * will be allowed to pass filters without re-checking it.
 * @param killmail - killmail object
 * @param filterIDs - filter IDs of all filters in the redux store
 * @returns {boolean} - whether or not the killmail has already passed this filter
 */
function evaluateExistingFilter(killmail, filterIDs ) {
    //if(killmail.passedFilters.length > 0) console.log(killmail.passedFilters)
    const intersection = filterIDs.filter((n) => {
        return killmail.passedFilters.indexOf(n) != -1
    })
    if(intersection.length > 0 ) {
        console.log('Bypassing ')
        return true
    }
    return false
}

/**
 * Check to see if there are no applied filters
 * @param   {object}   props - container object properties
 * @returns {Boolean} if there are any filters being applied
 */
function evaluateNoFilters(props) {
    if(props.system_filter.length === 0 &&
        props.filters.ships.length === 0 &&
        props.filters.alliances.length === 0 &&
        props.filters.groups.length === 0 &&
        props.filters.regions.length === 0) return true
    return false
}

/**
 * Iterate over all system filters and see if the killmail matches one of the following:
 *   1. In a system specified
 *   2. Within the user specified LY distance (if specified)
 *   3. Within the user specified jump distance (if specified)
 * @param   {object}  systemFilter list of filter objects that contain systems and their jump ranges
 * @param   {object}  killmail     killmail object from reducer
 * @param   {object}  jumpFilter   object with all systems within the user specified systems and jump ranges
 * @returns {Boolean} if the killmail matches the user specified system requirements
 */
function evaluateSystemFilter(systemFilter, killmail, jumpFilter) {
    for(let i in systemFilter) {
        const filter = systemFilter[i]
        if((filter.jumps === 0 || filter.jumps == '') && killmail.system == filter.system) return filter.filterID
        if(isInteger(filter.ly) && inLyRange(killmail.systemID, filter.systemId, filter.ly )) return filter.filterID
        if(isInteger(filter.jumps) && jumpFilter.indexOf(killmail.systemID) !== -1) return filter.filterID
    }
    return false
}

/**
 * Iterate over all ship filters and test if the killmail matches any of them. The status
 * can be used to further filter to show only victims, only attackers or both.
 * @param   {object}   shipFilter object representing a collection of ships
 * @param   {object}   killmail   killmail object from reducer
 * @param   {String}   status     'both', 'victim', or 'attacker'
 * @returns {Boolean} if the killmail matches a ship filter
 */
function evaluateShipFilter(shipFilter, killmail) {
    for(let i in shipFilter) {
        const status = shipFilter[i].status
        if((status == 'both' || status == 'victim') && (killmail.shipID == shipFilter[i].id)) return shipFilter[i].filterID // victim match
        if(status == 'both' || status == 'attacker') {
            for(let j in killmail.attackerShips) if(killmail.attackerShips[j] == shipFilter[i].id) return shipFilter[i].filterID // attacker match
        }
    }
    return false
}

/**
 * Iterate over all group filters and test if the killmail matches any of them. The status
 * can be used to further filter to show only victims, only attackers or both.
 *
 * -- Need to refactor this and testShipFilter into one method
 *
 * @param   {object}   groupFilter object representing a collection of ship groups
 * @param   {object}   killmail    killmail object from reducer
 * @param   {String}   status      'both, 'victim', or 'attacker'
 * @returns {Boolean}   if the killmail matches any group filter
 */
function evaluateGroupFilter(groupFilter, killmail) {
    for(let i in groupFilter) {
        const status = groupFilter[i].status
        const shipID = groups[groupFilter[i].name]
        if((status == 'both' || status == 'victim') && shipID.indexOf(killmail.shipID) !== -1) return groupFilter[i].filterID // victim match
        if(status == 'both' || status == 'attacker') {
            for(let j in killmail.attackerShips) if(shipID.indexOf(killmail.attackerShips[j]) !== -1) return groupFilter[i].filterID // attacker match
        }
    }
    return false
}

/**
 * Iterate over all alliance filters and test if the killmail matches any of them.
 * @param allianceFilter
 * @param killmail - killmail object from reducer
 * @returns {boolean} - if the killmail matches any alliance filter
 */
function evaluateAllianceFilter(allianceFilter, killmail) {
    for(let i in allianceFilter) {
        const status = allianceFilter[i].status
        if ((status == 'both' || status == 'victim') && (killmail.victimGroupID == allianceFilter[i].id)) return allianceFilter[i].filterID // victim match
        if ((status == 'both' || status == 'attacker') && (killmail.attackerAllianceIDs.indexOf(parseInt(allianceFilter[i].id)) !== -1)) return allianceFilter[i].filterID
    }
    return false
}

/**
 * Iterate over all region filters and test if the killmail matches any of them.
 * @param regionFilter - array of regions to filter against
 * @param killmail - killmail object from reducer
 * @returns {boolean} - if the killmail matches any region filter
 */
function evaluateRegionFilter(regionFilter, killmail) {
    for(let i in regionFilter) {
        for(let j in systems) {
            if(systems[j].typeID == killmail.systemID && systems[j].region == regionFilter[i].id)  return regionFilter[i].filterID
        }
    }
    return false
}

/**
 * Consolidate all filterIDs from the filter object into an array of integers
 * @param props - Redux state
 * @returns {Array} - Array of integers
 */
function getActiveFilterIDs(props) {
    let filterIDs = []
    filterIDs = props.system_filter.map((system_filter) => {
        return system_filter.filterID
    }).concat(filterIDs)

    for (let filter in props.filters) {
        filterIDs = props.filters[filter].map((filter) => {
            return filter.filterID
        }).concat(filterIDs)
    }
    return filterIDs
}

