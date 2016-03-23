
import React, { Component } from 'react'
import { ComboBox, Option } from 'belle'

import { shipDataToArray } from '../functions/system_functions'
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
       const ships = shipDataToArray(shipdata).map((ship) => {
           return (
               <Option key={ ship.typeID } value={ ship.name } >{ ship.name }</Option>
           )
      })

      return (
        <div>
          <ComboBox
              className="filter-box"
              defaultValue="Select Ship..."
              onUpdate={ (event) => {
                console.log(event.value);
                console.log(event.identifier);
                console.log(event.isMatchingOption);
                console.log(event.isOptionSelection); }}
              maxOptions = { 5 }
          >
            { ships }
          </ComboBox>
        </div>
      )
   }
}


export default AddFilter

