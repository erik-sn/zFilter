import axios from 'axios'

const URL_LISTEN = 'http://redisq.zkillboard.com/listen.php'
const URL_OPTION = 'https://zkillboard.com/autocomplete'

export const INITIALIZE_KILLMAILS = 'INITIALIZE_KILLMAILS'
export const GET_KILLMAIL = 'GET_KILLMAIL'
export const GET_OPTIONS = 'GET_OPTIONS'
export const FILTER_SYSTEM_CREATE = 'FILTER_SYSTEM_CREATE'
export const FILTER_SYSTEM_DELETE = 'FILTER_SYSTEM_DELETE'
export const FILTER_SYSTEM_MODIFY = 'FILTER_SYSTEM_MODIFY'
export const FILTER_JUMPS = 'FILTER_JUMPS'

import { getJumpRangeUrl } from '../functions/system_functions'

export function getOptions(input) {
    const request = axios.get(`${URL_OPTION}/${input}`)
    return {
        type: GET_OPTIONS,
        payload: request
    }
}

export function resetOptions() {
    return {
        type: GET_OPTIONS,
        payload: []
    }
}

export function getKillmails(maxId, system_filter) {
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
    console.log(updatedState)
    return {
        type: FILTER_SYSTEM_CREATE,
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
          type: FILTER_SYSTEM_DELETE,
          payload: request,
          meta: {
            filter: updatedState
          }
        }

      }
    }

}

export function modifySystemFilter(system, systemId, key, value, currentState) {

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
      type: FILTER_SYSTEM_MODIFY,
      payload: request,
      meta: {
        filter: updatedState
      }
    }
}


