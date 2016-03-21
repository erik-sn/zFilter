import React, { Component } from 'react'
import { connect } from 'react-redux'
import { bindActionCreators } from 'redux'

export default class SystemFilter extends Component {

    constructor(props) {
        super(props)
        console.log('Constructor: ', props)
        this.state = {
          system: props.systemName,
          systemId: props.systemId,
          jumps: 0,
          ly: 0
        }
        console.log('State:',this.state)

        this.updateJumps = this.updateJumps.bind(this)
        this.updateLY = this.updateLY.bind(this)
        this.deleteFilter = this.deleteFilter.bind(this)
    }



    updateJumps(event) {
      const jumps = event.target.value
      this.setState({ jumps: jumps }, function() {
        this.props.editSystemFilter(this.state.system, this.state.systemId, 'jumps', jumps)
      })
    }

    updateLY(event) {
      const ly = event.target.value
      this.setState({ ly: event.target.value }, function() {
        this.props.editSystemFilter(this.state.system, this.state.systemId, 'ly', ly)
      })
    }

     deleteFilter() {
       this.props.removeSystemFilter(this.props.systemName, this)
     }

    render() {
        return (
           <tr className="system-filter-row">
            <td className="system-filter-label">
                <span className="input-group-addon" id="basic-addon1">{ this.props.systemName }</span>
            </td>
            <td className="system-filter-input">
                <input
                  type="text"
                  className="form-control, system-filter"
                  placeholder="Jumps"
                  aria-describedby="basic-addon1"
                  value={ this.state.jumps }
                  onChange={ this.updateJumps }
                />
            </td>
            <td className="system-filter-input">
                <input
                  type="text"
                  className="form-control, system-filter"
                  placeholder="LY"
                  aria-describedby="basic-addon1"
                  value={ this.state.ly }
                  onChange={ this.updateLY }
                />
            </td>
            <td className="system-filter-button">
                <span className="input-group-btn">
                  <button className="btn btn-secondary" type="button" onClick={ this.deleteFilter }>Close</button>
                </span>
            </td>
          </tr>


        )
    }
}


