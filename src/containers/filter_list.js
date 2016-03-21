import React, { Component } from 'react'
import { connect } from 'react-redux'
import { bindActionCreators } from 'redux'
import { createSystemFilter } from '../actions/actions'
import { modifySystemFilter } from '../actions/actions'
import { deleteSystemFilter } from '../actions/actions'

import Item from '../components/item'
import SystemFilter from '../containers/system_filter'
import AddFilter from '../components/add_filter'

class FilterList extends Component {

    constructor(props) {
        super(props);
        this.addSystemFilter = this.addSystemFilter.bind(this)
        this.editSystemFilter = this.editSystemFilter.bind(this)
        this.removeSystemFilter = this.removeSystemFilter.bind(this)
    }

    addSystemFilter(keyPair) {
      this.props.createSystemFilter(keyPair[1], keyPair[0], 0, '')
    }

    editSystemFilter(system, systemId, key, value) {
      console.log(system, systemId, key, value)
      this.props.modifySystemFilter(system, systemId, key, value)
    }

    removeSystemFilter(system, component) {
      this.props.deleteSystemFilter(system)
    }


    render() {
      const items = this.props.system_filter.map((item) => {
           console.log('Rendering: ', item)
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
        return (
          <div>
              <AddFilter createSystemFilter={ this.addSystemFilter } />
              <table className={ this.props.name }>
                  <tbody>
                  { items }
                  </tbody>
              </table>
          </div>

        )
    }
}

function mapStateToProps({ system_filter }) {
    return { system_filter }
}

function mapDispatchToProps(dispatch) {
    return bindActionCreators({ createSystemFilter, modifySystemFilter, deleteSystemFilter }, dispatch)
}

export default connect(mapStateToProps, mapDispatchToProps)(FilterList)
