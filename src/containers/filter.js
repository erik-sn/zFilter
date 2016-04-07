import React, { Component } from 'react'

export default class Filter extends Component {

    constructor(props) {
        super(props)
        this.state = {
          type: props.type,
          name: props.name,
          status: 'both'
        }
        this.deleteFilter = this.deleteFilter.bind(this)
        this.updateStatus = this.updateStatus.bind(this)
    }

    updateStatus() {
      if(this.props.type == 'region') return
      switch(this.state.status) {
        case 'both':
          this.setState({ status: 'attacker' }); break
        case 'attacker':
          this.setState({ status: 'victim' }); break
        case 'victim':
          this.setState({ status: 'both' }); break
      }
    }

    deleteFilter() {
       console.log('Deleting: ', this.props.name)
       this.props.removeSystemFilter(this.props.name, this)
    }

    render() {
        const filterClass = "tag-" + this.state.status + " label tag label-info"
        return (
          <div onClick={ this.updateStatus } className={ filterClass }>
              <div className="filter-label">{ this.props.name }</div>
              <div className="filter-button" onClick={ this.deleteFilter }>
                <span className="glyphicon glyphicon-remove"></span>
              </div>
          </div>
        )
    }
}


