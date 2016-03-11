import React from 'react'

const ItemList = (props) => {

    const items = props.killmails.map((killmail) => {
       const imgUrl = `https://image.eveonline.com/Type/${killmail.shipID}_64.png`
       const killUrl = `https://zkillboard.com/kill/${killmail.killID}/`
       let group = killmail.victimCorp;
       if(killmail.victimAlliance.trim() != '') {
           group += ' / ' + killmail.victimAlliance
       }
       return (
            <tr key={killmail.killID } >
                <td><img src={ imgUrl } height="40" width="40" /></td>
                <td>{ killmail.victimName }</td>
                <td>{group }</td>
                <td>{ killmail.security }</td>
                <td>{ killmail.system }</td>
                <td>{ killmail.time }</td>
            </tr>
       )
    })

    return (
        <table>
            <tbody>
            { items }
            </tbody>
        </table>
    )
}

export default ItemList
