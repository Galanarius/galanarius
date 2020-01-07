const fs = require('graceful-fs');
const mkdirp = require('mkdirp');
const copydir = require('copy-dir');
const path = require('path');

const misc = require('./misc.js');
const npc = require('./npc.js')
const profile = require('./profile.js');
const resources = require('./resources.js');

var test = new npc.npc(27,100, "hurb", "self", 5);
setTimeout(function(){
test.write();
}, 1000)