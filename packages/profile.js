const fs = require('graceful-fs');
const copydir = require('copy-dir');

module.exports ={
   /**
    * Copies the player profile template into a new directory based off the given parameters.
    * @param {String} user The current username of the player.
    * @param {String} userID A numerical 14 digit value that is the reference to the player for the system. 
    */
   create: function(user, userID){
      copydir('../ref/player-template', `../profiles/${userID}`,{utimes: true, mode: true, cover: true},(err)=>{if(err){throw err;}});
      setTimeout(function(){
      var c = JSON.parse(fs.readFileSync(`../ref/player-template/profile.json`));
      c.username = user;
      c.ID = userID;
      setTimeout(function(){
         fs.writeFileSync(`../profiles/${userID}/profile.json`, JSON.stringify(c), (err) => {if(err) throw err});
      }, 1000);
      }, 1000);
      
   },
   /**
    * Retrieves the profile.json file from the referenced user's files.
    * @param {String} userID A numerical 14 digit value that is the reference to the player for the system.
    * @returns {JSON} The player's profile.json
    */
   getprofile: function(userID){
      //console.log(fs.existsSync(`../profiles/${userID}/profile.json`));
      return JSON.parse(fs.readFileSync(`../profiles/${userID}/profile.json`));
   },
   /**
    * Functions for displaying attributes of the player's profile via text.
    */
   displayprofile: {
      /**
       * Displays the basic, general information about the player.
       * @param {Profile} c The player's profile.
       */
      basic: function(c){
         var result =      `username:           ${c.username}\n`;
         result +=         `level-exp:           ${c.lvl}-${c.xp}\n`;
         result +=         `credits:            ${c.credits}\n`;
         result +=         `faction-rank:       ${c.faction}-${c.rank}`;
         return result;
      },
      /**
       * Displays the coordinates and name of the location of the player's current position.
       * @param {Profile} c The player's profile.
       */
      location: function(c){
         return            `location:           ${c.loc}, [${c.coords[0]},${c.coords[1]}]`;
      },
      /**
       * Displays the player's current resource amounts.
       * @param {Profile} c The player's profile.
       */
      resources: function(c){
         var result =      `personnel:          ${c.resources.personnel[0]}/${c.resources.personnel[1]}\n\n`;

         result +=         `helium 1:           ${c.resources.heliumI}\n`;
         result +=         `helium 2:           ${c.resources.heliumII}\n`;
         result +=         `helium 3:           ${c.resources.heliumIII}\n`;
         result +=         `hydrogen:           ${c.resources.hydrogen}\n`;
         result +=         `oil:                ${c.resources.oil}\n\n`;

         result +=         `ftl fuel:           ${c.resources.ftl_fuel}\n`;
         result +=         `sublight fuel:      ${c.resources.sublight_fuel}\n\n`;

         result +=         `natural materials:  ${c.resources.nat_mat}\n`;
         result +=         `tera materials:     ${c.resources.tera_mat}\n`;
         result +=         `seeds:              ${c.resources.seed}\n`;
         result +=         `stone:              ${c.resources.stone}\n\n`;

         result +=         `crops:              ${c.resources.crop}\n`;
         result +=         `food:               ${c.resources.food}\n\n`;

         result +=         `T1 synthetics:      ${c.resources.synthI}\n`;
         result +=         `T2 synthetics:      ${c.resources.synthII}\n`;
         result +=         `T3 synthetics:      ${c.resources.synthIII}\n`;
         result +=         `T4 synthetics:      ${c.resources.synthIV}\n\n`;

         result +=         `slag:               ${c.resources.slag}\n`;
         result +=         `T1 ore:             ${c.resources.oreI}\n`;
         result +=         `T2 ore:             ${c.resources.oreII}\n`;
         result +=         `T3 ore:             ${c.resources.oreIII}\n`;
         result +=         `T4 ore:             ${c.resources.oreIV}\n\n`;
         
         result +=         `relic tokens:       ${c.resources.relic_token}\n\n`;

         result +=         `research points:    ${c.resources.research_point}\n`;
         result +=         `skill points:       ${c.resources.skill_point}\n`;
         result +=         `tech points:        ${c.resources.tech_point}\n\n`;

         result +=         `antimatter:         ${c.resources.antimatter}`;
         return result;
      },
      /**
       * Displays the player's current skill values.
       * @param {Profile} c The player's profile.
       */
      skills: function(c){
         var result =      `attacking:          ${c.skills.attacking}\n`;
         result +=         `defending:          ${c.skills.defending}\n\n`;
         
         result +=         `recruiting:         ${c.skills.recruiting}\n`;
         result +=         `researching:        ${c.skills.researching}\n\n`;

         result +=         `ftl piloting:       ${c.skills.ftl_piloting}\n`;
         result +=         `sublight piloting:  ${c.skills.sublight_piloting}\n\n`;
         
         result +=         `harvesting:         ${c.skills.harvesting}\n`;
         result +=         `farming:            ${c.skills.farming}\n`;
         result +=         `cooking:            ${c.skills.cooking}\n`;
         result +=         `synthesizing:       ${c.skills.synthesizing}\n\n`;

         result +=         `siphoning:          ${c.skills.siphoning}\n`;
         result +=         `filtration:         ${c.skills.filtration}\n\n`;

         result +=         `excavation:         ${c.skills.excavating}\n`;
         result +=         `smelting:           ${c.skills.smelting}\n`;
         result +=         `sifting:            ${c.skills.sifting}\n`;
         return result;
      }
   },
   /**
    * Determines which faction the player is joining, then assigns the appropriate value to their profile.json file.
    * @param {String} userID A numerical 14 digit value that is the reference to the player for the system. 
    * @param {String} choice The faction the player is choosing to join.
    */
   chooseFaction: function(userID, choice){
      var c = this.getprofile(userID);
      choice = choice.toLowerCase();
      switch(choice){
         case 'symbic':
         case 'symbic-foundation':
         case 'symbic_foundation':
         case 'symbic foundation':
            c.faction = 'symbic';
            fs.writeFileSync(`../profiles/${userID}/profile.json`, JSON.stringify(c), (err) => {if(err) throw err});
            return 'Symbic Foundation';
         case 'regalia':
         case 'regalia-court':
         case 'regalia_court':
         case 'regalia court':
            c.faction = 'regalia';
            fs.writeFileSync(`../profiles/${userID}/profile.json`, JSON.stringify(c), (err) => {if(err) throw err});
            return 'Regalia Court';
         case 'empirus':
         case 'empirus-confederation':
         case 'empirus_confederation':
         case 'empirus confederation':
            c.faction = 'empirus';
            fs.writeFileSync(`../profiles/${userID}/profile.json`, JSON.stringify(c), (err) => {if(err) throw err});
            return 'Empirus Confederation';
         default:
            return 'ERR';
      }
   }
}
