import React, { Component } from 'react'

import { FILTER_CREATE } from '../actions/actions'
import { FILTER_DELETE } from '../actions/actions'

export default function(state = { player:[], ships:[], groups:[], regions:[]}, action) {
    switch (action.type) {
        case FILTER_CREATE:
            switch(action.payload.group) {
              case 'player':
                const player = state.player.concat(action.payload)
                let playerFilter = {
                  player: player,
                  ships: state.ships,
                  groups: state.groups,
                  regions: state.regions
                }
                return playerFilter

              case 'ship':
                const ships = state.ships.concat(action.payload)
                let shipFilter = {
                  player: state.player,
                  ships: ships,
                  groups: state.groups,
                  regions: state.regions
                }
                return shipFilter

              case 'group':
                const groups = state.groups.concat(action.payload)
                let groupFilter = {
                  player: state.player,
                  ships: state.ships,
                  groups: groups,
                  regions: state.regions
                }
                return groupFilter

              case 'region':
                const regions = state.regions.concat(action.payload)
                let regionFilter = {
                  player: state.player,
                  ships: state.ships,
                  groups: state.groups,
                  regions: regions
                }
                return regionFilter

            }
    }
    return state
}


