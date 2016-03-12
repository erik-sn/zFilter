import React, { Component } from 'react'
import { connect } from 'react-redux'
import { bindActionCreators } from 'redux'
import { createSystemFilter } from '../actions/actions'

import Item from '../components/item'
import SystemFilter from '../containers/system_filter'
import AddFilter from '../components/add_filter'

class FilterList extends Component {

    constructor(props) {
        super(props);
        this.addSystemFilter = this.addSystemFilter.bind(this)
        this.removeSystemFilter = this.removeSystemFilter.bind(this)
    }

    addSystemFilter(system) {
      this.props.createSystemFilter(system, 0, '')
    }

    removeSystemFilter(input) {

    }

    render() {
       const items = this.props.system_filter.map((item) => {
           return (
               <tr className="system-filter-row">
                   <td>
                     <SystemFilter
                         systemName={ item.system }
                         jumps={ item.jumps }
                         ly={ item.ly }
                        />
                     </td>
               </tr>
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
    return bindActionCreators({ createSystemFilter }, dispatch)
}

export default connect(mapStateToProps, mapDispatchToProps)(FilterList)
