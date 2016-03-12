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
       alert('This system does not exist.')
     }

   }


   render() {
      return (
        <form>
          <div className="input-group">
            <input
                type="text"
                className="form-control"
                placeholder="Add System..."
                onChange={ this.onInputChange }
                value={ this.state.input }
            />
            <span className="input-group-btn">
              <button
                className="btn btn-secondary"
                type="submit"
                onClick={ this.createFilter }
                onFormSubmit={ this.createFilter }>
              Add</button>
            </span>
          </div>
        </form>
      )
   }
}

export default AddFilter

