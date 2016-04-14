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
    }

    render() {
        const items = this.props.item_list.map((item, index) => {
            return <Item key={ index } item={ item } />
        })

        return (
            <table className={ this.props.name }>
                <tbody>{ items }</tbody>
            </table>
        )
    }
}

function mapStateToProps({ item_list }) {
    return ({ item_list })
}

export default connect(mapStateToProps)(ItemList)

