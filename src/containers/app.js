import React from 'react';
import { Component } from 'react';
import { connect } from 'react-redux'
import { bindActionCreators } from 'redux'
import { getKillmails } from '../actions/actions'
import { setInitialKillmails } from '../actions/actions'

import FilterList from '../containers/filter_list'
import ItemList from './item_list'
import Navbar from './navbar'

class App extends Component {

    constructor(props) {
        super(props)
        this.refreshList = this.refreshList.bind(this)
    }

    render() {
        return (
            <div>
                <Navbar/>
                <div className="app-container">
                  <div>
                      <div id="list-container"><ItemList name="item-table" /></div>
                      <div id="filter-container"><FilterList name="filter-table"/></div>
                  </div>
                </div>
            </div>
        );
    }

    refreshList() {
        this.props.getKillmails(this.props)
    }

    componentDidMount() {
        //localStorage.removeItem('killmails')
        setInterval(this.refreshList, 2500)
        const lastUpdate = new Date(localStorage.getItem('updateTime')).getTime()
        const timeDifference = (new Date().getTime() - lastUpdate)/1000
        if(timeDifference > 3600) {
          const empty = confirm('The killmails in storage are more than an hour old - do you want to clear the list?')
          window.indexedDB.deleteDatabase("killmails")
        }

        getAllItems(this.props, function(props, items) {
          props.setInitialKillmails(items) // reset storage if time > 3 hours
        })
    }

}


function mapStateToProps({ killmail_list, filters, system_filter, jump_filter }) {
    return ({ killmail_list, filters, system_filter, jump_filter })
}

function mapDispatchToProps(dispatch) {
    return bindActionCreators({ setInitialKillmails, getKillmails }, dispatch)
}

export default connect(mapStateToProps, mapDispatchToProps)(App) // do not need app state

function getAllItems(props, callback) {
    var request = window.indexedDB.open("killmails", 1)
    let db
    request.onsuccess = function(event) {
        db = request.result;var trans = db.transaction('killmails', IDBTransaction.READ_ONLY);
        var store = trans.objectStore('killmails');
        var items = [];

        trans.oncomplete = function(evt) {
            callback(props, items);
        };

        var cursorRequest = store.openCursor();

        cursorRequest.onerror = function(error) {
            console.log(error);
        };

        cursorRequest.onsuccess = function(evt) {
            var cursor = evt.target.result;
            if (cursor) {
                items.push(cursor.value);
                cursor.continue();
            }
        };
        return items
    };

}