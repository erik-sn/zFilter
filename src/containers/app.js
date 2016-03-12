import React from 'react';
import { Component } from 'react';
import { connect } from 'react-redux'
import { bindActionCreators } from 'redux'
import { intializeList } from '../actions/actions'
import { getKillmails } from '../actions/actions'

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
              <div id="search-bar"><SearchBar /></div>
              <div id="list-container"><ItemList name="item-table" /></div>
              <div id="filter-container"><FilterList name="filter-table"/></div>
            </div>
        );
    }

    refreshList() {
        let maxId = -1
        console.log('List size: ', this.props.killmail_list.length)
        for(let killmail of this.props.killmail_list) {
            if(killmail.killID > maxId ) {
                maxId = killmail.killID;
            }
        }
        this.props.getKillmails(maxId)
    }

    componentDidMount() {
        this.props.intializeList()
        setInterval(this.refreshList, 15000);
    }
}

function mapStateToProps({ killmail_list }) {
    return { killmail_list }
}

function mapDispatchToProps(dispatch) {
    return bindActionCreators({ intializeList, getKillmails }, dispatch)
}

export default connect(mapStateToProps, mapDispatchToProps)(App) // do not need app state

