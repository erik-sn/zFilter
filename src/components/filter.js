import React, { Component } from 'react'

export default class Filter extends Component {

    constructor(props) {
        super(props)
        this.state = {
          status: this.props.status
        }
        this.deleteFilter = this.deleteFilter.bind(this)
        this.updateFilter = this.updateFilter.bind(this)
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

    updateFilter() {
        console.log('updating filter')
        this.props.updateFilter(this.props.name, this.props.type, this.props.status)
    }

    deleteFilter() {
       this.props.removeFilter(this.props.name, this.props.type)
    }

    render() {
        const filterClass = "tag-" + this.state.status + " label tag label-info"
        return (
          <div className={ filterClass } key={ this.props.key }>
              <div className="filter-label" onClick={ this.updateFilter } >{ this.props.name }</div>
              <div className="filter-button" onClick={ this.deleteFilter }>
                <span className="glyphicon glyphicon-remove"></span>
              </div>
          </div>
        )
    }
}


