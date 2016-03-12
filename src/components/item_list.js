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
    }

    render() {
      const items = this.props.killmail_list.map((item) => {
         const active = isActive(item, this.props.system_filter)
         return (
             <Item item={ item } />
         )
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
  for(let i = 0; i < systemFilter.length; i++) {
    const filter = systemFilter[i]
    // check to see if killmail is in current system (if jumps enabled)
    if(filter.jumps != '' && killmail.system == filter.system) {
      return true;
    }
    // check to see if killmail is within light year range (if ly enabled)
    if(inLyRange(killmail.systemID, 0, 10 )) {
      return true;
    }
    // check to see if killmail is within stargate jump-range (if jumps enabled)
    if(filter.jumps != '' && killmail.system == filter.system) {
      return true;
    }
  }
  return false;
}


