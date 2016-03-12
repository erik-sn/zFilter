import axios from 'axios'

const URL_INITIALIZE = 'https://zkillboard.com/api/kills/page/1/desc/'
const URL_GET_KILLS = 'https://zkillboard.com/api/kills/afterKillID/'
const URL_GET_JUMPS = 'http://127.0.0.1:8000/api/v1/route/'

export const INITIALIZE_LIST = 'INITIALIZE_LIST'
export const GET_KILLMAIL = 'GET_KILLMAIL'
export const FILTER_SYSTEM_CREATE = 'FILTER_SYSTEM_CREATE'
export const FILTER_SYSTEM_DELETE = 'FILTER_SYSTEM_DELETE'
export const FILTER_SYSTEM_MODIFY = 'FILTER_SYSTEM_MODIFY'
export const FILTER_JUMPS = 'FILTER_JUMPS'

export function getKillmails(maxId, system_filter) {
    const request = axios.get(URL_GET_KILLS + maxId + '/nocache?_=' + new Date().getTime())
    return {
        type: GET_KILLMAIL,
        payload: request
    }
}

export function intializeList() {
    const request = axios.get(URL_INITIALIZE + '/nocache?_=' + new Date().getTime())
    return {
        type: GET_KILLMAIL,
        payload: request
    }
}

export function createSystemFilter(system, systemId, jumps, ly) {
    const filter = {
      system: system,
      systemId: systemId,
      jumps: jumps,
      ly: ly
    }
    return {
        type: FILTER_SYSTEM_CREATE,
        payload: filter
    }
}

export function deleteSystemFilter(system) {
    return {
        type: FILTER_SYSTEM_DELETE,
        payload: system
    }
}

export function modifySystemFilter(system, systemId, key, value) {
    const update = {
      system: system,
      systemId: systemId,
      key: key,
      value: value
    }
    return {
        type: FILTER_SYSTEM_MODIFY,
        payload: update
    }
}

export function getJumps(origin, destination) {
  const request = axios.get(URL_GET_JUMPS + '/' + origin + '/' + destination)
  return {
        type: FILTER_JUMPS,
        payload: request
    }
}

