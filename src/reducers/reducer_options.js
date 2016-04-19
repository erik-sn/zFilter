import React, { Component } from 'react'

import { SET_OPTIONS } from '../actions/actions'
export default function(state = {showOptions: false, ignorePods: true, ignoreShuttles: true, ignoreRookieShips: true,
    showHighsec: false,  showLowsec: true, showNullsec: true, minIsk: '', maxIsk: ''}, action) {
    switch (action.type) {
        case SET_OPTIONS:
          return action.payload

    }
    return state
}
