import React from 'react';
import { Component } from 'react';
import { connect } from 'react-redux'
import { bindActionCreators } from 'redux'
import { getKillmails } from '../actions/actions'
import { setInitialKillmails } from '../actions/actions'

import SearchBar from '../containers/search_bar'
import FilterList from '../containers/filter_list'
import ItemList from '../components/item_list'

class App extends Component {

    constructor(props) {
        super(props)
        this.refreshList = this.refreshList.bind(this)
    }

    render() {
        return (
            <div id="app-container">
              <div id="list-container"><ItemList name="item-table" /></div>
              <div id="filter-container"><FilterList name="filter-table"/></div>
            </div>
        );
    }

    refreshList() {
        this.props.getKillmails()
    }

    componentDidMount() {
      setInterval(this.refreshList, 2500)

      // if local storage data is older than 4 hours reset it
      const lastUpdate = new Date(localStorage.getItem('updateTime')).getTime()
      const timeDifference = (new Date().getTime() - lastUpdate)/1000
      if(timeDifference < 10800) this.props.setInitialKillmails(localStorage.getItem('killmails'))
      else localStorage.removeItem('killmails')
    }

}


function mapDispatchToProps(dispatch) {
    return bindActionCreators({ setInitialKillmails, getKillmails }, dispatch)
}

export default connect(null, mapDispatchToProps)(App) // do not need app state


