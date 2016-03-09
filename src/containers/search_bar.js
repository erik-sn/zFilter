import React, { Component } from 'react'
import { connect } from 'react-redux'
import { bindActionCreators } from 'redux'
import { getKillmails } from '../actions/index'

class SearchBar extends Component {

    constructor(props) {
        super(props)

        this.state = { search: ''}

        this.onInputChange = this.onInputChange.bind(this)
        this.onFormSubmit = this.onFormSubmit.bind(this)
    }

    onFormSubmit(event) {
        event.preventDefault()
    }

    onInputChange(event) {
        console.log(event.target.value)
        this.setState({search: event.target.value})
    }

    render() {
        return (
            <form className="input-group" onSubmit={ this.onFormSubmit }>
                <input
                    placeholder="Filter kills by ship lost, separate ships with commas ex: rifter, Merlin..."
                    className="form-control"
                    value={ this.state.search }
                    onChange={ this.onInputChange }
                />
            </form>
        )
    }
}

function mapStateToProps({ killmail_list }) {
    return { killmail_list }
}

export default connect(mapStateToProps)(SearchBar) // do not need app state
