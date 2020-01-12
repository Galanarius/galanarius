const fs = require('graceful-fs');
const mkdirp = require('mkdirp');
const copydir = require('copy-dir');
const path = require('path');
const misc = require('./misc.js');
const actions = require('./actions.js')

const names = JSON.parse(fs.readFileSync('../ref/names.json'));

class NPC{
   //---Generation---
   constructor(x, y, loc, ldr, t){
      this.state = {
         leader: ldr,
         tier: t,
         coorX: x,
         coorY: y,
         location: loc,
         ID: null,
         name: null,
         gender: null,
         priority: ["attacking", "defending", "recruiting", "researching", "harvesting", "excavation"],
         n: null
      }
      this.generate();
   }
   generate(){
      //console.log(`starting phase 1`);
      //Tier
      if(this.state.tier == null || this.state.tier == undefined){
         this.state.tier = misc.randomnum(1,100);
         if(this.state.tier <= 10){
            this.state.tier = 4;
         }
         else if(this.state.tier <= 30){
            this.state.tier = 3;
         }
         else if(this.state.tier <= 60){
            this.state.tier = 2;
         }
         else{
            this.state.tier = 1;
         }
      }
      //console.log(`this.state.tier: ${this.state.tier}`);
      //ID
      for(var k = 0; k < 8; k++){
         if(k == 0)
            this.state.ID = `${misc.randomnum(1,10)-1}`;
         else
            this.state.ID += `${misc.randomnum(1,10)-1}`;
      }
      //Leader
      if(this.state.leader == 'self'){
         this.state.leader = this.state.ID;
      }
      //Name & Gender
      if(misc.randomnum(1,2) == 1){
         this.state.name = names.Male[misc.randomnum(1,260)-1];
         this.state.gender = 'Male';
      }
      else{
         this.state.name = names.Female[misc.randomnum(1,260)-1];
         this.state.gender = 'Female';
      }
      this.state.name += ` ${names.Last[misc.randomnum(1,100)-1]}`;
      //Skill priorities
      for(var k = 0; k < 5000; k++){
         this.state.priority.sort(() => Math.random() - 0.5);
      }
      //Loading template
      var n = JSON.parse(fs.readFileSync(`../ref/npc.json`));
      //Basic Info
      n.name = this.state.name;
      n.ID = this.state.ID;
      n.ldrID = this.state.leader;
      n.loc = this.state.location;
      n.coords = [this.state.coorX, this.state.coorY,0];
      //Level
      switch(this.state.tier){
         case 1:
            n.lvl = misc.randomnum(1,8);
            break;
         case 2:
            n.lvl = misc.randomnum(9,24);
            break;
         case 3:
            n.lvl = misc.randomnum(25,56);
            break;
         case 4:
            n.lvl = misc.randomnum(56,120);
            break;
         default:
            n.lvl = 0;
         
      }
      //console.log(`lvl: ${n.lvl}`);
      //Skills
      this.state.n = n;
      n.skills['honor'] = this.genHonor();
      n.skills['renown'] = this.genRenown();
      
      this.state.n = n;
      n.skills['attacking'] = this.genAttacking();
      n.skills['defending'] = this.genDefending();
      n.skills['recruiting'] = this.genRecruiting();
      n.skills['researching'] = this.genResearching();
      n.skills['harvesting'] = this.genHarvesting();
      n.skills['excavating'] = this.genExcavation();

      this.state.n = n;
      n.skills['recon'] = this.genRecon(n);
      n.skills['boarding'] = this.genBoarding(n);
      n.skills['seiging'] = this.genSeiging(n);
      n.skills['invading'] = this.genInvading(n);
      n.skills['patroling'] = this.genPatroling(n);
      n.skills['barricading'] = this.genBarricading(n);
      n.skills['guerilla'] = this.genGuerilla(n);
      
      this.state.n = n;
      n.skills['farming'] = this.genFarming(n);
      n.skills['cooking'] = this.genCooking(n);
      n.skills['synthesizing'] = this.genSynthesizing(n);

      this.state.n = n;
      n.skills['refining'] = this.genRefining(n);
      n.skills['sifting'] = this.genSifting(n);

      //Resources
      n.resources['personnel'] = this.genPersonnel(n);

      n.resources['nat_mat'] = this.genNatMat(n);
      n.resources['tera_mat'] = this.genTeraMat(n);

      n.resources['seed'] = this.genSeed(n);
      n.resources['crop'] = this.genCrop(n);
      n.resources['food'] = this.genFood(n);

      n.resources['synthI'] = this.genSynthI(n);
      n.resources['synthII'] = this.genSynthII(n);
      n.resources['synthIII'] = this.genSynthIII(n);
      n.resources['synthIV'] = this.genSynthIV(n);

      n.resources['stone'] = this.genStone(n);
      n.resources['slag'] = this.genSlag(n);
      n.resources['oreI'] = this.genOreI(n);
      n.resources['oreII'] = this.genOreII(n);
      n.resources['oreIII'] = this.genOreIII(n);
      n.resources['oreIV'] = this.genOreIV(n);

      n.resources['relic_token'] = this.genRelicToken(n);

      n.resources['research_point'] = this.genResearchPoint(n);
      n.resources['skill_point'] = this.genSkillPoint(n);
      n.resources['tech_point'] = this.genTechPoint(n);

      n.resources['antimatter'] = this.genAntimatter(n);
      //Saving
      this.state.n = n;
      fs.writeFileSync(`../npcs/${n.ID}.json`, JSON.stringify(n), (err) =>{if(err) throw err});
   }
   //---Skill Generation---

   //--Misc--
   genHonor(){
      return Math.round(((Math.random()-0.25)*2)*(misc.randomnum(1,1000)));
   }
   genRenown(){
      return Math.round(misc.randomnum(1,1000)*(this.state.tier/4));
   }
   genRecruiting(){
      return Math.round((this.state.priority.length/(this.state.priority.indexOf('recruiting')+1))*misc.randomnum(1,20)*this.state.n.lvl/10);
   }
   genResearching(){
      return Math.round((this.state.priority.length/(this.state.priority.indexOf('researching')+1))*misc.randomnum(1,20)*this.state.n.lvl/10);
   }

   //--Attacking--
   genAttacking(){
      return Math.round((this.state.priority.length/(this.state.priority.indexOf('attacking')+1))*misc.randomnum(1,20)*this.state.n.lvl/10);
   }
   genRecon(n){
      return Math.round(n.skills.attacking*misc.randomnum(1,20));
   }
   genBoarding(n){
      return Math.round(n.skills.attacking*misc.randomnum(1,20));
   }
   genSeiging(n){
      return Math.round(n.skills.attacking*misc.randomnum(1,20));
   }
   genInvading(n){
      return Math.round(n.skills.attacking*misc.randomnum(1,20));
   }

   //--Defending--
   genDefending(){
      return Math.round((this.state.priority.length/(this.state.priority.indexOf('defending')+1))*misc.randomnum(1,20)*this.state.n.lvl/10);
   }
   genPatroling(n){
      return Math.round(n.skills.defending*misc.randomnum(1,20));
   }
   genBarricading(n){
      return Math.round(n.skills.defending*misc.randomnum(1,20));
   }
   genGuerilla(n){
      return Math.round(n.skills.defending*misc.randomnum(1,20));
   }

   //--Natural--
   genHarvesting(){
      return Math.round((this.state.priority.length/(this.state.priority.indexOf('harvesting')+1))*misc.randomnum(1,20)*this.state.n.lvl/10);
   }
   genFarming(n){
      return Math.round(n.skills.harvesting*misc.randomnum(1,20));
   }
   genCooking(n){
      return Math.round(n.skills.harvesting*misc.randomnum(1,20));
   }
   genSynthesizing(n){
      return Math.round(n.skills.harvesting*misc.randomnum(1,20));
   }

   //--Terra--
   genExcavation(){
      return Math.round((this.state.priority.length/(this.state.priority.indexOf('excavation')+1))*misc.randomnum(1,20)*this.state.n.lvl/10);
   }
   genRefining(n){
      return Math.round(n.skills.excavating*misc.randomnum(1,20));
   }
   genSifting(n){
      return Math.round(n.skills.excavating*misc.randomnum(1,20));
   }

   //---Resources---
   //--Personnel--
   genPersonnel(n){
      var result = Math.round(n.lvl*misc.randomnum(1,20)*n.skills.recruiting/10);
      return [result, result];
   }

   //--Materials--
   genNatMat(n){
      return Math.round(n.lvl*misc.randomnum(1,20)*n.skills.harvesting/6)
   }
   genTeraMat(n){
      return Math.round(Math.round(n.lvl*misc.randomnum(1,20)*n.skills.excavting/6));
   }
   
   //--Crops--
   genSeed(n){
      return Math.round(n.lvl*misc.randomnum(1,20)*n.skills.farming/6)
   }
   genCrop(n){
      return Math.round(n.lvl*misc.randomnum(1,20)*n.skills.farming/9)
   }
   genFood(n){
      return Math.round(n.lvl*misc.randomnum(1,20)*n.skills.cooking/3)
   }

   //--Synthetics--
   genSynthI(n){
      return Math.round(n.lvl*misc.randomnum(1,20)*n.skills.synthesizing/6)
   }
   genSynthII(n){
      return Math.round(n.lvl*misc.randomnum(1,20)*n.skills.synthesizing/9)
   }
   genSynthIII(n){
      return Math.round(n.lvl*misc.randomnum(1,20)*n.skills.synthesizing/15)
   }
   genSynthIV(n){
      return Math.round(n.lvl*misc.randomnum(1,20)*n.skills.synthesizing/24)
   }

   //--Stone--
   genStone(n){
      return Math.round(n.lvl*misc.randomnum(1,20)*n.skills.excavating);
   }
   genSlag(n){
      return Math.round(n.lvl*misc.randomnum(1,20)*n.skills.sifting/6);
   }
   genOreI(n){
      return Math.round(n.lvl*misc.randomnum(1,20)*n.skills.refining/6);
   }
   genOreII(n){
      return Math.round(n.lvl*misc.randomnum(1,20)*n.skills.refining/9);
   }
   genOreIII(n){
      return Math.round(n.lvl*misc.randomnum(1,20)*n.skills.refining/15);
   }
   genOreIV(n){
      return Math.round(n.lvl*misc.randomnum(1,20)*n.skills.refining/24);
   }

   //--Relics--
   genRelicToken(n){
      return this.state.tier+(misc.randomnum(1,5)-3);
   }

   //--Points--
   genResearchPoint(n){
      return Math.round(n.lvl*misc.randomnum(1,20)*n.skills.researching/10);
   }
   genSkillPoint(n){
      return Math.round(n.lvl*misc.randomnum(1,20)*n.resources['research_point']/3);
   }
   genTechPoint(n){
      return Math.round(n.lvl*misc.randomnum(1,20)*n.resources['research_point']/3);
   }

   //--Exotic--
   genAntimatter(n){
      if(this.state.tier >= 3){
         return misc.randomnum(1,10)*(this.state.tier-2);
      }
      else{
         return 0;
      }
   }


   //---Actions---
   move(){

   }
}

class Commander extends NPC{

}

module.exports = {
   npc: NPC,
   commander: Commander,
}