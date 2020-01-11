const fs = require('graceful-fs');
const mkdirp = require('mkdirp');
const copydir = require('copy-dir');
const path = require('path');

const misc = require('./misc.js');
const npc = require('./npc.js')
const profile = require('./profile.js');
const resources = require('./resources.js');

var test = [];
for(var k = 0; k < 5; k++){
   test[k] = new npc.npc(27,100, "here", "self");
}
setTimeout(function(){
   npc.write(test);
}, 1000);