import axios from 'axios'

const URL_LISTEN = 'http://redisq.zkillboard.com/listen.php'
const URL_ALLIANCE = 'http://evewho.com/api.php?type=alliance&name='

export const INITIALIZE_KILLMAILS = 'INITIALIZE_KILLMAILS'
export const GET_KILLMAIL = 'GET_KILLMAIL'
export const UPDATE_KILLMAIL = 'UPDATE_KILLMAIL'
export const FILTER_KILLMAILS = 'FILTER_KILLMAILS'
export const GET_OPTIONS = 'GET_OPTIONS'
export const RESET_OPTIONS = 'RESET_OPTIONS'
export const SYSTEM_FILTER_CREATE = 'SYSTEM_FILTER_CREATE'
export const SYSTEM_FILTER_DELETE = 'SYSTEM_FILTER_DELETE'
export const SYSTEM_FILTER_UPDATE = 'SYSTEM_FILTER_UPDATE'
export const FILTER_CREATE = 'FILTER_CREATE'
export const FILTER_UPDATE = 'FILTER_UPDATE'
export const FILTER_DELETE = 'FILTER_DELETE'
export const INCREMENT_FILTERID = 'INCREMENT_FILTERID'

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

export function getKillmails(props) {
    const request = axios.get(URL_LISTEN)
    return {
        type: GET_KILLMAIL,
        payload: request,
        meta: {
            props: props
        }
    }
}

export function filterKillmails(props) {
    return {
        type: FILTER_KILLMAILS,
        payload: {
            killmails: props.killmail_list,
            props: props
        }
    }
}

export function updateKillmail(killmail) {
    return {
        type: UPDATE_KILLMAIL,
        payload: killmail
    }
}

export function setInitialKillmails(killmails) {
    return {
        type: INITIALIZE_KILLMAILS,
        payload: killmails
    }
}

export function incrementFilterID() {
    return {
        type: INCREMENT_FILTERID
    }
}

export function createSystemFilterAndEvaluate(system, systemId, jumps, ly, props) {
    return (dispatch, getState) => {
        Promise.resolve(dispatch(createSystemFilter(system, systemId, jumps, ly, props)))
            .then(dispatch(incrementFilterID()))
            .then(dispatch(filterKillmails(getState())))
    }
}

export function createSystemFilter(system, systemId, jumps, ly, props) {
    const filter = {
      system: system,
      systemId: systemId,
      filterID: props.filterID,
      jumps: jumps,
      ly: ly
    }

    const updatedState = props.system_filter.concat(filter)
    const request = axios.get(getJumpRangeUrl(updatedState))
    return {
        type: SYSTEM_FILTER_CREATE,
        payload: request,
        meta: {
          filter: updatedState,
          props: props

        }
    }
}

export function updateSystemFilterAndEvaluate(system, systemId, key, value, props) {
    return (dispatch, getState) => {
        Promise.resolve(dispatch(updateSystemFilter(system, systemId, key, value, props)))
            .then(dispatch(incrementFilterID()))
            .then(dispatch(filterKillmails(getState())))
    }
}

export function updateSystemFilter(system, systemId, key, value, props) {
    const system_filter = props.system_filter
    let updatedState = []
    for(let i = 0; i < system_filter.length; i++) {
        if(system_filter[i].system == system) {
            let filter = {
                system: system_filter[i].system,
                systemId: system_filter[i].systemId,
                jumps: system_filter[i].jumps,
                ly: system_filter[i].ly,
                filterID: props.filterID
            }
            filter[key] = value
            updatedState.push(filter)
        }
        else {
            updatedState.push(system_filter[i])
        }
    }

    const request = axios.get(getJumpRangeUrl(updatedState))
    return {
        type: SYSTEM_FILTER_UPDATE,
        payload: request,
        meta: {
            filter: updatedState,
            props: props
        }
    }
}

export function deleteSystemFilterAndEvaluate(system, props) {
    return (dispatch, getState) => {
        Promise.resolve(dispatch(deleteSystemFilter(system, props)))
            .then(dispatch(filterKillmails(getState())))
    }
}

export function deleteSystemFilter(system, props) {
    const currentState = props.system_filter
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
            filter: updatedState,
            props: props
          }
        }

      }
    }

}

export function createFilterAndEvaluate(type, id, name, props) {
    return (dispatch, getState) => {
        Promise.resolve(dispatch(createFilter(type, id, name, props)))
            .then(dispatch(incrementFilterID()))
            .then(dispatch(filterKillmails(getState())))
    }
}

export function createFilter(type, id, name, props) {
    console.log(props)
    return {
        type: FILTER_CREATE,
        payload: { type: type, id: id, name: name, status: 'both', filterID: props.filterID },
        meta: {
            props: props
        }
    }
}

export function updateFilterAndEvaluate(name, type, status, props) {
    return (dispatch, getState) => {
        Promise.resolve(dispatch(updateFilter(name, type, status, props)))
            .then(dispatch(incrementFilterID()))
            .then(dispatch(filterKillmails(getState())))
    }
}

export function updateFilter(name, type, status, props) {
    return {
        type: FILTER_UPDATE,
        payload: { name: name, type: type, status: status, filterID: props.filterID },
        meta: {
            props: props
        }
    }
}

export function deleteFilterAndEvaluate(name, type, props) {
    return (dispatch, getState) => {
        Promise.resolve(dispatch(deleteFilter(name, type, props)))
            .then(dispatch(filterKillmails(getState())))
    }
}

export function deleteFilter(name, type, props) {
    return {
        type: FILTER_DELETE,
        payload: { name: name, type: type },
        meta: {
            props: props
        }
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
           list.push({ name: regions[key].name, id: regions[key].id, type: 'region' });
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

