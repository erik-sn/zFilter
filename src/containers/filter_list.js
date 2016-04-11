import React, { Component } from 'react'
import { connect } from 'react-redux'
import { bindActionCreators } from 'redux'
import { createSystemFilter } from '../actions/actions'
import { updateSystemFilter } from '../actions/actions'
import { deleteSystemFilter } from '../actions/actions'
import { deleteFilter } from '../actions/actions'
import { updateFilter } from '../actions/actions'

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
        this.removeFilter = this.removeFilter.bind(this)
    }

    editSystemFilter(system, systemId, key, value) {
      this.props.modifySystemFilter(system, systemId, key, value, this.props.system_filter)
    }

    removeSystemFilter(system) {
      this.props.deleteSystemFilter(system, this.props.system_filter)
    }

    removeFilter(filterName, filterType) {
      console.log('Removing: ' + filterName)
      this.props.deleteFilter(filterName, filterType)
    }

    createFilterObjects(filter, type) {
        console.log(filter)
        if(filter) {
            return filter.map((object, index) => {
                return (
                    <Filter
                        type={ type }
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
          systemFilters = this.props.system_filter.map((item) => {
               return (
                   <SystemFilter
                       key = { item.systemId}
                       systemName={ item.system }
                       systemId={ item.systemId }
                       jumps={ item.jumps }
                       ly={ item.ly }
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
              <div className="player-filter">{ this.createFilterObjects(this.props.filters.player, 'player') }</div>
              <div className="ship-filter"> { this.createFilterObjects(this.props.filters.ships, 'ship') } </div>
              <div className="group-filter"> { this.createFilterObjects(this.props.filters.groups, 'group') } </div>
              <div className="region-filter"> { this.createFilterObjects(this.props.filters.regions, 'region') } </div>
          </div>

        )
    }
}

function mapStateToProps({ system_filter, filters }) {
    return { system_filter, filters }
}

function mapDispatchToProps(dispatch) {
    return bindActionCreators({ createSystemFilter, updateSystemFilter, deleteSystemFilter, updateFilter, deleteFilter }, dispatch)
}

export default connect(mapStateToProps, mapDispatchToProps)(FilterList)
