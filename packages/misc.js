//Imports

module.exports ={
   /**
    * Generates a random whole number within the given inclusive bounds.
    * @param {Number} min The minimum positive value generated. 
    * @param {Number} max The maximum value generated.
    * @returns {Number} A whole number value.
    */
   randomnum: (min, max) => {
      return Math.floor(Math.random()*(max-min+1))+min;
   },
   /**
    * Takes a given level, and converts to the minimum amount of xp required to reach that level.
    * @param {Number} lvl The level being converted
    * @returns {Number} The minimum amount of xp needed to reach that level.
    */
   lvlTOxp: (lvl) => {
      return Math.round((100*(Math.pow(2,(lvl/5))+lvl))-215);
   },
   /**
    * Not yet implemented
    */
   xpTOlvl: (xp) => {
      // Not yet implemented
   }
}