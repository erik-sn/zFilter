import React from 'react';
import { Component } from 'react';
import { connect } from 'react-redux'
import { bindActionCreators } from 'redux'

import SearchFilter from './search_filter'

class Navbar extends Component {

    constructor(props) {
        super(props)
        this.showGithub = this.showGithub.bind(this)
    }

    showGithub() {
        const githubURL = 'https://github.com/kiresuah/zFilter'
        const redirectWindow = window.open(githubURL, '_blank')
        redirectWindow.location
    }

    render() {
        const items = this.props.killmail_list.filter((item) => {
            if(item.active) return true
        }).length

        return (
            <div className="navbar-container">
                <div className="logo-container">
                    <img src="../../style/img/logo.png" height="45" width="50"/>
                    <img src="../../style/img/logo-label.png" height="35" />
                </div>
                <div className="kill-counter">Active Killmails: { items }</div>
                <div className="search-container"><SearchFilter /></div>

                <div className="github-logo" onClick={ this.showGithub }>
                    <img src="../../style/img/github-mark.png" width="30"/>
                </div>
            </div>

        )
    }
}

function mapStateToProps({ killmail_list }) {
    return ({ killmail_list })
}

export default connect(mapStateToProps)(Navbar)

