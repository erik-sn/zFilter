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


export function getSystemID(systemName) {
   const formattedName = systemName.toLowerCase().trim()
   for(let key in systemData){
     if (systemData.hasOwnProperty(key) && systemData[key].name.toLowerCase() == formattedName) {
         return key;
     }
   }
   return false;
}


/**
 * Given a target system, one or more systems to check against, and a limit, determine
 * if the target system is within light year range of at least one of the filtering
 * systems.
 *
 * @param   {integer} destinationID  - Destination system typeID
 * @param   {integer} originID       - Origin system typeID
 * @param   {integer} limit          - The lightyear limit the system must be within range of
 * @returns {array}                - Index 0: if system is in range, Index1: ly distance to destination
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
//    console.log('LY Limit: ', limit, ' distance: ', distance,' dest: ', destinationID, ' origin: ', originID)
    if(distance <= limit) {
        return true
    }
    return false
}
