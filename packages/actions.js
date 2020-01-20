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
         return Math.floor(Math.random()*p.skills.recruiting)+1;
      },
      nat_mat: function(p){
         return Math.round(misc.randomnum(1,16)*p.skills.harvesting/2);
      },
      tera_mat: function(p){
         return Math.round(misc.randomnum(1,16)*p.skills.excavating/1.5);
      },
      seed: function(p){
         return Math.round(misc.randomnum(1,16)*p.skills.harvesting/3);
      },
      crop: function(p){
         return Math.round(misc.randomnum(1,16)*p.skills.farming/3);
      },
      stone: function(p){
         return Math.round(misc.randomnum(1,16)*p.skills.excavating);
      },
      slag: function(p){
         return Math.round(misc.randomnum(1,16)*p.skills.excavating);
      },
      relic: function(p){
         //Not yet implemented
      },
      research: function(p){
         return Math.round(misc.randomnum(1,16)*p.skills.researching/8);
      },
      antimatter: function(p){
         return Math.floor(misc.randomnum(1,2)/2);
      }
   },
   purifying:{
      purifying: function(p, res){
         //Not yet implemented
      },
      smelt: function(p, mat){
         //Not yet implemented
      },
      synthesize: function(p){
         //Not yet implemented
      },
      sift: function(p){
         //Not yet implemented
      },
      cook: function(p){
         //Not yet implemented
      }
   }
}