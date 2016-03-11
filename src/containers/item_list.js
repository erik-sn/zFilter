import React from 'react'

const ItemList = (props) => {

    const killmails = props.killmails.map((killmail) => {
       const imgUrl = `https://image.eveonline.com/Type/${killmail.shipID}_64.png`
       return (
            <tr key={killmail.killID } >
                <td><img src={ imgUrl } height="40" width="40" /></td>
                <td>{ killmail.shipName }</td>
                <td>{ killmail.victimName }</td>
                <td>{ killmail.victimCorp }</td>
                <td>{ killmail.victimAlliance }</td>
                <td>{ killmail.security }</td>
                <td>{ killmail.system }</td>
                <td>{ killmail.time }</td>
            </tr>
       )
    })

    return (
        <table>
            <tbody>
            { killmails }
            </tbody>
        </table>
    )
}

export default ItemList
