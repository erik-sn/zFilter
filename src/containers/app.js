import React from 'react';
import { Component } from 'react';
import { connect } from 'react-redux'
import { bindActionCreators } from 'redux'
import { intializeList } from '../actions/index'
import { getKillmails } from '../actions/index'

import SearchBar from '../containers/search_bar'
import ItemList from '../containers/item_list'

class App extends Component {

    constructor(props) {
        super(props)
        this.refreshList = this.refreshList.bind(this)
    }

    render() {
        return (
            <div>
              <div id="search-bar"><SearchBar /></div>
              <div id="list-container"><ItemList killmails= { this.props.killmail_list } /></div>
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
        setInterval(this.refreshList, 30000);
    }
}

function mapStateToProps({ killmail_list }) {
    return { killmail_list }
}

function mapDispatchToProps(dispatch) {
    return bindActionCreators({ intializeList, getKillmails }, dispatch)
}

export default connect(mapStateToProps, mapDispatchToProps)(App) // do not need app state

