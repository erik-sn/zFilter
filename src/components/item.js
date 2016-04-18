import React, { Component } from 'react'

class Item extends Component {

    constructor(props) {
      super(props);
       this.onClick = this.onClick.bind(this)
       this.showSystemDotlan = this.showSystemDotlan.bind(this)
    }

    onClick() {
      const killUrl = `https://zkillboard.com/kill/${this.props.item.killID}/`
      const redirectWindow = window.open(killUrl, '_blank');
      redirectWindow.location
    }

    showSystemDotlan() {
        const systemURL = `http://evemaps.dotlan.net/system/${this.props.item.system}`
        const redirectWindow = window.open(systemURL, '_blank')
        redirectWindow.location
    }

    render() {
      const killmail = this.props.item
      const imgUrl = `https://image.eveonline.com/Type/${killmail.shipID}_64.png`
      if(killmail.victimName.length > 20) killmail.victimName = `${killmail.victimName.substring(0, 17)}...`
      let victimGroup = killmail.victimCorp
      if(killmail.victimAlliance !== '') victimGroup = killmail.victimAlliance
      if(victimGroup.length > 23) victimGroup = `${victimGroup.substring(0, 20)}...`
      let attackerGroup = killmail.attackerCorporation
      if(killmail.attackerAlliance !== '') attackerGroup = killmail.attackerAlliance
      if(attackerGroup.length > 35) attackerGroup = `${victimGroup.substring(0, 32)}...`

      let secClass
      if(killmail.security > 0.4) secClass = 'high'
      else if(killmail.security > 0) secClass = 'low'
      else secClass = 'null'
      return (
            <div className="item-row" key={ this.props.key }>
              <div onClick={ this.onClick } className="victim-img"><img src={ imgUrl } height="42" width="42" /></div>
              <div className="victim-info" onClick={ this.onClick }>
                  <span className="victim-name">{ killmail.victimName }</span>
                  <span className="victim-group">{ victimGroup }</span>
              </div>
              <div className="attacker-group">{ attackerGroup } ({ killmail.attackerCount })</div>
              <div className="system-info"  onClick={ this.showSystemDotlan }>
                  <span className="system-name" >{ killmail.system }</span>
                  <span className="system-sec"> (<span className={ secClass }>{ killmail.security }</span>)</span>
                  <span className="system-region"> { killmail.region }</span>
              </div>
              <div className="kill-time">{ killmail.time }</div>
            </div>
      )
    }
}

export default Item
