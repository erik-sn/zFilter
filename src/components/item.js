import React, { Component } from 'react'

class Item extends Component {

    constructor(props) {
      super(props);
       this.onClick = this.onClick.bind(this)
    }

    onClick() {
      const killUrl = `https://zkillboard.com/kill/${this.props.item.killID}/`
      const redirectWindow = window.open(killUrl, '_blank');
      redirectWindow.location;
    }

    render() {
      const killmail = this.props.item
      const imgUrl = `https://image.eveonline.com/Type/${killmail.shipID}_64.png`
      let victimGroup = killmail.victimCorp
      if(killmail.victimAlliance !== '') victimGroup = killmail.victimAlliance
      let attackerGroup = killmail.attackerCorporation
      if(killmail.attackerAlliance !== '') attackerGroup = killmail.attackerAlliance
      return (
        <tr className="item-row" key={ this.props.key }>
          <td onClick={ this.onClick }><img src={ imgUrl } height="40" width="40" /></td>
          <td onClick={ this.onClick }>
              <span className="victim-name">{ killmail.victimName }</span>
              <span className="victim-group">{ victimGroup }</span>
          </td>
          <td>{ attackerGroup } ({ killmail.attackerCount })</td>
          <td>
              <span className="system-name">{ killmail.system }</span>
              <span className="system-sec"> ({ killmail.security })</span>
          </td>
          <td>{ killmail.time }</td>
        </tr>
      )
    }
}

export default Item
