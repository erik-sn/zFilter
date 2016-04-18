import React from 'react';
import { Component } from 'react';
import { connect } from 'react-redux'
import { bindActionCreators } from 'redux'
import Infinite from 'react-infinite'

import Item from '../components/item'

import { inLyRange } from '../functions/system_functions'
import { systemExists } from '../functions/system_functions'

// Returns generic table that holds a list of items. Items are customized at the item object level
class ItemList extends Component {

    constructor(props) {
        super(props)
        this.updateLocalStore = this.updateLocalStore.bind(this)
    }

    updateLocalStore() {
        localStorage.setItem('updateTime', new Date)
    }

    render() {
        this.updateLocalStore()
        const { killmail_list, name } = this.props
        const items = killmail_list.filter((item) => {
           if(item.active) return true
        })
        .map((item, index) => {
            return <Item key={ index } item={ item } />
        })

        return (
            <div>
                <Infinite className={ name } containerHeight={ window.innerHeight - 55 } elementHeight={ 50 }>
                   { items }
                </Infinite>
            </div>
        )
    }
}

function mapStateToProps({ killmail_list }) {
    return ({ killmail_list })
}

export default connect(mapStateToProps)(ItemList)

