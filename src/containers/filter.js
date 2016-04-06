import React, { Component } from 'react'

export default class Filter extends Component {

    constructor(props) {
        super(props)
        this.state = {
          type: props.type,
          status: 'both'
        }
        this.updateStatus = this.updateStatus.bind(this)
    }

    updateStatus() {
      if(this.props.type == 'region' || this.props.type == 'group') return
      switch(this.state.status) {
        case 'both':
          this.setState({ status: 'attacker' })
          break;
        case 'attacker':
          this.setState({ status: 'victim' })
          break;
        case 'victim':
          this.setState({ status: 'both' })
          break;
      }
    }

    updateJumps(event) {
      const jumps = event.target.value
      this.setState({ jumps: jumps }, function() {
        this.props.editSystemFilter(this.state.system, this.state.systemId, 'jumps', jumps)
      })
    }

    deleteFilter() {
       this.props.removeSystemFilter(this.props.systemName, this)
    }

    render() {
        const filterClass = "tag-" + this.state.status + " label tag label-info"
        return (
          <div onClick={ this.updateStatus }>
              <span className={ filterClass }>
                <span>{ this.props.name }</span>
                <a><i className="remove glyphicon glyphicon-remove-sign glyphicon-white"></i></a>
              </span>
          </div>
        )
    }
}


