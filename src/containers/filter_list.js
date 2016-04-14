import React, { Component } from 'react'
import { connect } from 'react-redux'
import { bindActionCreators } from 'redux'
import { createSystemFilter } from '../actions/actions'
import { updateSystemFilter } from '../actions/actions'
import { deleteSystemFilter } from '../actions/actions'
import { deleteFilter } from '../actions/actions'
import { updateFilter } from '../actions/actions'
import { incrementFilterID } from '../actions/actions'
import { filterKillmails } from '../actions/actions'

import Item from '../components/item'
import Filter from '../components/filter'
import SystemFilter from './system_filter'
import SearchFilter from './search_filter'

class FilterList extends Component {

    constructor(props) {
        super(props);
        this.editSystemFilter = this.editSystemFilter.bind(this)
        this.createFilterObjects = this.createFilterObjects.bind(this)
        this.removeSystemFilter = this.removeSystemFilter.bind(this)
        this.updateFilter = this.updateFilter.bind(this)
        this.removeFilter = this.removeFilter.bind(this)
    }

    editSystemFilter(system, systemId, key, value) {
        this.props.incrementFilterID()
        this.props.updateSystemFilter(system, systemId, key, value, this.props.system_filter, this.props.filterID)
        this.props.filterKillmails(this.props)
    }

    removeSystemFilter(system) {
        this.props.deleteSystemFilter(system, this.props.system_filter)
        this.props.filterKillmails(this.props)
    }

    removeFilter(filterName, filterType) {
        this.props.deleteFilter(filterName, filterType)
        this.props.filterKillmails(this.props)
    }

    updateFilter(filterName, filterType, filterStatus) {
        this.props.incrementFilterID()
        this.props.updateFilter(filterName, filterType, filterStatus, this.props.filterID)
        this.props.filterKillmails(this.props)
    }

    createFilterObjects(filter, type) {
        if(filter) {
            return filter.map((object, index) => {
                return (
                    <Filter
                        type={ type }
                        filterID={ object.filterID }
                        id={ object.id }
                        key= { index }
                        name={ object.name }
                        status={ object.status }
                        removeFilter={ this.removeFilter }
                        updateFilter={ this.updateFilter }
                    />
                )
            });
        }
        else return []
    }

    render() {
       let systemFilters = []
        if(this.props.system_filter) {
          systemFilters = this.props.system_filter.map((object, index) => {
               return (
                   <SystemFilter
                       key = { index }
                       systemName={ object.system }
                       systemId={ object.systemId }
                       filterID={ object.filterID }
                       jumps={ object.jumps }
                       ly={ object.ly }
                       editSystemFilter={ this.editSystemFilter }
                       removeSystemFilter={ this.removeSystemFilter }
                    />
               )
            });
        }

        return (
          <div className="filter-containers">
              <SearchFilter  />
              <table className={ this.props.name }>
                  <tbody>
                  { systemFilters }
                  </tbody>
              </table>
              <div className="alliance-filter">{ this.createFilterObjects(this.props.filters.alliances, 'alliance') }</div>
              <div className="ship-filter"> { this.createFilterObjects(this.props.filters.ships, 'ship') } </div>
              <div className="group-filter"> { this.createFilterObjects(this.props.filters.groups, 'group') } </div>
              <div className="region-filter"> { this.createFilterObjects(this.props.filters.regions, 'region') } </div>
          </div>
        )
    }
}

function mapStateToProps({ killmail_list, system_filter, filters, filterID }) {
    return { killmail_list, system_filter, filters, filterID }
}

function mapDispatchToProps(dispatch) {
    return bindActionCreators({ createSystemFilter, updateSystemFilter, deleteSystemFilter, updateFilter, deleteFilter,
        incrementFilterID, filterKillmails }, dispatch)
}

export default connect(mapStateToProps, mapDispatchToProps)(FilterList)
