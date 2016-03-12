import axios from 'axios'

const URL_INITIALIZE = 'https://zkillboard.com/api/kills/page/1/desc/'
const URL_GET_KILLS = 'https://zkillboard.com/api/kills/afterKillID/'

export const INITIALIZE_LIST = 'INITIALIZE_LIST'
export const GET_KILLMAIL = 'GET_KILLMAIL'
export const FILTER_SYSTEM_CREATE = 'FILTER_SYSTEM_CREATE'
export const FILTER_SYSTEM_MODIFY = 'FILTER_SYSTEM_MODIFY'

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

export function createSystemFilter(system, jumps, ly) {
    const filter = {
      system: system,
      jumps: jumps,
      ly: ly
    }
    return {
        type: FILTER_SYSTEM_CREATE,
        payload: filter
    }
}

//export function modifySystemFilter(system, label, quantity) {
//    const filter = {
//      system: system,
//      label: label,
//      quantity: quantity
//    }
//    return {
//        type: FILTER_SYSTEM_MODIFY,
//        payload: filter
//    }
//}

