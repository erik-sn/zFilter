import React, { Component } from 'react'
import { connect } from 'react-redux'
import { bindActionCreators } from 'redux'

export default class SystemFilter extends Component {

    constructor(props) {
        super(props)
        this.state = {

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
        return (
          <div className="filter-object">
              <span className="tag label label-info">
                <span>{ this.props.name }</span>
                <a><i className="remove glyphicon glyphicon-remove-sign glyphicon-white"></i></a>
              </span>
          </div>
        )
    }
}


