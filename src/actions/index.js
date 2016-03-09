import axios from 'axios'

const URL_INITIALIZE = 'https://zkillboard.com/api/kills/limit/200/desc/'
const URL_GET_KILLS = 'https://zkillboard.com/api/kills/afterKillID/'

export const INITIALIZE_LIST = 'INITIALIZE_LIST'
export const GET_KILLMAIL = 'GET_KILLMAIL'

export function getKillmails(maxId) {    console.log(maxId)
    const request = axios.get(URL_GET_KILLS + maxId + '/nocache?_=' + new Date().getTime())
    return {
        type: GET_KILLMAIL,
        payload: request
    }
}

export function intializeList() {
    const request = axios.get(URL_INITIALIZE)
    return {
        type: GET_KILLMAIL,
        payload: request
    }
}
