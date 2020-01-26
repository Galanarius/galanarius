const fs = require('graceful-fs');
const mkdirp = require('mkdirp');
const copydir = require('copy-dir');
const path = require('path');
const misc = require('./misc.js');

module.exports = {
   gather:{
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
      personnel: function(p){
         return Math.floor(Math.random()*50*Math.log(p.skills.recruiting))+1;
      },
      nat_mat: function(p){
         return Math.round(misc.randomnum(1,16)*50*Math.log(p.skills.harvesting/2));
      },
      tera_mat: function(p){
         return Math.round(misc.randomnum(1,16)*50*Math.log(p.skills.excavating/1.5));
      },
      seed: function(p){
         return Math.round(misc.randomnum(1,16)*50*Math.log(p.skills.harvesting/3));
      },
      crop: function(p){
         return Math.round(misc.randomnum(1,16)*50*Math.log(p.skills.farming/3));
      },
      stone: function(p){
         return Math.round(misc.randomnum(1,16)*50*Math.log(p.skills.excavating));
      },
      slag: function(p){
         return Math.round(misc.randomnum(1,16)*50*Math.log(p.skills.excavating));
      },
      relic: function(p){
         //Not yet implemented
      },
      research: function(p){
         return Math.round(misc.randomnum(1,16)*50*Math.log(p.skills.researching/8));
      },
      antimatter: function(p){
         return Math.floor(misc.randomnum(1,2)/2);
      }
   },
   purifying:{
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
      smelt: function(p, amt){
         var temp1 = Math.round(100-(100/Math.pow(2,(1+Math.random())/1.5))) * (Math.random()*p.skills.smelting);
         var temp2 = Math.round((100-temp1)/Math.pow(2,(1+Math.random()/2.5))) * (Math.random()*p.skills.smelting);
         var temp3 = Math.round((100-temp1-temp2)/Math.pow(2,(1+Math.random())/2)) * (Math.random()*p.skills.smelting);
         var temp4 = Math.round(100-temp3-temp2-temp1) * (Math.random()*p.skills.smelting);
         p.resources.oreI += amt*temp1;
         p.resources.oreII += amt*temp2;
         p.resources.oreIII += amt*temp3;
         p.resources.oreIV += amt*temp4;

         p.resources.tera_mat -= amt;

         return p;
      },
      synthesize: function(p, amt){
         var temp1 = Math.round(100-(100/Math.pow(2,(1+Math.random())/1.5))) * (Math.random()*p.skills.synthesizing);
         var temp2 = Math.round((100-temp1)/Math.pow(2,(1+Math.random()/2.5))) * (Math.random()*p.skills.synthesizing);
         var temp3 = Math.round((100-temp1-temp2)/Math.pow(2,(1+Math.random())/2)) * (Math.random()*p.skills.synthesizing);
         var temp4 = Math.round(100-temp3-temp2-temp1) * (Math.random()*p.skills.synthesizing);
         p.resources.synthI += amt*temp1;
         p.resources.synthII += amt*temp2;
         p.resources.synthIII += amt*temp3;
         p.resources.synthIV += amt*temp4;

         p.resources.nat_mat -= amt;

         return p;
      },
      sift: function(p, amt){
         var temp1 = Math.round(100-(100/Math.pow(2,(1+Math.random())/1.5))) * (Math.random()*p.skills.sifting/5);
         var temp2 = Math.round((100-temp1)/Math.pow(2,(1+Math.random()/2.5))) * (Math.random()*p.skills.sifting/5);
         var temp3 = Math.round((100-temp1-temp2)/Math.pow(2,(1+Math.random())/2)) * (Math.random()*p.skills.sifting/5);
         var temp4 = Math.round(100-temp3-temp2-temp1) * (Math.random()*p.skills.sifting/5);
         p.resources.oreI += amt*temp1;
         p.resources.oreII += amt*temp2;
         p.resources.oreIII += amt*temp3;
         p.resources.oreIV += amt*temp4;

         p.resources.slag -= amt;

         return p;
      },
      cook: function(p, amt){
         p.resources.food += amt*Math.random()*p.skills.cooking;

         p.resources.crop -= amt;
         
         return p;
      }
   }
}