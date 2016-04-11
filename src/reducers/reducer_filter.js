import React, { Component } from 'react'

import { FILTER_CREATE } from '../actions/actions'
import { FILTER_UPDATE } from '../actions/actions'
import { FILTER_DELETE } from '../actions/actions'

export default function(state = { player:[], ships:[], groups:[], regions:[]}, action) {
    switch (action.type) {
      case FILTER_CREATE:
        console.log(action)
        switch (action.payload.type) {
          case 'player':
            return {
              player: state.player.concat(action.payload),
              ships: state.ships,
              groups: state.groups,
              regions: state.regions
            }

          case 'ship':
            return {
              player: state.player,
              ships: state.ships.concat(action.payload),
              groups: state.groups,
              regions: state.regions
            }

          case 'group':
            return {
              player: state.player,
              ships: state.ships,
              groups: state.groups.concat(action.payload),
              regions: state.regions
            }

          case 'region':
            return {
              player: state.player,
              ships: state.ships,
              groups: state.groups,
              regions: state.regions.concat(action.payload)
            }
        }

      case FILTER_UPDATE:
        const updateName = action.payload.name
        const status = action.payload.status
        switch (action.payload.type) {
          case 'player':
            return {
              player: updateStatus(state.player, updateName, status),
              ships: state.ships,
              groups: state.groups,
              regions: state.regions
            }

          case 'ship':
            return {
              player: state.player,
              ships: updateStatus(state.ships, updateName, status),
              groups: state.groups,
              regions: state.regions
            }

          case 'group':
            return {
              player: state.player,
              ships: state.ships,
              groups: updateStatus(state.groups, updateName, status),
              regions: state.regions
            }

          case 'region':
            return {
              player: state.player,
              ships: state.ships,
              groups: state.groups,
              regions: updateStatus(state.regions, updateName, status)
            }

        }

        case FILTER_DELETE:
          const deleteName = action.payload.name
          switch(action.payload.type) {
              case 'player':
                return {
                  player: removeItem(state.player, deleteName),
                  ships: state.ships,
                  groups: state.groups,
                  regions: state.regions
                }

              case 'ship':
                return {
                  player: state.player,
                  ships: removeItem(state.ships, deleteName),
                  groups: state.groups,
                  regions: state.regions
                }

              case 'group':
                return {
                  player: state.player,
                  ships: state.ships,
                  groups: removeItem(state.groups, deleteName),
                  regions: state.regions
                }

              case 'region':
                return {
                  player: state.player,
                  ships: state.ships,
                  groups: state.groups,
                  regions: removeItem(state.regions, deleteName)
                }
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


function updateStatus(array, target, status) {
  const index = findTargetIndex(array, target)
  array[index].status = status
  return array
}

function findTargetIndex(array, target) {
  for(let i in array) {
    if(array[i].name === target) return i
  }
  return -1
}