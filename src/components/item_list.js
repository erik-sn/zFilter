import React from 'react';
import { Component } from 'react';
import { connect } from 'react-redux'
import { bindActionCreators } from 'redux'

import Item from '../components/item'

import { inLyRange } from '../functions/system_functions'
import { getSystemID } from '../functions/system_functions'
import { systemExists } from '../functions/system_functions'
import { getJumpRange } from '../functions/system_functions'

// Returns generic table that holds a list of items. Items are customized at the item object level
class ItemList extends Component {

   constructor(props) {
        super(props)
    }

    render() {
      const items = this.props.killmail_list.map((item) => {
         const active = isActive(item, this.props.system_filter)
         if(active) {
           return (
               <Item item={ item } />
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

function mapStateToProps({ killmail_list, system_filter }) {
    return { killmail_list, system_filter }
}

export default connect(mapStateToProps)(ItemList)


function isActive(killmail, systemFilter) {
  // check case where there are no filters
  if(systemFilter.length === 0) {
    return true
  }
  for(let i = 0; i < systemFilter.length; i++) {
    const filter = systemFilter[i]
    // check to see if killmail is in current system (if jumps enabled)
    if(isInteger(filter.jumps) && killmail.system == filter.system) {
      console.log('Included by JUMPS_0: ', filter.system, ' - ', killmail.victimName)
      return true
    }
    // check to see if killmail is within light year range (if ly enabled)
    if(isInteger(filter.ly) && inLyRange(killmail.systemID, filter.systemId, filter.ly )) {
      console.log('Included by LY_' + filter.ly + ':', filter.system, ' - ', killmail.victimName)
      return true
    }
    // check to see if killmail is within stargate jump-range (if jumps enabled)
    if(isInteger(filter.jumps)) {
      console.log('Included by JUMPS: ', filter.system, ' - ', killmail.victimName)
      return false
    }
  }
  return false
}

function isInteger(input) {
    if (input == parseInt(input, 10)) {
       return true;
    }
    return false;
}

