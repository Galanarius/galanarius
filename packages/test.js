const fs = require('graceful-fs');
const mkdirp = require('mkdirp');
const copydir = require('copy-dir');
const path = require('path');

const misc = require('./misc.js');
const npc = require('./npc.js')
const profile = require('./profile.js');
const actions = require('./actions.js');
const map = require('./map.js');

//var p = profile.getprofile('327925541556453398');
const test = new map.galaxy(2,2);
test.init();
//var test = map.getItem('327925541556453398', 0);
