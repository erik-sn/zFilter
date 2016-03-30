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

        let allianceFilters = []
        if(this.props.pilot_filter) {
          allianceFilters = this.props.pilot_filter.alliances.map((allianceFilter) => {
             return (
                 <Filter
                     key = { allianceFilter.id}
                     name={ allianceFilter.name }
                     id={ allianceFilter.id }
                  />
             )
          });
        }

        let corporationFilters = []
        if(this.props.pilot_filter) {
          corporationFilters = this.props.pilot_filter.corporations.map((corporationFilter) => {
             return (
                 <Filter
                     key = { corporationFilter.id}
                     name={ corporationFilter.name }
                     id={ corporationFilter.id }
                  />
             )
          });
        }

        let pilotFilters = []
        if(this.props.pilot_filter) {
          pilotFilters = this.props.pilot_filter.pilots.map((pilotFilter) => {
             console.log('Pilot: ', pilotFilter)
             return (
                 <Filter
                     key = { pilotFilter.id}
                     name={ pilotFilter.name }
                     id={ pilotFilter.id }
                  />
             )
          });
        }
        return (
          <div>
              <SearchFilter  />
              <table className={ this.props.name }>
                  <tbody>
                  { systemFilters }
                  </tbody>
              </table>
              <div className="alliance-filter">{ allianceFilters }</div>
              <div className="corporation-filter"> { corporationFilters } </div>
              <div className="pilot-filter"> { pilotFilters } </div>

          </div>

        )
    }
}

function mapStateToProps({ system_filter, pilot_filter }) {
    console.log('Pilot Filter: ', pilot_filter)
    return { system_filter, pilot_filter }
}

function mapDispatchToProps(dispatch) {
    return bindActionCreators({ createSystemFilter, modifySystemFilter, deleteSystemFilter }, dispatch)
}

export default connect(mapStateToProps, mapDispatchToProps)(FilterList)
