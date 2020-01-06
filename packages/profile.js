const fs = require('graceful-fs');
const mkdirp = require('mkdirp');
const copydir = require('copy-dir');
const path = require('path');

module.exports ={
   create: function(user, userID){
      copydir('../ref/player-template', `../profiles/${userID}`,{utimes: true, mode: true, cover: true},(err)=>{if(err){throw err; return;}});
      setTimeout(function(){
         var c = JSON.parse(fs.readFileSync(`../profiles/${userID}/profile.json`));
      c.username = user;
      c.ID = userID;
      setTimeout(function(){
         fs.writeFileSync(`../profiles/${userID}/profile.json`, JSON.stringify(c), (err) => {if(err) throw err});
      }, 500);
      }, 500);
      
   },
   getprofile: function(userID){
      //console.log(fs.existsSync(`../profiles/${userID}/profile.json`));
      return JSON.parse(fs.readFileSync(`../profiles/${userID}/profile.json`));
   },
   displayprofile: {
      basic: function(c){
         var result =      `username:           ${c.username}\n`;
         result +=         `xp-level:           ${c.xp}-${c.level}\n`;
         result +=         `credits:            ${c.credits}\n`;
         result +=         `faction-rank:       ${c.faction}-${c.rank}`;
         return result;
      },
      location: function(c){
         return            `location:           ${c.location}, [${c.coords[1]},${c.coords[2]}]`;
      },
      resources: function(c){
         var result =      `personnel:          ${c.resources.personnel[0]}/${c.resources.personnel[1]}\n`;
         result +=         `natural materials:  ${c.resources.nat_mat}\n`;
         result +=         `ore:                ${c.resources.tera_mat}\n`;
         result +=         `seeds:              ${c.resources.seed}\n`;
         result +=         `stone:              ${c.resources.stone}\n\n`;

         result +=         `crops:              ${c.resources.crop}\n`;
         result +=         `food:               ${c.resources.food}\n\n`;

         result +=         `T1 synthetics:      ${c.resources.synthI}\n`;
         result +=         `T2 synthetics:      ${c.resources.synthII}\n`;
         result +=         `T3 synthetics:      ${c.resources.synthIII}\n`;
         result +=         `T4 synthetics:      ${c.resources.synthIV}\n\n`;

         result +=         `slag:               ${c.resources.slag}\n`;
         result +=         `T1 metals:          ${c.resources.metalI}\n`;
         result +=         `T2 metals:          ${c.resources.metalII}\n`;
         result +=         `T3 metals:          ${c.resources.metalIII}\n`;
         result +=         `T4 metals:          ${c.resources.metalIV}\n\n`;
         
         result +=         `relic tokens:       ${c.resources.relic_token}\n\n`;

         result +=         `research points:    ${c.resources.research_point}\n`;
         result +=         `skill points:       ${c.resources.skill_point}\n`;
         result +=         `tech points:        ${c.resources.tech_point}`;
         return result;
      },
      skills: function(c){
         var result =      `attacking:          ${c.skills.attacking}\n`;
         result +=         `defending:          ${c.skills.defending}\n\n`;
         
         result +=         `recruiting:         ${c.skills.recruiting}\n`;
         result +=         `researching:        ${c.skills.researching}\n\n`;
         
         result +=         `harvesting:         ${c.skills.harvesting}\n`;
         result +=         `farming:            ${c.skills.farming}\n`;
         result +=         `cooking:            ${c.skills.cooking}\n`;
         result +=         `synthesizing:       ${c.skills.synthesizing}\n\n`;

         result +=         `excavation:         ${c.skills.excavation}\n`;
         result +=         `refining:           ${c.skills.refining}\n`;
         result +=         `sifting:            ${c.skills.refining}\n`;
         return result;
      }
   }
}