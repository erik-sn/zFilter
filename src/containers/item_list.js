import React from 'react';
import { Component } from 'react';
import { connect } from 'react-redux'
import { bindActionCreators } from 'redux'

import Item from '../components/item'

import { updateKillmail } from '../actions/actions'
import { inLyRange } from '../functions/system_functions'
import { systemExists } from '../functions/system_functions'

// Returns generic table that holds a list of items. Items are customized at the item object level
class ItemList extends Component {

    constructor(props) {
        super(props)
        this.updateLocalStore = this.updateLocalStore.bind(this)
    }

    /**
     * Update the local storage that holds processed killmails. If the store is over a specified amount of kills
     * remove the last element to stay at that limit
     * @param killmails {array} - array of killmail objects
     */
    updateLocalStore(killmails) {
        let localStore = JSON.parse(localStorage.getItem('killmails'))
        if(localStore == null) localStore = []
        if(localStore.length >= 3000)  localStorage.setItem('killmails', JSON.stringify(killmails.slice(0, -1)))
        else localStorage.setItem('killmails', JSON.stringify(killmails))
        localStorage.setItem('updateTime', new Date)
    }

    render() {
        if(this.props.killmail_list.length > 0) this.updateLocalStore(this.props.killmail_list)
        const items = this.props.killmail_list.map((item, index) => {
           if(item.active) return <Item key={ index } item={ item } />
        })

        return (
            <table className={ this.props.name }>
                <tbody>{ items }</tbody>
            </table>
        )
    }
}

function mapStateToProps({ killmail_list }) {
    console.log(killmail_list.length)
    return ({ killmail_list })
}

export default connect(mapStateToProps)(ItemList)

