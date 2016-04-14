import React from 'react';
import { Component } from 'react';
import { connect } from 'react-redux'
import { bindActionCreators } from 'redux'
import { getKillmails } from '../actions/actions'
import { setInitialKillmails } from '../actions/actions'
import { filterKillmails } from '../actions/actions'

import FilterList from '../containers/filter_list'
import ItemList from './item_list'

class App extends Component {

    constructor(props) {
        super(props)
        this.refreshList = this.refreshList.bind(this)
    }

    render() {
        return (
            <div className="app-container">
              <div id="list-container"><ItemList name="item-table" /></div>
              <div id="filter-container"><FilterList name="filter-table"/></div>
            </div>
        );
    }

    refreshList() {
        this.props.getKillmails()
            .then(this.props.filterKillmails(this.props))
    }

    componentDidMount() {
      setInterval(this.refreshList, 2500)
      // if local storage data is older than 4 hours reset it
      const lastUpdate = new Date(localStorage.getItem('updateTime')).getTime()
      const timeDifference = (new Date().getTime() - lastUpdate)/1000
      if(timeDifference < 10800) this.props.setInitialKillmails(localStorage.getItem('killmails')) // reset storage if time > 3 hours
      else localStorage.removeItem('killmails')
    }

}


function mapStateToProps({ killmail_list, filters, system_filter, jump_filter }) {
    return ({ killmail_list, filters, system_filter, jump_filter })
}

function mapDispatchToProps(dispatch) {
    return bindActionCreators({ setInitialKillmails, getKillmails, filterKillmails }, dispatch)
}

export default connect(mapStateToProps, mapDispatchToProps)(App) // do not need app state


