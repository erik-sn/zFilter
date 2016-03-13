import axios from 'axios'

/**
 * See if a system exists in the system database by system name, and return it's info if it does
 * @param   {string}         input      - system name
 * @returns {string/boolean} If system exists the formatted name otherwise false
 */
export function systemExists(input) {
  const formattedInput = input.toLowerCase().trim()
  for(let key in systemData){
     if (systemData.hasOwnProperty(key) && systemData[key].name.toLowerCase() == formattedInput) {
         return [key, systemData[key].name];
     }
   }
   return false;
}

/**
 * Given a solar system name return its type id
 * @param   {string}  systemName - String representation of solar system name
 * @returns {integer/boolean} returns the type id if the system exists, boolean false if not
 */

export function getSystemID(systemName) {
   const formattedName = systemName.toLowerCase().trim()
   for(let key in systemData){
     if (systemData.hasOwnProperty(key) && systemData[key].name.toLowerCase() == formattedName) {
         return key;
     }
   }
   return false;
}


export function getJumpRange(destination, origin) {
  const URL_GET_JUMPS = `http://127.0.0.1:8000/api/v1/route/${destination}/${origin}`
   const request = axios.get(URL_GET_JUMPS).then(function(data) {
     console.log(data)
   })

}

/**
 * Given a target system, one or more systems to check against, and a limit, determine
 * if the target system is within light year range of at least one of the filtering
 * systems.
 *
 * @param   {integer} destinationID  - Destination system typeID
 * @param   {integer} originID       - Origin system typeID
 * @param   {integer} limit          - The lightyear limit the system must be within range of
 * @returns {boolean}                - if system is within limit
 */
export function inLyRange(destinationID, originID, limit) {
    const destination = systemData[destinationID]
    const xDestination = destination.x
    const yDestination = destination.y
    const zDestination = destination.z

    const origin = systemData[originID]
    const xOrigin = origin.x
    const yOrigin = origin.y
    const zOrigin = origin.z

    const distance = Math.sqrt(Math.pow((xOrigin - xDestination), 2)
                               + Math.pow((yOrigin - yDestination), 2)
                               + Math.pow((zOrigin - zDestination), 2))/9.461e15

    if(distance <= limit) {
        return true
    }
    return false
}
