import React, { Component } from 'react'

import { FILTER_PILOT_CREATE } from '../actions/actions'
import { FILTER_PILOT_DELETE } from '../actions/actions'

// State:
//  {
//    pilots: [],
//    corporations: [],
//    alliances: []
//  }
export default function(state = {pilots:[], corporations:[], alliances:[]}, action) {
    switch (action.type) {
        case FILTER_PILOT_CREATE:
            switch(action.payload.group) {
              case 'character':
                const pilots = state.pilots.concat(action.payload)
                let updatedPilot = {
                  pilots: pilots,
                  corporations: state.corporations,
                  alliances: state.alliances
                }
                return updatedPilot

              case 'corporation':
                const corporations = state.corporations.concat(action.payload)
                const updatedCorporation = {
                  pilots: state.pilots,
                  corporations: corporations,
                  alliances: state.alliances
                }
                return updatedCorporation

              case 'alliance':
                const alliances = state.alliances.concat(action.payload)
                const updatedAlliance = {
                  pilots: state.pilots,
                  corporations: state.corporations,
                  alliances: alliances
                }
                return updatedAlliance
            }
    }
    return state
}


