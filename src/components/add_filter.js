import React, { Component } from 'react'


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

   createFilter(system) {
     this.props.createSystemFilter(this.state.input)
   }

   render() {
      return (
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
                type="button"
                onClick={ this.createFilter }>
              Add</button>
            </span>
          </div>
      )
   }
}

export default AddFilter
