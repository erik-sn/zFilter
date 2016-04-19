import React from 'react';
import { Component } from 'react';
import { connect } from 'react-redux'
import { bindActionCreators } from 'redux'

import SearchFilter from './search_filter'

class Navbar extends Component {

    constructor(props) {
        super(props)
        this.state = {
          showOptions: false
        }
        this.showGithub = this.showGithub.bind(this)
        this.showReddit = this.showReddit.bind(this)
        this.toggleOptions = this.toggleOptions.bind(this)
    }

    showGithub() {
        const githubURL = 'https://github.com/kiresuah/zFilter'
        const redirectWindow = window.open(githubURL, '_blank')
        redirectWindow.location
    }

    showReddit() {
        const redditURL = 'https://www.reddit.com/r/eve'
        const redirectWindow = window.open(redditURL, '_blank')
        redirectWindow.location
    }

    toggleOptions() {
      if(this.state.showOptions) this.setState({ showOptions: false})
      else this.setState({ showOptions: true })
    }

    render() {
        const items = this.props.killmail_list.filter((item) => {
            if(item.active) return true
        }).length
        let dropdownClass = 'dropdown-menu-hide'
        if(this.state.showOptions) dropdownClass = 'dropdown-menu-visible'

        return (
            <div className="navbar-container">
                <div className="left-container">
                  <div className="logo-container">
                      <img src="../../style/img/logo.png" height="45" width="50"/>
                      <img src="../../style/img/logo-label.png" height="35" />
                  </div>
                  <div className="kill-counter">Active Killmails: { items }</div>
                  <div className="search-container"><SearchFilter /></div>
                  <div className="option-container">
                      <div className="row">
                          <div className="col-lg-12">
                              <div className="button-group">
                                  <button type="button" className="btn btn-default btn-sm dropdown-toggle" data-toggle="dropdown" onClick={ this.toggleOptions }><span className="glyphicon glyphicon-cog"></span> <span className="caret"></span></button>
                                  <ul className={ dropdownClass }>
                                      <li className="dropdown-spacer"></li>
                                      <li><input type="checkbox" checked/><span>Disable Pods</span></li>
                                      <li><input type="checkbox" checked/><span>Disable Shuttles</span></li>
                                      <li><input type="checkbox" checked/><span>Disable Rookie Ships</span></li>
                                      <li><input type="checkbox" /><span>Highsec</span></li>
                                      <li><input type="checkbox" checked/><span>Lowsec</span></li>
                                      <li><input type="checkbox" checked/><span>Nullsec</span></li>
                                      <li>
                                        <span className="isk-label">ISK Value (Millions):</span>
                                        <div className="isk-input-container">
                                          <input className="isk-input" type="text" />
                                          <span>to</span>
                                          <input className="isk-input isk-input-right" type="text"/>
                                        </div>
                                      </li>
                                      <li className="dropdown-spacer"></li>
                                  </ul>
                              </div>
                          </div>
                      </div>
                  </div>
                </div>
                <div className="right-container">
                  <div className="github-logo" onClick={ this.showGithub }>
                      <img src="../../style/img/github-mark.png" height="40"/>
                  </div>
                  <div className="reddit-logo" onClick={ this.showReddit }>
                      <img src="../../style/img/reddit.png" height="40"/>
                  </div>
                </div>
            </div>

        )
    }
}

function mapStateToProps({ killmail_list }) {
    return ({ killmail_list })
}

export default connect(mapStateToProps)(Navbar)

