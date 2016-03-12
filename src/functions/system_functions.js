  /**
   * See if a system exists in the system database by system name
   * @param   {string} input - system name
   * @param   {boolean} returnName - if true returns system name, if false returns id
   * @returns {string/boolean}  If system exists the formatted name or systemID is returned,
   *                            otherwise false is returned
   */

export function systemExists(input, returnName) {
  const formattedInput = input.toLowerCase().trim()
  for(let key in systemData){
       if (systemData.hasOwnProperty(key) && systemData[key].name.toLowerCase() == formattedInput) {
         if(returnName) {
           return systemData[key].name;
         }
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
 * @returns {boolean}                - If system is in range
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
        return [true, distance]
    }
    return [false, -1]
}
