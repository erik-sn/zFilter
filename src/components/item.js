import React from 'react'

const Item = (props) => {
    const killmail = props.item

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
}

export default Item






