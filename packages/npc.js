const fs = require('graceful-fs');
const mkdirp = require('mkdirp');
const copydir = require('copy-dir');
const path = require('path');
const misc = require('./misc.js');

const names = JSON.parse(fs.readFileSync('../ref/names.json'));

module.exports = {
   generate: {
      init: async function(leader){
         this.f1(leader);
      },
      init: async function(coorX, coorY){

      },
      f1: async function(leader){
         console.log(`starting phase 1`);
         var tier = misc.randomnum(1,4);
         var npcID = null;
         for(var k = 0; k < 9; k++){
            if(k == 0)
               npcID = `${misc.randomnum(1,10)-1}`;
            else
               npcID += `${misc.randomnum(1,10)-1}`;
         }
         await copydir('../ref/npc-template', `../npcs/${npcID}`,{utimes: true, mode: true, cover: true},(err)=>{if(err){throw err; return;}});
         console.log(`starting phase 2`);
         this.f2(npcID, leader);
      },

      f2: async function(npcID, leader){
         var name = null;
         var gender = null;
         var n = fs.readFileSync(`../npcs/${npcID}/profile.json`);
         if(misc.randomnum(1,2) == 1){
            name = names.Male[misc.randomnum(1,260)-1];
            gender = 'Male';
         }
         else{
            name = names.Female[misc.randomnum(1,260)-1];
            gender = 'Female';
         }
         name += ` ${names.Last[misc.randomnum(1,100)-1]}`;

         var priority = ["attacking", "defending", "recruiting", "researching", "harvesting", "excavation"];
         for(var k = 0; k < 500000; k++){
            priority.sort(() => Math.random() - 0.5);
         }

         n.name = name;
         n.desig = npcID;
         n.leader = leader.name;
         n.location = leader.location;
         n.coords = leader.coords;
         console.log(`Priority 0: ${priority[0]}\n${n.skills[priority[0]]}`);
      }
   },
   getnpc: async function(npcID){

   },
   npc: {

   },
   commander: {

   }
}