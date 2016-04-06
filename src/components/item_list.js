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
        this.isActive = this.isActive.bind(this)
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
    isActive(killmail) {
      const systemFilter = this.props.system_filter
      const jumpFilter = this.props.jump_filter
      const shipFilter = this.props.filters.ships
      const groupFilter = this.props.filters.groups
      const regionFilter = this.props.filters.regions
      const playerFilter = this.props.filters.player

      // check to make sure killmail is a valid object
      if(!killmail) return false
      // check case where there are no filters
      if(systemFilter.length === 0) return true
      for(let i = 0; i < systemFilter.length; i++) {
        const filter = systemFilter[i]
        // check to see if killmail is in current system (if jumps enabled)
        if(isInteger(filter.jumps) && killmail.system == filter.system) return true
        // check to see if killmail is within light year range (if ly enabled)
        if(isInteger(filter.ly) && inLyRange(killmail.systemID, filter.systemId, filter.ly )) return true
        // check to see if killmail is within stargate jump-range (if jumps enabled)
        if(isInteger(filter.jumps) && jumpFilter.indexOf(killmail.systemID) != -1) return true
        if()
      }
      return false
    }

    render() {
        const items = this.props.killmail_list.map((item) => {
           const active = this.isActive(item)
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

