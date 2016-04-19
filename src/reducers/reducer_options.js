import React, { Component } from 'react'

import { SET_OPTIONS } from '../actions/actions'
export default function(state = {}, action) {
    state = initializeOptions()
    switch (action.type) {
        case SET_OPTIONS:
          return action.payload

    }
    return state
}


function initializeOptions() {
    const options = localStorage.getItem('options')
    if(options) {
        console.log('Initializing Options: ', JSON.parse(options))
        return JSON.parse(options)
    }
}
//state = {showOptions: false, ignorePods: true, ignoreShuttles: true, ignoreRookieShips: true,
//    showHighsec: false,  showLowsec: true, showNullsec: true, matchAny: true, minIsk: '', maxIsk: '', maxKillmails: 5000}