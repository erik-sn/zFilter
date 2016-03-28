import React, { Component } from 'react'
import { connect } from 'react-redux'
import { bindActionCreators } from 'redux'

import { getSystemID } from '../functions/system_functions'
import { getOptions } from '../actions/actions'
import { resetOptions } from '../actions/actions'
import { createSystemFilter } from '../actions/actions'
import { createPilotFilter } from '../actions/actions'

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
    this.renderListItems = this.renderListItems.bind(this)
  }

  select(item) {
    console.log('Selecting: ', item)
    this.props.resetOptions()
    this.setState({ input: '' })
    if(item.type === 'system') {
      const systemName = item.name.slice(0, item.name.indexOf('(') - 1)
      this.props.createSystemFilter(systemName, getSystemID(systemName), 0 ,0, this.props.system_filter)
    }
    else if(item.type === 'character' || item.type === 'corporation' || item.type === 'alliance') {
      this.props.createPilotFilter(item.type, item.id, item.name)
    }
  }

  show() {
    this.setState({ listVisible: true })
    document.addEventListener("click", this.hide)
  }

  hide() {
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
        let imgUrl = `https://image.eveonline.com/${item.image}`
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
                onChange={(e)=>{ this.setState({ input: e.target.value }); this.props.getOptions(e.target.value) }}
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

function mapStateToProps({ options, system_filter }) {
    return { options, system_filter }
}

function mapDispatchToProps(dispatch) {
    return bindActionCreators({ getOptions, resetOptions, createSystemFilter, createPilotFilter }, dispatch)
}

export default connect(mapStateToProps, mapDispatchToProps)(SearchFilter)



