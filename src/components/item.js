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
        let region = this.props.item.region.replace(/\s/g, '_')
        const systemURL = `http://evemaps.dotlan.net/map/${region}/${this.props.item.system}`
        const redirectWindow = window.open(systemURL, '_blank')
        redirectWindow.location
    }

    render() {
      const killmail = this.props.item
      const imgUrl = `https://image.eveonline.com/Type/${killmail.shipID}_64.png`

      killmail.victimName = formatLabel(killmail.victimName, 20)
      let victimGroup = formatLabel(chooseName(killmail.victimCorp, killmail.victimAlliance), 28)
      let attackerGroup = formatLabel(chooseName(killmail.attackerCorporation, killmail.attackerAlliance), 33)
      let secClass = getSecurityClass(killmail.security)

      return (
            <div className="item-row" key={ this.props.key }>
              <div onClick={ this.onClick } className="victim-img"><img src={ imgUrl } height="42" width="42" /></div>
              <div className="victim-info" onClick={ this.onClick }>
                  <span className="victim-name">{ killmail.victimName }</span>
                  <span className="victim-group">{ victimGroup }</span>
              </div>
              <div className="attacker-group">
                  <span className="attacker-label"> { attackerGroup } ({ killmail.attackerCount })</span>
              </div>
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

function getSecurityClass(security) {
    if(security > 0.4) return 'high'
    else if(security > 0) return 'low'
    else return 'null'
}

function chooseName(initial, preferred) {
    if(preferred !== '') return preferred
    return initial
}

function formatLabel(label, maxChars) {
    if(label.length > maxChars) return `${label.substring(0, maxChars - 3)}...`
    return label
}