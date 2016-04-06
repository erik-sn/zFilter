import React, { Component } from 'react'
import { connect } from 'react-redux'
import { bindActionCreators } from 'redux'

import { getSystemID } from '../functions/system_functions'
import { getOptions } from '../actions/actions'
import { resetOptions } from '../actions/actions'
import { createSystemFilter } from '../actions/actions'
import { createFilter } from '../actions/actions'

class SearchFilter extends Component {

  constructor(props) {
    super(props)
    this.state = {
      input: '',
      listVisible: false,
      selectedItem: ''
    }

    this.select = this.select.bind(this)
    this.show = this.show.bind(this)
    this.hide = this.hide.bind(this)
    this.update = this.update.bind(this)
    this.renderListItems = this.renderListItems.bind(this)
  }

  select(item) {
    console.log('Selecting: ', item)
    this.props.resetOptions()
    this.setState({ input: '' })
    if(item.type === 'system') {
      this.props.createSystemFilter(item.name, item.id, 0 ,0, this.props.system_filter)
    }
    else if(item.type === 'region' || item.type == 'ship') {
      this.props.createFilter(item.type, item.id, item.name)
    }

  }

  update(input) {
    this.props.resetOptions()
    this.props.getOptions(input)
  }

  show() {
    this.setState({ listVisible: true })
    document.addEventListener("click", this.hide)
  }

  hide() {
    this.props.resetOptions()
    this.setState({ listVisible: false})
    document.removeEventListener("click", this.hide)
  }

  renderListItems() {
      let items = []
      for(var i = 0; i < this.props.options.length; i++) {
        var item = this.props.options[i]
        let label = item.name
        if(label.length > 30) label = label.substring(0, 27) + '...'
        let type = item.type.charAt(0).toUpperCase() + item.type.slice(1)
        let imgUrl = `https://image.eveonline.com/Type/${item.id}_64.png`
        if(item.type === 'system') imgUrl = 'http://evemaps.dotlan.net/images/celestials/star_128.png'
        if(item.type === 'region') imgUrl = 'http://evemaps.dotlan.net/images/celestials/lava.png'
        items.push(
          <div className="filter-list-item" key={ i } onClick={this.select.bind(null, item)}>
             <img src={ imgUrl } height="40" width="40" />
             <div >
               <span className="item-name">{ label }</span>
               <span className="item-type">{ type }</span>
             </div>
          </div>
        )
      }
      return items
  }

  render() {
    return (
         <div>
            <input
                type="text"
                className="dropdown-input"
                onClick={ this.show }
                onChange={(e)=>{ this.setState({ input: e.target.value }); this.update(e.target.value) }}
                value={ this.state.input }
            />
            <div className={"filter-list" + (this.state.listVisible ? "-clicked": "")}>
                <div className="render-list">
                    { this.renderListItems() }
                </div>
            </div>
        </div>
    )
  }

}

function mapStateToProps({ options, system_filter, filters }) {
    return { options, system_filter, filters }
}

function mapDispatchToProps(dispatch) {
    return bindActionCreators({ getOptions, resetOptions, createSystemFilter, createFilter }, dispatch)
}

export default connect(mapStateToProps, mapDispatchToProps)(SearchFilter)



