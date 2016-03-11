import React from 'react'

import Item from '../components/item'

// Returns generic table that holds a list of items. Items are customized at the item object level
const ItemList = (props) => {

    const items = props.items.map((item) => {
       return (
           <Item item={ item } />
       )
    })

    return (
        <table className={ props.name }>
            <tbody>
            { items }
            </tbody>
        </table>
    )
}

export default ItemList
