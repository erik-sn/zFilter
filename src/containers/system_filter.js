import React, { Component } from 'react'
import { connect } from 'react-redux'
import { bindActionCreators } from 'redux'

class SystemFilter extends Component {

    constructor(props) {
        super(props)
        this.state = {
          system: props.systemName,
          systemId: props.systemId,
          jumps: props.jumps,
          ly: props.ly
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
      this.setState({ ly: ly }, function() {
        this.props.editSystemFilter(this.state.system, this.state.systemId, 'ly', ly)
      })
    }

     deleteFilter() {
       this.props.removeSystemFilter(this.props.systemName)
     }

    render() {
        return (
           <div className="input-group">
            <span className="input-group-addon" id="basic-addon1">{ this.props.systemName }</span>
            <input
              type="text"
              className="form-control, system-filter"
              placeholder="Jumps"
              aria-describedby="basic-addon1"
              value={ this.props.jumps }
              onChange={ this.updateJumps }
            />
            <input
              type="text"
              className="form-control, system-filter"
              placeholder="LY"
              aria-describedby="basic-addon1"
              value={ this.props.ly }
              onChange={ this.updateLY }
            />
            <span class="input-group-btn">
              <button class="btn btn-secondary" type="button" onClick={ this.deleteFilter }>Close</button>
            </span>
          </div>

        )
    }
}


function mapStateToProps({ system_filter }) {
    return { system_filter }
}


export default connect(mapStateToProps)(SystemFilter) // do not need app state
