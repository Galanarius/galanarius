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
   }
}