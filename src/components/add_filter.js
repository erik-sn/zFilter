import React, { Component } from 'react'

import { systemExists } from '../functions/system_functions'

class AddFilter extends Component {

    constructor(props) {
      super(props);
      this.state = { input: '' }
      this.onInputChange = this.onInputChange.bind(this)
      this.createFilter = this.createFilter.bind(this)
    }

   onInputChange(event) {
      this.setState({ input: event.target.value })
    }

   createFilter(event) {
     event.preventDefault()

     const system = this.state.input
     const keyPair = systemExists(system);
     if(keyPair) {
       this.props.createSystemFilter(keyPair)
       this.setState({ input: ''})
     }
     else {
       if(this.state.input.trim() !== '') {
         alert('This system does not exist.')
       }
     }

   }


   render() {
      return (
          <form onSubmit={ this.createFilter }>
              <input
                  id="filter-add-input"
                  type="text"
                  className="form-control"
                  placeholder="Add System..."
                  onChange={ this.onInputChange }
                  value={ this.state.input }
              />
              <span className="input-group-btn" id="filter-add-button">
              <button className="btn btn-secondary" type="submit">Add</button>
              </span>
          </form>
      )
   }
}

export default AddFilter

