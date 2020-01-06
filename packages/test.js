const fs = require('graceful-fs');
const mkdirp = require('mkdirp');
const copydir = require('copy-dir');
const path = require('path');

const misc = require('./misc.js');
const npc = require('./npc.js')
const profile = require('./profile.js');
const resources = require('./resources.js');
const names = JSON.parse(fs.readFileSync('../ref/names.json'));

async function test(){
      await npc.generate.f1({name: "Finn Strongfist", location: "hurb", coords: [0,100,27]});
}

for(var k = 0; k < 5; k++)
   test();