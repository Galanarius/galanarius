const fs = require('graceful-fs');
const mkdirp = require('mkdirp');
const copydir = require('copy-dir');
const path = require('path');

const misc = require('./misc.js');
const npc = require('./npc.js')
const profile = require('./profile.js');
const actions = require('./actions.js');

var p = profile.getprofile('327925541556453398');

var temp1 = Math.round(100-(100/Math.pow(2,(1+Math.random())/1.5))) * (Math.random()*p.skills.excavating);
var temp2 = Math.round((100-temp1)/Math.pow(2,(1+Math.random()/2.5))) * (Math.random()*p.skills.excavating);
var temp3 = Math.round((100-temp1-temp2)/Math.pow(2,(1+Math.random())/2)) * (Math.random()*p.skills.excavating);
var temp4 = Math.round(100-temp3-temp2-temp1) * (Math.random()*p.skills.excavating);

console.log(`${temp1}\n${temp2}\n${temp3}\n${temp4}\n\n${temp1+temp2+temp3+temp4}`);