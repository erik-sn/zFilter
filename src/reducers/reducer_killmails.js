import { GET_KILLMAIL } from '../actions/index'

export default function(state = [], action) {
    switch (action.type) {
        case GET_KILLMAIL:
            let killmails = []
            for(let kill of action.payload.data) {
                 const shipID = kill.victim.shipTypeID
                 const systemID = kill.solarSystemID
                 const security = Math.round(systemData[systemID].security *100) / 100
                 if(!shipdata[shipID] || !systemData[systemID]) {
                     console.log('Ignoring ID: ', shipID )
                 }
                 else {
                     const killmail = {
                        killID: kill.killID,
                        shipID: shipID,
                        shipName: shipdata[shipID].shipname,
                        system: systemData[systemID].name,
                        security: security,
                        victimName: kill.victim.characterName,
                        victimCorp: kill.victim.corporationName,
                        victimAlliance: kill.victim.allianceName,
                        shipTypeID: kill.victim.shipTypeID,
                        time: kill.killTime
                    }
                    console.log('Name: ', killmail.victimName, ' Ship: ', killmail.shipName,' Time: ', killmail.time)
                    killmails.push(killmail)
                 }
            }
            console.log('Adding kills to list: ', killmails.length)
            return killmails.concat(state) // concatanate killmails to the beginning of array
    }
    return state
}


