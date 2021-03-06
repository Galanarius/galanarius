const misc = require('./misc.js');
const profile = require('./profile.js');
const map = require('./map.js');

module.exports = {
   gather:{
      /**
       * Determines the resource being gathered and returns how much is gained based off the profile calling it.
       * @param {Profile} p The profile referenced.
       * @param {String} res The resource gathered. 
       * @returns {Number} The amount of the resource gained or -1 for ERR.
       */
      gather: (p, res) => {
         res = res.toLowerCase();
         switch(res){
            case 'pers':
            case 'personnel':
            case 'personel':
            case 'people':
            case 'person':
            case 'recruiting':
            case 'recruitting': 
            case 'recruit':
            case 'recruitt':
               return this.personnel(p);
            case 'nat':
            case 'nat_mat':
            case 'natmat':
            case 'nat mat':
            case 'wood':
               return this.nat_mat(p);
            case 'tera':
            case 'tera_mat':
            case 'tera_mats':
            case 'teramat':
            case 'termats':
            case 'tera mat':
            case 'tera mats':
            case 'mine':
            case 'mining':
               return this.tera_mat(p);
            case 'seed':
            case 'seeds':
            case 'sowing':
            case 'sow':
               return this.seed(p);
            case 'crop':
            case 'crops':
            case 'produce':
               return this.crop(p);
            case 'stone':
            case 'stones':
            case 'rock':
            case 'rocks':
               return this.stone(p);
            case 'slag':
            case 'gravel':
            case 'gravvel':
            case 'slagging':    
            case 'slags':            
               return this.slag(p);
            case 'res': 
            case 'research':
            case 'reaserch':
            case 'reasearch':
            case 'reserch':
            case 'researching':
            case 'reasearching':
            case 'reserching':
            case 'reaserching':
            case 'researches':                  
               return this.research(p);
            case 'anti':
            case 'antimatter':
            case 'animatter':      
            case 'antimater':
               return this.antimatter(p);
            default:
               return -1;
         }
      },
      /**
       * Give the matching resource for a given alias.
       * @param {String} alias The alias to check for.
       * @returns {String} The corresponding resource to the given alias.
       */
      aliasToRes: (alias) => {
         alias = alias.toLowerCase();
         alias = alias.trim();
         switch(alias){
            case 'pers':
            case 'personnel':
            case 'personel':
            case 'people':
            case 'person':
            case 'recruiting':
            case 'recruitting': 
            case 'recruit':
            case 'recruitt':
                return 'personnel';
            case 'nat':
            case 'nat_mat':
            case 'natmat':
            case 'nat mat':
            case 'wood':
                return 'nat_mat';
            case 'tera':
            case 'tera_mat':
            case 'tera_mats':
            case 'teramat':
            case 'termats':
            case 'tera mat':
            case 'tera mats':
            case 'mine':
            case 'mining':
                return 'tera_mat';
            case 'seed':
            case 'seeds':
            case 'sowing':
            case 'sow':
                temp2 = 'seed';
                break;
            case 'crop':
            case 'crops':
            case 'produce':
                return 'crop';
            case 'stone':
            case 'stones':
            case 'rock':
            case 'rocks':
                return 'stone';
            case 'slag':
            case 'gravel':
            case 'gravvel':
            case 'slagging':    
            case 'slags':            
                return 'slag';
            case 'res': 
            case 'research':
            case 'reaserch':
            case 'reasearch':
            case 'reserch':
            case 'researching':
            case 'reasearching':
            case 'reserching':
            case 'reaserching':
            case 'researches':                  
                return 'research_point';
            case 'anti':
            case 'antimatter':
            case 'animatter':     
            case 'antimater':
              return 'antimatter';
            default:
               return `no resource found for ${alias}`;
          }
      },
      /**
       * Determines the number of personnel gain.
       * @param {Profile} p The profile referenced.
       * @returns {Number} The amount of personnel gained.
       */
      personnel: (p) => {
         return Math.floor(Math.random()*10*Math.log(p.skills.recruiting+1))+1;
      },
      /**
       * Determines the number of nat_mat gain.
       * @param {Profile} p The profile referenced.
       * @returns {Number} The amount of nat_mat gained.
       */
      nat_mat: (p) => {
         return Math.round(misc.randomnum(1,5)*10*Math.log(p.skills.harvesting+1));
      },
      /**
       * Determines the number of tera_mat gain.
       * @param {Profile} p The profile referenced.
       * @returns {Number} The amount of tera_mat gained.
       */
      tera_mat: (p) => {
         return Math.round(misc.randomnum(1,5)*10*Math.log(p.skills.excavating+1));
      },
      /**
       * Determines the number of seed gain.
       * @param {Profile} p The profile referenced.
       * @returns {Number} The amount of seed gained.
       */
      seed: (p) => {
         return Math.round(misc.randomnum(1,5)*10*Math.log(p.skills.harvesting+1));
      },
      /**
       * Determines the number of crop gain.
       * @param {Profile} p The profile referenced.
       * @returns {Number} The amount of crop gained.
       */
      crop: (p) => {
         return Math.round(misc.randomnum(1,5)*10*Math.log(p.skills.farming+1));
      },
      /**
       * Determines the number of stone gain.
       * @param {Profile} p The profile referenced.
       * @returns {Number} The amount of stone gained.
       */
      stone: (p) => {
         return Math.round(misc.randomnum(1,5)*10*Math.log(p.skills.excavating+1));
      },
      /**
       * Determines the number of slag gain.
       * @param {Profile} p The profile referenced.
       * @returns {Number} The amount of slag gained.
       */
      slag: (p) => {
         return Math.round(misc.randomnum(1,5)*10*Math.log(p.skills.excavating+1));
      },
      /**
       * Determines if a relic token is awarded or not.
       * @param {Profile} p The profile referenced.
       * @returns {Number} returns 1 or 0 relics.
       */
      relic: (p) => {
         return Math.floor(Math.random()-.55);
      },
      /**
       * Determines the number of research_point gain.
       * @param {Profile} p The profile referenced.
       * @returns {Number} The amount of research_point gained.
       */
      research: (p) => {
         return Math.round(misc.randomnum(1,5)*10*Math.log(p.skills.researching+1));
      },
      /**
       * Determines the number of antimatter gain.
       * @param {Profile} p The profile referenced.
       * @returns {Number} The amount of antimatter gained.
       */
      antimatter: (p) => {
         return Math.round(Math.random);
      },
      /**
       * Determines the number of hydrogen gain.
       * @param {Profile} p The profile referenced.
       * @returns {Number} The amount of hydrogen gained.
       */
      hydrogen: (p) => {
         return Math.round(misc.randomnum(1,5)*10*Math.log(p.skills.siphoning+1));
      },
      /**
       * Determines the number of oil gain.
       * @param {Profile} p The profile referenced.
       * @returns {Number} The amount of oil gained.
       */
      oil: (p) => {
         return Math.round(misc.randomnum(1,5)*10*Math.log(p.skills.siphoning+1));
      },
      /**
       * Determines the number of heliumI gain.
       * @param {Profile} p The profile referenced.
       * @returns {Number} The amount of heliumI gained.
       */
      heliumI: (p) =>{
         return Math.round(misc.randomnum(1,5)*10*Math.log(p.skills.siphoning+1));
      },
      /**
       * Determines the number of heliumII gain.
       * @param {Profile} p The profile referenced.
       * @returns {Number} The amount of heliumII gained.
       */
      heliumII: (p) => {
         return Math.round(misc.randomnum(1,5)*10*Math.log(p.skills.siphoning+p.skills.filtering+1));
      },
      /**
       * Determines the number of heliumIII gain.
       * @param {Profile} p The profile referenced.
       * @returns {Number} The amount of heliumIII gained.
       */
      heliumIII: (p) => {
         return Math.round(misc.randomnum(1,5)*10*Math.log(p.skills.researching+p.skills.filtering+1));
      }
   },
   purifying: {
      /**
       * Used to determine the purifying Function needed to be called, and returns the products of that Function.
       * @param {Profile} p The edited profile.
       * @param {String} res The name of the resource being purified.
       * @param {Number} amt The amount of the resource being purified.
       * @returns {Profile} A modified version of the given profile.
       */
      purifying: (p, res, amt) => {
         res = res.toLowerCase();
         switch(res){
            case 'nat_mat':
            case 'nat_mats':
            case 'nat mat':
            case 'nat mats':
            case 'synthesize':
            case 'synthesizing':
               return this.synthesize(p, amt);
            case 'tera_mat':
            case 'tera_mats':
            case 'tera mat':
            case 'tera mats':
            case 'smelt':
            case 'smelting':
               return this.smelt(p, amt);
            case 'slag':
            case 'sift':
            case 'sifting':
               return this.sift(p, amt);
            case 'crop':
            case 'crops':
            case 'cook':
            case 'cooking':
               return this.cook(p, amt);
            default:
               return 'ERR';
         }
      },
      /**
       * Calculates and adds the resources purified, and subtracts the resources used.
       * @param {Profile} p The edited profile.
       * @param {Number} amt The amount of tera_mat being smelted.
       * @returns {Profile} A modified version of the given profile.
       */
      smelt: (p, amt) => {
         let temp1 = Math.round(100-(100/Math.pow(2,(1+Math.random())/1.5))) * (Math.random()*10*Math.log(p.skills.smelting+1));
         let temp2 = Math.round((100-temp1)/Math.pow(2,(1+Math.random()/2.5))) * (Math.random()*10*Math.log(p.skills.smelting+1));
         let temp3 = Math.round((100-temp1-temp2)/Math.pow(2,(1+Math.random())/2)) * (Math.random()*10*Math.log(p.skills.smelting+1));
         let temp4 = Math.round(100-temp3-temp2-temp1) * (Math.random()*10*Math.log(p.skills.smelting+1));
         p.resources.oreI += amt*temp1/100;
         p.resources.oreII += amt*temp2/100;
         p.resources.oreIII += amt*temp3/100;
         p.resources.oreIV += amt*temp4/100;

         p.resources.tera_mat -= amt;

         return p;
      },
      /**
       * Calculates and adds the resources purified, and subtracts the resources used.
       * @param {Profile} p The edited profile.
       * @param {Number} amt The amount of nat_mat being synthesized.
       * @returns {Profile} A modified version of the given profile.
       */
      synthesize: (p, amt) => {
         let temp1 = Math.round(100-(100/Math.pow(2,(1+Math.random())/1.5))) * (Math.random()*10*Math.log(p.skills.synthesizing+1));
         let temp2 = Math.round((100-temp1)/Math.pow(2,(1+Math.random()/2.5))) * (Math.random()*10*Math.log(p.skills.synthesizing+1));
         let temp3 = Math.round((100-temp1-temp2)/Math.pow(2,(1+Math.random())/2)) * (Math.random()*10*Math.log(p.skills.synthesizing+1));
         let temp4 = Math.round(100-temp3-temp2-temp1) * (Math.random()*10*Math.log(p.skills.synthesizing+1));
         p.resources.synthI += amt*temp1/100;
         p.resources.synthII += amt*temp2/100;
         p.resources.synthIII += amt*temp3/100;
         p.resources.synthIV += amt*temp4/100;

         p.resources.nat_mat -= amt;

         return p;
      },
      /**
       * Calculates and adds the resources purified, and subtracts the resources used.
       * @param {Profile} p The edited profile.
       * @param {Number} amt The amount of slag being sifted.
       * @returns {Profile} A modified version of the given profile.
       */
      sift: (p, amt) => {
         let temp1 = Math.round(100-(100/Math.pow(2,(1+Math.random())/1.5))) * (Math.random()*10*Math.log(p.skills.sifting+1));
         let temp2 = Math.round((100-temp1)/Math.pow(2,(1+Math.random()/2.5))) * (Math.random()*10*Math.log(p.skills.sifting+1));
         let temp3 = Math.round((100-temp1-temp2)/Math.pow(2,(1+Math.random())/2)) * (Math.random()*10*Math.log(p.skills.sifting+1));
         let temp4 = Math.round(100-temp3-temp2-temp1) * (Math.random()*10*Math.log(p.skills.sifting+1));
         p.resources.oreI += amt*temp1/100;
         p.resources.oreII += amt*temp2/100;
         p.resources.oreIII += amt*temp3/100;
         p.resources.oreIV += amt*temp4/100;

         p.resources.slag -= amt;

         return p;
      },
      /**
       * Calculates and adds the resources purified, and subtracts the resources used.
       * @param {Profile} p The edited profile.
       * @param {Number} amt The amount of crop being cooked.
       * @returns {Profile} A modified version of the given profile.
       */
      cook: (p, amt) => {
         p.resources.food += amt*Math.random()*10*Math.log(p.skills.cooking+1);

         p.resources.crop -= amt;
         
         return p;
      },
      /**
       * Calculates and adds the resources purified, and subtracts the resources used.
       * @param {Profile} p The edited profile.
       * @param {Number} amt The amount of helium being filtered.
       * @returns {Profile} A modified version of the given profile.
       */
      filter: (p, amt, lvl) => {
         if(lvl == 2){
            p.resources.heliumII += amt*Math.random()*10*Math.log(p.skills.filtering+1);

            p.resources.heliumI -= amt;
         
            return p;
         }
         else if(lvl ==3){
            p.resources.heliumIII += amt*Math.random()*10*Math.log(p.skills.filtering+1);

            p.resources.heliumII -= amt;
         
            return p;
         }
         else{
            return p;
         }
      }
   },
   move: {
      /**
       * Moves the player's location based off a series of preconditions.
       * @param {String} userID The user being moved.
       * @param {String} id Where they wish to be moved.
       */
      sl: (userID, id) => {
         let p = profile.getprofile(userID);
         let dest = map.getDest(userID, id);
      },
      /**
       * Moves the player's coordinates based off a series of preconditions.
       * @param {String} userID The user being moved.
       * @param {String} id Where they wish to be moved.
       */
      ftl: (userID, id) => {
         let p = profile.getprofile(userID);
         let dest = map.getDest(userID, id);
      }
   },
   profile: {
      /**
       * Determines which faction the player is joining, then assigns the appropriate value to their profile.json file.
       * @param {String} userID A numerical 14 digit value that is the reference to the player for the system. 
       * @param {String} choice The faction the player is choosing to join.
       */
      chooseFaction: (userID, choice) => {
         profile.chooseFaction(userID, choice);
      },
      displayprofile: {
         basic: (c) => {return profile.displayprofile.basic(c);},
         location: (c) => {return profile.displayprofile.location(c);},
         resources: (c) => {return profile.displayprofile.resources(c);},
         skills: (c) => {return profile.displayprofile.skills(c);},
         all: (c) => {
            let result = `
            ${profile.displayprofile.basic(c)}

            ${profile.displayprofile.location(c)}
            
            ${profile.displayprofile.resources(c)}

            ${profile.displayprofile.skills(c)}
            `;
         }
      }
   }
}