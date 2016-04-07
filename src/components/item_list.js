import React from 'react';
import { Component } from 'react';
import { connect } from 'react-redux'
import { bindActionCreators } from 'redux'

import Item from '../components/item'

import { inLyRange } from '../functions/system_functions'
import { getSystemID } from '../functions/system_functions'
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
     *  - Ship TYpe
     *  - Ship group
     *  - Pilot
     *  - Pilot corporation
     *  - Pilot Alliance
     *  - ISK Value
     *  - Solo kills
     *  - Fleet kills
     *  - Smartbombers
     *  - Cyno ships
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
      if(this.props.filters.ships.length > 0 && testShipFilter(this.props.filters.ships, killmail, 'both')) return true
      if(this.props.filters.groups.length > 0 && testShipFilter(this.props.filters.groups, killmail, 'both')) return true
      if(this.props.system_filter.length > 0 && testSystemFilter(this.props.system_filter, killmail)) return true
      return false
    }

    isActiveAll(killmail) {
      // match ALL filters
    }

    render() {
        const items = this.props.killmail_list.map((item) => {
           const active = this.isActiveAny(item)
           if(active) {
             return (
                 <Item key={ item.killID } item={ item } />
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
    if (input == parseInt(input, 10)) {
       return true;
    }
    return false;
}

function testNoFilter(props) {
      if(props.system_filter.length === 0 &&
         props.filters.ships.length === 0 &&
         props.filters.player.length === 0 &&
         props.filters.groups.length === 0 &&
         props.filters.regions.length === 0) return true
      return false
}

function testSystemFilter(systemFilter, killmail) {
    for(let i in systemFilter) {
      const filter = systemFilter[i]
      if(isInteger(filter.jumps) && killmail.system != filter.system) return true
      if(isInteger(filter.ly) && inLyRange(killmail.systemID, filter.systemId, filter.ly )) return true
      if(isInteger(filter.jumps) && jumpFilter.indexOf(killmail.systemID) !== -1) return true
    }
    return false
}

function testShipFilter(shipFilter, killmail, status) {
   for(let i in shipFilter) {
      if((status == 'both' || status == 'victim') && (killmail.shipID == shipFilter[i].id)) return true // victim match
      if(status == 'both' || status == 'attacker') {
        for(let j in killmail.attackerShips) if(killmail.attackerShips[j] == shipFilter[i].id) return true // attacker match
      }
   }
   return false
}

function testGroupFilter(groupFilter, killmail, status) {
   for(let shipID in groupFilter.ships) {
      if((status == 'both' || status == 'victim') && (killmail.shipID == shipID)) return true // victim match
      if(status == 'both' || status == 'attacker') {
        for(let j in killmail.attackerShips) if(killmail.attackerShips[j] == shipID) return true // attacker match
      }
   }
   return false
}
