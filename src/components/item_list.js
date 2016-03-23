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
    }

    render() {
        const items = this.props.killmail_list.map((item) => {
           const active = isActive(item, this.props.system_filter, this.props.jump_filter)
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

function mapStateToProps({ killmail_list, system_filter, jump_filter }) {
    return ({ killmail_list, system_filter, jump_filter })
}

export default connect(mapStateToProps)(ItemList)

/**
 * Determine if this kill should be rendered by the Item List object
 * @param   {object}     killmail     killmail being analyzed
 * @param   {object}     systemFilter filter object specified by the user
 * @param   {Array[Int]} jumpFilter   list of systems within stargate range
 *                                  as specified by the systemFilter
 * @returns {Boolean}    whether or not the killmail is active
 */

function isActive(killmail, systemFilter, jumpFilter) {
  // check case where there are no filters
  if(systemFilter.length === 0) {
    return true
  }
  for(let i = 0; i < systemFilter.length; i++) {
    const filter = systemFilter[i]
    // check to see if killmail is in current system (if jumps enabled)
    if(isInteger(filter.jumps) && killmail.system == filter.system) {
      return true
    }
    // check to see if killmail is within light year range (if ly enabled)
    if(isInteger(filter.ly) && inLyRange(killmail.systemID, filter.systemId, filter.ly )) {
      return true
    }
    // check to see if killmail is within stargate jump-range (if jumps enabled)
    if(isInteger(filter.jumps) && jumpFilter.indexOf(killmail.systemID) != -1) {
      return true
    }
  }
  return false
}

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

