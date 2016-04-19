import React from 'react';
import { Component } from 'react';
import { connect } from 'react-redux'
import { bindActionCreators } from 'redux'

import SearchFilter from './search_filter'

class Options extends Component {

    constructor(props) {
        super(props)
        this.state = {
            showOptions: false,
            ignorePods: true,
            ignoreShuttles: true,
            ignoreRookieShips: true,
            showHighsec: false,
            showLowsec: true,
            showNullsec: true,
            minIsk: '',
            maxIsk: ''
        }
        this.toggleOptions = this.toggleOptions.bind(this)
        this.updateIgnorePods = this.updateIgnorePods.bind(this)
        this.updateIgnoreShuttles = this.updateIgnoreShuttles.bind(this)
        this.updateIgnoreRookieShips = this.updateIgnoreRookieShips.bind(this)
        this.updateShowHighsec = this.updateShowHighsec.bind(this)
        this.updateShowLowsec = this.updateShowLowsec.bind(this)
        this.updateShowNullsec = this.updateShowNullsec.bind(this)
        this.updateMinIsk = this.updateMinIsk.bind(this)
        this.updateMaxIsk = this.updateMaxIsk.bind(this)
    }

    toggleOptions() {
      if(this.state.showOptions) this.setState({ showOptions: false})
      else this.setState({ showOptions: true })
    }

    updateIgnorePods() {
        this.setState({ ignorePods: !this.state.ignorePods })
    }

    updateIgnoreShuttles() {
        this.setState({ ignoreShuttles: !this.state.ignoreShuttles })
    }

    updateIgnoreRookieShips() {
        this.setState({ ignoreRookieShips: !this.state.ignoreRookieShips })
    }

    updateShowHighsec() {
        this.setState({ showHighsec: !this.state.showHighsec })
    }

    updateShowLowsec() {
        this.setState({ showLowsec: !this.state.showLowsec })
    }

    updateShowNullsec() {
        this.setState({ showNullsec: !this.state.showNullsec })
    }

    updateMinIsk(event) {
        let input = event.target.value
        if(input === '' || input.match(/^\d+$/)) {
            this.setState({ minIsk: input })
        }
    }

    updateMaxIsk(event) {
        let input = event.target.value
        if(input === '' || input.match(/^\d+$/)) {
            this.setState({ maxIsk: input })
        }
    }


    render() {
        let dropdownClass = 'dropdown-menu-hide'
        if(this.state.showOptions) dropdownClass = 'dropdown-menu-visible'
        return (
          <div className="option-container">
              <div className="row">
                  <div className="col-lg-12">
                      <div className="button-group">
                          <button type="button" className="btn btn-default btn-sm dropdown-toggle" data-toggle="dropdown" onClick={ this.toggleOptions }><span className="glyphicon glyphicon-cog"></span> <span className="caret"></span></button>
                          <ul className={ dropdownClass }>
                              <li className="dropdown-spacer"></li>
                              <li><input type="checkbox" onChange={ this.updateIgnorePods } checked={ this.state.ignorePods } /><span>Ignore Pods</span></li>
                              <li><input type="checkbox" onChange={ this.updateIgnoreShuttles }  checked={ this.state.ignoreShuttles }/><span>Ignore Shuttles</span></li>
                              <li><input type="checkbox" onChange={ this.updateIgnoreRookieShips }  checked={ this.state.ignoreRookieShips }/><span>Ignore Rookie Ships</span></li>
                              <li><input type="checkbox" onChange={ this.updateShowHighsec }  checked={ this.state.showHighsec }/><span>Highsec</span></li>
                              <li><input type="checkbox" onChange={ this.updateShowLowsec }  checked={ this.state.showLowsec }/><span>Lowsec</span></li>
                              <li><input type="checkbox" onChange={ this.updateShowNullsec }  checked={ this.state.showNullsec }/><span>Nullsec</span></li>
                              <li>
                                <span className="isk-label">ISK Value (Millions):</span>
                                <div className="isk-input-container">
                                  <input value={ this.state.minIsk } onChange={ this.updateMinIsk } className="isk-input" placeholder="Min.." type="text" />
                                  <span>to</span>
                                  <input value={ this.state.maxIsk } onChange={ this.updateMaxIsk } className="isk-input isk-input-right" placeholder="Max.." type="text"/>
                                </div>
                              </li>
                              <li className="dropdown-spacer"></li>
                          </ul>
                      </div>
                  </div>
              </div>
          </div>

        )
    }
}

function mapStateToProps({  }) {
    return ({  })
}

export default connect(mapStateToProps)(Options)

