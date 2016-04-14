import React, { Component } from 'react'

import { FILTER_KILLMAILS } from '../actions/actions'
import { INITIALIZE_KILLMAILS } from '../actions/actions'

export default function(state = [], action) {
    switch (action.type) {

        case FILTER_KILLMAILS:
            if(action.payload.props == null || evaluateNoFilters(action.payload.props)) return action.payload.killmails

            return action.payload.killmails.filter((killmail) => {
                console.log('Filtering killmails')
                 return isActiveAny(killmail, action.payload.props)
            })

        case INITIALIZE_KILLMAILS:
            return JSON.parse(action.payload)

    }
    return state
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

function isActiveAny(killmail, props) {
    if(!killmail) return false
    const regionEvaluate = evaluateRegionFilter(props.filters.regions, killmail)
    if(props.filters.regions.length > 0 && regionEvaluate) return regionEvaluate
    const groupEvaluate =  evaluateGroupFilter(props.filters.groups, killmail)
    if(props.filters.groups.length > 0 && groupEvaluate) return groupEvaluate
    const shipEvaluate = evaluateShipFilter(props.filters.ships, killmail)
    if(props.filters.ships.length > 0 && shipEvaluate) return shipEvaluate
    const allianceEvaluate = evaluateAllianceFilter(props.filters.alliances, killmail)
    if(props.filters.alliances.length > 0 && allianceEvaluate) return allianceEvaluate
    const systemEvaluate = evaluateSystemFilter(props.system_filter, killmail, props.jump_filter)
    if(props.system_filter.length > 0 && systemEvaluate) return systemEvaluate
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
        if(filter.jumps === 0 && killmail.system == filter.system) return filter.filterID
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
