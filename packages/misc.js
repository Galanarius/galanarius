const fs = require('graceful-fs');
const mkdirp = require('mkdirp');
const copydir = require('copy-dir');
const path = require('path');

module.exports ={
 randomnum: function(min, max){
      return Math.floor(Math.random()*(max-min+1))+min;
   }
}