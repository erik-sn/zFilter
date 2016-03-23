import React from 'react';
import { Component } from 'react';
import { connect } from 'react-redux'
import { bindActionCreators } from 'redux'
import io from 'socket.io-client'

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
        this.props.getKillmails()
    }

    componentDidMount() {
        setInterval(this.refreshList, 5000);
//
//      var socket = io.connect('http://redisq.zkillboard.com/listen.php')
//      socket.on('news', function(news) {
//        console.log(news)
//      })
//
//      socket.on('message', function(msg) {
//        console.log(msg)
//      })
    }
}


function mapDispatchToProps(dispatch) {
    return bindActionCreators({ getKillmails }, dispatch)
}

export default connect(null, mapDispatchToProps)(App) // do not need app state

