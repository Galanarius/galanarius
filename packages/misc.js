const fs = require('fs');
const mkdirp = require('mkdirp');
const copydir = require('copy-dir');

module.exports ={
 randomnum: function(min, max){
      return Math.floor(Math.random()*(max-min))+min+1;
   }
}