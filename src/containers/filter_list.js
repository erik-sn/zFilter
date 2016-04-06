import React, { Component } from 'react'
import { connect } from 'react-redux'
import { bindActionCreators } from 'redux'
import { createSystemFilter } from '../actions/actions'
import { modifySystemFilter } from '../actions/actions'
import { deleteSystemFilter } from '../actions/actions'

import Item from '../components/item'
import Filter from '../containers/filter'
import SystemFilter from '../containers/system_filter'
import SearchFilter from '../components/search_filter'

class FilterList extends Component {

    constructor(props) {
        super(props);
        this.editSystemFilter = this.editSystemFilter.bind(this)
        this.removeSystemFilter = this.removeSystemFilter.bind(this)
    }

    editSystemFilter(system, systemId, key, value) {
      this.props.modifySystemFilter(system, systemId, key, value, this.props.system_filter)
    }

    removeSystemFilter(system, component) {
      this.props.deleteSystemFilter(system, this.props.system_filter)
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

        let playerFilters = []
        if(this.props.filters) {
          playerFilters = this.props.filters.player.map((player, index) => {
             return (
                 <Filter
                     type="player"
                     key= { index }
                     name={ player.name }
                  />
             )
          });
        }

        let shipFilters = []
        if(this.props.filters) {
          shipFilters = this.props.filters.ships.map((ship) => {
             return (
                 <Filter
                     type="ship"
                     key={ ship.id}
                     name={ ship.name }
                     id={ ship.id }
                  />
             )
          });
        }

        let groupFilters = []
        if(this.props.filters) {
          groupFilters = this.props.filters.groups.map((group) => {
             return (
                 <Filter
                     type="group"
                     key={ group.id }
                     name={ group.name }
                     id={ group.id }
                  />
             )
          });
        }

        let regionFilters = []
        if(this.props.filters) {
          regionFilters = this.props.filters.regions.map((regionFilter) => {
             return (
                 <Filter
                     type="region"
                     key={ regionFilter.id}
                     name={ regionFilter.name }
                     id={ regionFilter.id }
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
              <div className="player-filter">{ playerFilters }</div>
              <div className="ship-filter"> { shipFilters } </div>
              <div className="group-filter"> { groupFilters } </div>
              <div className="region-filter"> { regionFilters } </div>
          </div>

        )
    }
}

function mapStateToProps({ system_filter, filters }) {
    return { system_filter, filters }
}

function mapDispatchToProps(dispatch) {
    return bindActionCreators({ createSystemFilter, modifySystemFilter, deleteSystemFilter }, dispatch)
}

export default connect(mapStateToProps, mapDispatchToProps)(FilterList)
