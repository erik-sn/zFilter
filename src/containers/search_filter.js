import React, { Component } from 'react'
import { connect } from 'react-redux'
import { bindActionCreators } from 'redux'

import { getOptions } from '../actions/actions'
import { resetOptions } from '../actions/actions'
import { createSystemFilterAndEvaluate } from '../actions/actions'
import { createFilterAndEvaluate } from '../actions/actions'

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
        console.log(item)
        if(item.type === 'system') {
            const name = item.name.substring(0, item.name.indexOf('('))
            this.props.createSystemFilterAndEvaluate(name, item.id, 0 ,0, this.props)
        }
        else if(item.type === 'region' ||
            item.type == 'ship' ||
            item.type == 'group' ||
            item.type == 'alliance' ||
            item.type == 'corporation' ||
            item.type == 'character') {
            this.props.createFilterAndEvaluate(item.type, item.id, item.name, this.props)
        }
        this.props.resetOptions()
        this.setState({ input: '' })
    }

    update(input) {
        this.props.getOptions(input)
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
        return this.props.options.map((option, index) => {
            const imgUrl = `https://image.eveonline.com/${option.image}`
            if(option.name && option.name.length > 33) option.name = `${option.name.substring(0, 30)}...`
            return(
                <div className="filter-list-item" key={ index } onClick={ this.select.bind(null, option) }>
                    <img src={ imgUrl } height="40" width="40"/>
                    <div >
                        <span className="item-name">{ option.name }</span>
                        <span className="item-type">{ option.type }</span>
                    </div>
                </div>
            )
        })
    }

    render() {
        return (
             <div>
                <input
                    placeholder="Search for a filter here..."
                    type="text"
                    className="dropdown-input"
                    onClick={ this.show }
                    onChange={(e)=>{ this.setState({ input: e.target.value }); this.update(e.target.value); this.show }}
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

function mapStateToProps({ killmail_list, options, system_filter, jump_filter, filters }) {
    return { killmail_list, options, system_filter, jump_filter, filters }
}

function mapDispatchToProps(dispatch) {
    return bindActionCreators({ getOptions, resetOptions, createSystemFilterAndEvaluate, createFilterAndEvaluate }, dispatch)
}

export default connect(mapStateToProps, mapDispatchToProps)(SearchFilter)



