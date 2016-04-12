import React from 'react';
import { Component } from 'react';
import { connect } from 'react-redux'
import { bindActionCreators } from 'redux'

import Item from '../components/item'

import { inLyRange } from '../functions/system_functions'
import { systemExists } from '../functions/system_functions'

// Returns generic table that holds a list of items. Items are customized at the item object level
class ItemList extends Component {

   constructor(props) {
        super(props)
        this.isActiveAny = this.isActiveAny.bind(this)
    }

      /**
     * Determine if this kill should be rendered by the Item List object
     *  - System
     *  - Jumps From system (lowsec and highsec)
     *  - LY from system
     *  - Region
     *  - Ship Type
     *  - Ship group
     *  - Pilot
     *  - Pilot corporation
     *  - Pilot Alliance
     *  - ISK Value**
     *  - Solo kills**
     *  - Fleet kills**
     *  - Smartbombers**
     *  - Cyno ships**
     *
     * @param   {object}     killmail     killmail being analyzed
     * @param   {object}     systemFilter filter object specified by the user
     * @param   {Array[Int]} jumpFilter   list of systems within stargate range
     *                                  as specified by the systemFilter
     * @returns {Boolean}    whether or not the killmail is active
     *
    *
     */
    isActiveAny(killmail) {
      if(!killmail) return false
      if(testNoFilter(this.props)) return true
      if(this.props.filters.alliances.length > 0 && testAllianceFilter(this.props.filters.alliances, killmail)) return true
      if(this.props.filters.ships.length > 0 && testShipFilter(this.props.filters.ships, killmail)) return true
      if(this.props.filters.groups.length > 0 && testGroupFilter(this.props.filters.groups, killmail)) return true
      if(this.props.system_filter.length > 0 && testSystemFilter(this.props.system_filter, killmail, this.props.jump_filter)) return true
      return false
    }

    isActiveAll(killmail) {
      // match ALL filters
    }

    render() {
        const items = this.props.killmail_list.map((item, index) => {
           const active = this.isActiveAny(item)
           if(active) {
             return (
                 <Item key={ index } item={ item } />
             )
           }
        })

        return (
          <table className={ this.props.name }>
              <tbody>
              { items }
              </tbody>
          </table>
        )

    }
}

function mapStateToProps({ killmail_list, system_filter, jump_filter, filters }) {
    return ({ killmail_list, system_filter, jump_filter, filters })
}

export default connect(mapStateToProps)(ItemList)



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

/**
 * Check to see if there are no applied filters
 * @param   {object}   props - container object properties
 * @returns {Boolean} if there are any filters being applied
 */

function testNoFilter(props) {
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

function testSystemFilter(systemFilter, killmail, jumpFilter) {
    for(let i in systemFilter) {
      const filter = systemFilter[i]
      if(filter.jumps === 0 && killmail.system == filter.system) return true
      if(isInteger(filter.ly) && inLyRange(killmail.systemID, filter.systemId, filter.ly )) return true
      if(isInteger(filter.jumps) && jumpFilter.indexOf(killmail.systemID) !== -1) return true
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

function testShipFilter(shipFilter, killmail) {
   for(let i in shipFilter) {
      const status = shipFilter[i].status
      if((status == 'both' || status == 'victim') && (killmail.shipID == shipFilter[i].id)) return true // victim match
      if(status == 'both' || status == 'attacker') {
        for(let j in killmail.attackerShips) if(killmail.attackerShips[j] == shipFilter[i].id) return true // attacker match
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

function testGroupFilter(groupFilter, killmail) {
   for(let i in groupFilter) {
      const status = groupFilter[i].status
      const shipID = groups[groupFilter[i].name]
      if((status == 'both' || status == 'victim') && shipID.indexOf(killmail.shipID) !== -1) return true // victim match
      if(status == 'both' || status == 'attacker') {
        for(let j in killmail.attackerShips) if(shipID.indexOf(killmail.attackerShips[j]) !== -1) return true // attacker match
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
function testAllianceFilter(allianceFilter, killmail) {
    for(let i in allianceFilter) {
        const status = allianceFilter[i].status
        if ((status == 'both' || status == 'victim') && (killmail.victimGroupID == allianceFilter[i].id)) return true // victim match
        if ((status == 'both' || status == 'attacker') && (killmail.attackerAllianceIDs.indexOf(parseInt(allianceFilter[i].id)) !== -1)) return true
    }
}

function testRegionFilter() {

}
