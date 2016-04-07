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

        case FILTER_DELETE:
          const name = action.payload.name
          switch(action.payload.type) {
              case 'player':
                const player = removeItem(state.player, name)
                let playerFilter = {
                  player: player,
                  ships: state.ships,
                  groups: state.groups,
                  regions: state.regions
                }
                return playerFilter

              case 'ship':
                const ships = removeItem(state.ships, name)
                let shipFilter = {
                  player: state.player,
                  ships: ships,
                  groups: state.groups,
                  regions: state.regions
                }
                console.log(shipFilter)
                return shipFilter

              case 'group':
                const groups = removeItem(state.groups, name)
                let groupFilter = {
                  player: state.player,
                  ships: state.ships,
                  groups: groups,
                  regions: state.regions
                }
                return groupFilter

              case 'region':
                const regions = removeItem(state.regions, name)
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


function removeItem(array, search) {
    const indexes = array.map((object, index) => {
                if(object.name === search) return index; else return 0
              })
    const index = Math.max.apply(Math, indexes)
    return array.slice(0, index).concat(array.slice(index + 1))
}

