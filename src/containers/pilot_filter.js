import React, { Component } from 'react'
import { connect } from 'react-redux'
import { bindActionCreators } from 'redux'

export default class SystemFilter extends Component {

    constructor(props) {
        super(props)
        this.state = {

        }
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

    deleteFilter() {
       this.props.removeSystemFilter(this.props.systemName, this)
    }

    render() {
        return (
           <table>

           </table>
        )
    }
}


