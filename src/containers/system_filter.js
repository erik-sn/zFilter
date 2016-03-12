import React, { Component } from 'react'
import { connect } from 'react-redux'
import { bindActionCreators } from 'redux'

class SystemFilter extends Component {

    constructor(props) {
        super(props)
        this.state = {
          system: props.systemName,
          jumps: props.jumps,
          ly: props.ly
        }
        console.log(this.state)
        this.updateJumps = this.updateJumps.bind(this)
        this.updateLY = this.updateLY.bind(this)
    }

    updateJumps(event) {
      this.setState({ jumps: event.target.value })
//      this.props.modifySystemFilter(this.state)
    }

    updateLY(event) {
      this.setState({ ly: event.target.value })
//      this.props.modifySystemFilter(this.state)
    }

    render() {
        return (
           <div className="input-group">
            <span className="input-group-addon" id="basic-addon1">{ this.props.systemName }</span>
            <input type="text" className="form-control, system-filter" placeholder="Jumps" aria-describedby="basic-addon1" value={ this.state.jumps } onChange={ this.updateJumps }/>
            <input type="text" className="form-control, system-filter" placeholder="LY" aria-describedby="basic-addon1" value={ this.state.ly } onChange={ this.updateLY } />
          </div>
        )
    }
}



export default connect(null, null)(SystemFilter) // do not need app state
