const fs = require('graceful-fs');
const mkdirp = require('mkdirp');
const copydir = require('copy-dir');
const path = require('path');
const misc = require('./misc.js');

const names = JSON.parse(fs.readFileSync('../ref/names.json'));

class NPC{
   constructor(x, y, loc, ldr, t){
      this.state = {
         leader: ldr,
         tier: t,
         coorX: x,
         coorY: y,
         location: loc,
         npcID: null,
         name: null,
         gender: null,
         priority: ["attacking", "defending", "recruiting", "researching", "harvesting", "excavation"],
         n: null
      }
      this.generate();
   }
   move(){

   }
   act(){

   }
}

class Commander extends NPC{

}

module.exports = {
   npc: NPC,
   commander: Commander,
   write: async function(ns){
      for(var k = 0; k < ns.length; k++){
         fs.writeFileSync(`../npcs/${ns[k].state.n.npcID}.json`, JSON.stringify(ns[k].state.n));
      }
   },
}