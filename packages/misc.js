const fs = require('graceful-fs');
const mkdirp = require('mkdirp');
const copydir = require('copy-dir');
const path = require('path');

module.exports ={
   /**
    * Generates a random whole number within the given inclusive bounds.
    * @param {Number} min The minimum positive value generated. 
    * @param {Number} max The maximum value generated.
    * @returns {Number} A whole number value.
    */
   randomnum: function(min, max){
      return Math.floor(Math.random()*(max-min+1))+min;
   }
}