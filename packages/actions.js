const fs = require('graceful-fs');
const mkdirp = require('mkdirp');
const copydir = require('copy-dir');
const path = require('path');
const misc = require('./misc.js');

module.exports = {
   gather:{
      /**
       * Determines the resource being gathered and returns how much is gained based off the profile calling it.
       * @param {Profile} p The profile referenced.
       * @param {String} res The resource gathered. 
       * @returns {Number} The amount of the resource gained.
       */
      gather: function(p, res){
         res = res.toLowerCase();
         switch(res){
            case 'personnel':
            case 'personel':
            case 'people':
            case 'person':
            case 'recruiting':
            case 'recruitting': 
            case 'recruit':
            case 'recruitt':
               return this.personnel(p);
            case 'nat_mat':
            case 'natmat':
            case 'nat mat':
            case 'wood':
               return this.nat_mat(p);
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
            case 'antimatter':
            case 'animatter':
            case 'anti':        
            case 'antimater':
               return this.antimatter(p);
            default:
               return 'ERR';
         }
      },
      /**
       * Determines the number of personnel gain.
       * @param {Profile} p The profile referenced.
       * @returns {Number} The amount of personnel gained.
       */
      personnel: function(p){
         return Math.floor(Math.random()*50*Math.log(p.skills.recruiting))+1;
      },
      /**
       * Determines the number of nat_mat gain.
       * @param {Profile} p The profile referenced.
       * @returns {Number} The amount of nat_mat gained.
       */
      nat_mat: function(p){
         return Math.round(misc.randomnum(1,16)*50*Math.log(p.skills.harvesting/2));
      },
      /**
       * Determines the number of tera_mat gain.
       * @param {Profile} p The profile referenced.
       * @returns {Number} The amount of tera_mat gained.
       */
      tera_mat: function(p){
         return Math.round(misc.randomnum(1,16)*50*Math.log(p.skills.excavating/1.5));
      },
      /**
       * Determines the number of seed gain.
       * @param {Profile} p The profile referenced.
       * @returns {Number} The amount of seed gained.
       */
      seed: function(p){
         return Math.round(misc.randomnum(1,16)*50*Math.log(p.skills.harvesting/3));
      },
      /**
       * Determines the number of crop gain.
       * @param {Profile} p The profile referenced.
       * @returns {Number} The amount of crop gained.
       */
      crop: function(p){
         return Math.round(misc.randomnum(1,16)*50*Math.log(p.skills.farming/3));
      },
      /**
       * Determines the number of stone gain.
       * @param {Profile} p The profile referenced.
       * @returns {Number} The amount of stone gained.
       */
      stone: function(p){
         return Math.round(misc.randomnum(1,16)*50*Math.log(p.skills.excavating));
      },
      /**
       * Determines the number of stone gain.
       * @param {Profile} p The profile referenced.
       * @returns {Number} The amount of stone gained.
       */
      slag: function(p){
         return Math.round(misc.randomnum(1,16)*50*Math.log(p.skills.excavating));
      },
      /**
       * Determines the number of stone gain.
       * @param {Profile} p The profile referenced.
       * @returns {Number} The amount of stone gained.
       */
      relic: function(p){
         //Not yet implemented
      },
      /**
       * Determines the number of research_point gain.
       * @param {Profile} p The profile referenced.
       * @returns {Number} The amount of research_point gained.
       */
      research: function(p){
         return Math.round(misc.randomnum(1,16)*50*Math.log(p.skills.researching/8));
      },
      /**
       * Determines the number of antimatter gain.
       * @param {Profile} p The profile referenced.
       * @returns {Number} The amount of antimatter gained.
       */
      antimatter: function(p){
         return Math.floor(misc.randomnum(1,2)/2);
      }
   },
   purifying:{
      /**
       * Used to determine the purifying function needed to be called, and returns the products of that function.
       * @param {Profile} p The edited profile.
       * @param {String} res The name of the resource being purified.
       * @param {Number} amt The amount of the resource being purified.
       * @returns {Profile} A modified version of the given profile.
       */
      purifying: function(p, res, amt){
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
      smelt: function(p, amt){
         var temp1 = Math.round(100-(100/Math.pow(2,(1+Math.random())/1.5))) * (Math.random()*50*Math.log(p.skills.smelting));
         var temp2 = Math.round((100-temp1)/Math.pow(2,(1+Math.random()/2.5))) * (Math.random()*50*Math.log(p.skills.smelting));
         var temp3 = Math.round((100-temp1-temp2)/Math.pow(2,(1+Math.random())/2)) * (Math.random()*50*Math.log(p.skills.smelting));
         var temp4 = Math.round(100-temp3-temp2-temp1) * (Math.random()*50*Math.log(p.skills.smelting));
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
      synthesize: function(p, amt){
         var temp1 = Math.round(100-(100/Math.pow(2,(1+Math.random())/1.5))) * (Math.random()*50*Math.log(p.skills.synthesizing));
         var temp2 = Math.round((100-temp1)/Math.pow(2,(1+Math.random()/2.5))) * (Math.random()*50*Math.log(p.skills.synthesizing));
         var temp3 = Math.round((100-temp1-temp2)/Math.pow(2,(1+Math.random())/2)) * (Math.random()*50*Math.log(p.skills.synthesizing));
         var temp4 = Math.round(100-temp3-temp2-temp1) * (Math.random()*50*Math.log(p.skills.synthesizing));
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
      sift: function(p, amt){
         var temp1 = Math.round(100-(100/Math.pow(2,(1+Math.random())/1.5))) * (Math.random()*50*Math.log(p.skills.sifting));
         var temp2 = Math.round((100-temp1)/Math.pow(2,(1+Math.random()/2.5))) * (Math.random()*50*Math.log(p.skills.sifting));
         var temp3 = Math.round((100-temp1-temp2)/Math.pow(2,(1+Math.random())/2)) * (Math.random()*50*Math.log(p.skills.sifting));
         var temp4 = Math.round(100-temp3-temp2-temp1) * (Math.random()*50*Math.log(p.skills.sifting/5));
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
      cook: function(p, amt){
         p.resources.food += amt*Math.random()*50*Math.log(p.skills.cooking);

         p.resources.crop -= amt;
         
         return p;
      }
   }
}