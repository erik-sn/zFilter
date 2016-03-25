import React, { Component } from 'react'
import { connect } from 'react-redux'
import { bindActionCreators } from 'redux'
import axios from 'axios'
import _ from 'lodash'
import { Combobox, Autocomplete, Dropdown, Input } from 'react-input-enhancements'
import { shipDataToArray } from '../functions/system_functions'
import { systemExists } from '../functions/system_functions'
import { getOptions } from '../actions/actions'

class AddFilter extends Component {

    constructor(props) {
      super(props)

      this.state = {
        value: '',
        options: []
      }
      this.updateInput = this.updateInput.bind(this)
      this.addFilter = this.addFilter.bind(this)
    }

    addFilter(e) {
      console.log(e)
    }

    updateInput(input) {
      if(input) {
        console.log(input)
        this.setState({value: input})
        this.props.getOptions(input)
      }
      else {

      }
    }

    render() {
      const optionUpdate = _.debounce((input) => { this.updateInput(input) }, 100);
      const options = ['test1', 'test2','test3','test4','test5','test6','test7',]
      return (
        <div className="filter-container">
          <Combobox defaultValue={ 'test '}
                        options={ this.props.options }
                        onChange={e => optionUpdate(e.target.value)}
                        onValueChange={ e => this.addFilter(e) }
                        autocomplete>
            {(inputProps, { matchingText, value }) =>
              <input type='text' {...inputProps} />
            }
          </Combobox>
        </div>
      )

   }
}

function mapStateToProps({ options }) {
    return { options }
}

function mapDispatchToProps(dispatch) {
    return bindActionCreators({ getOptions }, dispatch)
}

export default connect(mapStateToProps, mapDispatchToProps)(AddFilter)



//   createFilter(event) {
//     event.preventDefault()
//
//     const system = this.state.input
//     const keyPair = systemExists(system);
//     if(keyPair) {
//       this.props.createSystemFilter(keyPair)
//       this.setState({ input: ''})
//     }
//     else {
//       if(this.state.input.trim() !== '') {
//         alert('This system does not exist.')
//       }
//     }
//
//   }

//  <ComboBox placeholder = { 'Add Filter...' }
//            onUpdate={ (event) => {
//            if(event.isOptionSelection) {
//              console.log('Selecting: ', event.value)
//            }
//            else {
//              optionUpdate(event.value)
//            }
//
//          }}>
//            { this.props.options }
//          </ComboBox>
