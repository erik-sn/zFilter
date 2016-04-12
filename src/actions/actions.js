import axios from 'axios'

const URL_LISTEN = 'http://redisq.zkillboard.com/listen.php'
const URL_ALLIANCE = 'http://evewho.com/api.php?type=alliance&name='

export const INITIALIZE_KILLMAILS = 'INITIALIZE_KILLMAILS'
export const GET_KILLMAIL = 'GET_KILLMAIL'
export const GET_OPTIONS = 'GET_OPTIONS'
export const RESET_OPTIONS = 'RESET_OPTIONS'
export const SYSTEM_FILTER_CREATE = 'SYSTEM_FILTER_CREATE'
export const SYSTEM_FILTER_DELETE = 'SYSTEM_FILTER_DELETE'
export const SYSTEM_FILTER_UPDATE = 'SYSTEM_FILTER_UPDATE'
export const FILTER_CREATE = 'FILTER_CREATE'
export const FILTER_UPDATE = 'FILTER_UPDATE'
export const FILTER_DELETE = 'FILTER_DELETE'

import { getJumpRangeUrl } from '../functions/system_functions'

export function getOptions(input) {
    const request = axios.get(URL_ALLIANCE + input)
    return {
        type: GET_OPTIONS,
        payload: request,
        meta: {
            options: findOptions(input)
        }
    }
}

export function resetOptions() {
    return {
        type: RESET_OPTIONS,
        payload: []
    }
}

export function getKillmails() {
    const request = axios.get(URL_LISTEN)
    return {
        type: GET_KILLMAIL,
        payload: request
    }
}

export function setInitialKillmails(killmails) {
    return {
        type: INITIALIZE_KILLMAILS,
        payload: killmails
    }
}

export function createSystemFilter(system, systemId, jumps, ly, currentSystemFilter) {
    const filter = {
      system: system,
      systemId: systemId,
      jumps: jumps,
      ly: ly
    }

    const updatedState = currentSystemFilter.concat(filter)
    const request = axios.get(getJumpRangeUrl(updatedState))
    return {
        type: SYSTEM_FILTER_CREATE,
        payload: request,
        meta: {
          filter: updatedState
        }
    }
}

export function deleteSystemFilter(system, currentState) {
     for(let i = 0; i < currentState.length; i++) {
      if(currentState[i].system == system) {
        const updatedState = currentState.slice(0, i).concat(currentState.slice(i + 1))

        let request = false
        if(updatedState.length > 0) {
          request = axios.get(getJumpRangeUrl(updatedState))
        }
        return {
          type: SYSTEM_FILTER_DELETE,
          payload: request,
          meta: {
            filter: updatedState
          }
        }

      }
    }

}

export function updateSystemFilter(system, systemId, key, value, currentState) {

    let updatedState = []
    for(let i = 0; i < currentState.length; i++) {
      if(currentState[i].system == system) {
        let filter = {
          system: currentState[i].system,
          systemId: currentState[i].systemId,
          jumps: currentState[i].jumps,
          ly: currentState[i].ly
        }
        filter[key] = value
        updatedState.push(filter)
      }
      else {
        updatedState.push(currentState[i])
      }
    }

    const request = axios.get(getJumpRangeUrl(updatedState))
    return {
      type: SYSTEM_FILTER_UPDATE,
      payload: request,
      meta: {
        filter: updatedState
      }
    }
}

export function createFilter(type, id, name) {
    return {
        type: FILTER_CREATE,
        payload: { type: type, id: id, name: name, status: 'both' }
    }
}

export function updateFilter(name, type, status) {
    return {
        type: FILTER_UPDATE,
        payload: { name: name, type: type, status: status }
    }
}

export function deleteFilter(name, type) {
    return {
        type: FILTER_DELETE,
        payload: { name: name, type: type }
    }
}



function findOptions(input) {
   let list = []
   const formattedName = input.toLowerCase().trim()
   if(formattedName.length > 2) {
     for(let key in systemData){
       if (systemData.hasOwnProperty(key) && systemData[key].name.toLowerCase().indexOf(formattedName) !== -1) {
           list.push({ name: systemData[key].name, id: key, type: 'system' });
       }
     }
     for(let key in ships){
       if (ships.hasOwnProperty(key) && ships[key].name.toLowerCase().indexOf(formattedName) !== -1) {
           list.push({ name: ships[key].name, id: ships[key].typeID, type: 'ship' });
       }
     }
     for(let key in regions){
       if (regions.hasOwnProperty(key) && regions[key].name.toLowerCase().indexOf(formattedName) !== -1) {
           list.push({ name: regions[key].name, id: regions[key].typeID, type: 'region' });
       }
     }
     for(let group in groups){
       if (group.toLowerCase().indexOf(formattedName) !== -1) {
           list.push({ name: group, id: groups[group][0], ships: groups[group], type: 'group' });
       }
     }
   }
   return list
}

