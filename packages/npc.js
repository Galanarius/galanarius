const fs = require('graceful-fs');
const mkdirp = require('mkdirp');
const copydir = require('copy-dir');
const path = require('path');
const misc = require('./misc.js');
const actions = require('./actions.js');

const names = JSON.parse(fs.readFileSync('../ref/names.json'));

class NPC{
   //---Generation---
   /**
    * Creates an NPC profile and saves it to a json file in the npcs folder at root level of the project.
    * @constructor
    * @param {Number} x The x-coordinate where the NPC is to reside upon creation.
    * @param {Number} y The y-coordinate where the NPC is to reside upon creation.
    * @param {String} loc The name of the planet or planetoid the NPC is to reside at upon creation.
    * @param {String} ldr The name of the NPC leading this NPC (pass 'self' to make it its own leader).
    * @param {Number} t The tier (1,2,3, or 4) of the NPC, will be randomly selected if not specified.
    */
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
         priority: ["attacking", "defending", "recruiting", "researching", "harvesting", "excavating", "siphoning"],
         n: null
      }
      this.generate();
   }
   /**
    * Fills the details of the NPC, called from the constructor.
    */
   async generate(){
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
      if(this.state.leader == 'self' || this.state.leader == undefined || this.state.leader == null){
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
      n.skills['excavating'] = this.genExcavating();
      n.skills['siphoning'] = this.genSiphoning();

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

      n.skills['filtration'] = this.genFiltration(n);

      this.state.n = n;
      n.skills['smelting'] = this.genSmelting(n);
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
      this.state.n = n;

      //Sub Commanders
      for(var k = 0; k < Math.ceil(n.lvl/8); k++){
         var temp = null;
         if(misc.randomnum(1,100)+n.skills.recruiting >= 20*(5/this.state.tier)){
            temp = misc.randomnum(1,100)+n.skills.recruiting/16;

            if(temp >= 210+16*(this.state.tier/2))
               temp = await this.genSubCom(n, this.state.tier);
            else if(temp >= 130)
               temp = await this.genSubCom(n, this.state.tier-1);
            else if(temp >= 80)
               temp = await this.genSubCom(n, this.state.tier-2);
            else if(temp >= 50)
               temp = await this.genSubCom(n, this.state.tier-3);
            
         }
         if(temp != null && temp != undefined){
            if(n.commanders == null || n.commanders == undefined)
               n.commanders[0] = temp;
            else
               n.commanders[n.commanders.length] = temp;
         }
      }
      //Saving
      this.state.n = n;
      fs.writeFileSync(`../npcs/${n.ID}.json`, JSON.stringify(n), (err) =>{if(err) throw err});
   }
   /**
    * Generates and returns an NPC object whose leader is whichever NPC object calls this method.
    * @param {NPC} n The NPC object of the leader whom the NPC created will be under. 
    * @param {Number} t The tier (1,2,3, or 4) of the NPC to be generated. 
    */
   async genSubCom(n, t){
      if(t == 0)
         t = 1;
      else if(t < 0)
         return;
      var temp = new NPC(n.coords[0], n.coords[1], n.loc, n.ID, t);
      return temp.state.n.ID;
   }

   //---Skill Generation---

   //--Misc--
   /**
    * Generates the honor score based off of previously generated stats.
    * @returns {Number} The degree of the honor skill of the NPC.
    */
   genHonor(){
      return Math.round(((Math.random()-0.25)*2)*(misc.randomnum(1,1000))*(this.state.tier/4));
   }
   /**
    * Generates the renown score based off of previously generated stats.
    * @returns {Number} The degree of the renown skill of the NPC.
    */
   genRenown(){
      return Math.round(misc.randomnum(1,750)*(this.state.tier/4));
   }
   /**
    * Generates the recruiting score based off of previously generated stats.
    * @returns {Number} The degree of the recruiting skill of the NPC.
    */
   genRecruiting(){
      return Math.round((this.state.priority.length/(this.state.priority.indexOf('recruiting')+1))*misc.randomnum(1,8)*this.state.n.lvl/10);
   }
   /**
    * Generates the researching score based off of previously generated stats.
    * @returns {Number} The degree of the researching skill of the NPC.
    */
   genResearching(){
      return Math.round((this.state.priority.length/(this.state.priority.indexOf('researching')+1))*misc.randomnum(1,8)*this.state.n.lvl/10);
   }
   /**
    * Generates the siphoning score based off of previously generated stats.
    * @returns {Number} The degree of the siphoning skill of the NPC.
    */
   genSiphoning(){
      return Math.round((this.state.priority.length/(this.state.priority.indexOf('siphoning')+1))*misc.randomnum(1,8)*this.state.n.lvl/10);
   }
   /**
    * Generates the filtration score based off previously generated attacking score.
    * @param {NPC} n The NPC the skill is being generated for.
    * @returns {Number} The degree of the filtration skill of the NPC.
    */
   genFiltration(n){
      return Math.round(n.skills.attacking*misc.randomnum(1,100)/100);
   }

   //--Attacking--
   /**
    * Generates the attacking score based off of previously generated stats.
    * @returns {Number} The degree of the attacking skill of the NPC.
    */
   genAttacking(){
      return Math.round((this.state.priority.length/(this.state.priority.indexOf('attacking')+1))*misc.randomnum(1,20)*this.state.n.lvl/10);
   }
   /**
    * Generates the recon score based off previously generated attacking score.
    * @param {NPC} n The NPC the skill is being generated for.
    * @returns {Number} The degree of the recon skill of the NPC.
    */
   genRecon(n){
      return Math.round(n.skills.attacking*misc.randomnum(1,100)/100);
   }
   /**
    * Generates the boarding score based off previously generated attacking score.
    * @param {NPC} n The NPC the skill is being generated for.
    * @returns {Number} The degree of the boarding skill of the NPC.
    */
   genBoarding(n){
      return Math.round(n.skills.attacking*misc.randomnum(1,100)/100);
   }
   /**
    * Generates the seiging score based off previously generated attacking score.
    * @param {NPC} n The NPC the skill is being generated for.
    * @returns {Number} The degree of the seiging skill of the NPC.
    */
   genSeiging(n){
      return Math.round(n.skills.attacking*misc.randomnum(1,100)/100);
   }
   /**
    * Generates the invading score based off previously generated attacking score.
    * @param {NPC} n The NPC the skill is being generated for.
    * @returns {Number} The degree of the invading skill of the NPC.
    */
   genInvading(n){
      return Math.round(n.skills.attacking*misc.randomnum(1,100)/100);
   }

   //--Defending--
   /**
    * Generates the defending score based off of previously generated stats.
    * @returns {Number} The degree of the defending skill of the NPC.
    */
   genDefending(){
      return Math.round((this.state.priority.length/(this.state.priority.indexOf('defending')+1))*misc.randomnum(1,20)*this.state.n.lvl/10);
   }
   /**
    * Generates the patroling score based off previously generated defending score.
    * @param {NPC} n The NPC the skill is being generated for.
    * @returns {Number} The degree of the patroling skill of the NPC.
    */
   genPatroling(n){
      return Math.round(n.skills.defending*misc.randomnum(1,100)/100);
   }
   /**
    * Generates the barricading score based off previously generated defending score.
    * @param {NPC} n The NPC the skill is being generated for.
    * @returns {Number} The degree of the barricading skill of the NPC.
    */
   genBarricading(n){
      return Math.round(n.skills.defending*misc.randomnum(1,100)/100);
   }
   /**
    * Generates the guerilla score based off previously generated defending score.
    * @param {NPC} n The NPC the skill is being generated for.
    * @returns {Number} The degree of the guerilla skill of the NPC.
    */
   genGuerilla(n){
      return Math.round(n.skills.defending*misc.randomnum(1,100)/100);
   }

   //--Natural--
   /**
    * Generates the harvesting score based off previously generated stats.
    * @returns {Number} The degree of the harvesting skill of the NPC.
    */
   genHarvesting(){
      return Math.round((this.state.priority.length/(this.state.priority.indexOf('harvesting')+1))*misc.randomnum(1,20)*this.state.n.lvl/10);
   }
   /**
    * Generates the farming score based off previously generated harvesting score.
    * @param {NPC} n The NPC the skill is being generated for.
    * @returns {Number} The degree of the farming skill of the NPC.
    */
   genFarming(n){
      return Math.round(n.skills.harvesting*misc.randomnum(1,100)/100);
   }
   /**
    * Generates the cooking score based off previously generated harvesting score.
    * @param {NPC} n The NPC the skill is being generated for.
    * @returns {Number} The degree of the cooking skill of the NPC.
    */
   genCooking(n){
      return Math.round(n.skills.harvesting*misc.randomnum(1,100)/100);
   }
   /**
    * Generates the synthesizing score based off previously generated harvesting score.
    * @param {NPC} n The NPC the skill is being generated for.
    * @returns {Number} The degree of the synthesizing skill of the NPC.
    */
   genSynthesizing(n){
      return Math.round(n.skills.harvesting*misc.randomnum(1,100)/100);
   }

   //--Terra--
   /**
    * Generates the excavating score based off previously generated stats.
    * @returns {Number} The degree of the excavating skill of the NPC.
    */
   genExcavating(){
      return Math.round((this.state.priority.length/(this.state.priority.indexOf('excavating')+1))*misc.randomnum(1,20)*this.state.n.lvl/10);
   }
   /**
    * Generates the smelting score based off previously generated excavating score.
    * @param {NPC} n The NPC the skill is being generated for.
    * @returns {Number} The degree of the smelting skill of the NPC.
    */
   genSmelting(n){
      return Math.round(n.skills.excavating*misc.randomnum(1,100)/100);
   }
   /**
    * Generates the sifting score based off previously generated excavating score.
    * @param {NPC} n The NPC the skill is being generated for.
    * @returns {Number} The degree of the sifting skill of the NPC.
    */
   genSifting(n){
      return Math.round(n.skills.excavating*misc.randomnum(1,100)/100);
   }

   //---Resources---
   //--Personnel--
   /**
    * Generates the number of personnel based of the previously generated level and recruiting skill.
    * @param {NPC} n The NPC the personnel are being generated for.
    * @returns {Array} The number of personnel the NPC currently has unused out of its maximum number of personnel at its start.
    */
   genPersonnel(n){
      var result = Math.round(n.lvl*misc.randomnum(1,20)*n.skills.recruiting/10);
      return [result, result];
   }

   //--Misc--
   /**
    * Generates the number of oil based of the previously generated siphoning skill.
    * @param {NPC} n The NPC the oil is being generated for.
    * @returns {Number} The amount of oil the NPC has.
    */
   genOil(n){
      return Math.round(n.lvl*misc.randomnum(1,16)*n.skills.siphoning);
   }
   /**
    * Generates the number of hydrogen based of the previously generated siphoning skill.
    * @param {NPC} n The NPC the hydrogen is being generated for.
    * @returns {Number} The amount of hydrogen the NPC has.
    */
   genHydrogen(n){
      return Math.round(n.lvl*misc.randomnum(1,16)*n.skills.siphoning);
   }
   /**
    * Generates the number of heliumI based of the previously generated siphoning and filtration skills.
    * @param {NPC} n The NPC the heliumI is being generated for.
    * @returns {Number} The amount of heliumI the NPC has.
    */
   genHeliumI(n){
      return Math.round(n.lvl*misc.randomnum(1,16)*n.skills.siphoning+n.skills.filtration/6);
   }
   /**
    * Generates the number of heliumII based of the previously generated siphoning and filtration skills.
    * @param {NPC} n The NPC the heliumII is being generated for.
    * @returns {Number} The amount of heliumII the NPC has.
    */
   genHeliumII(n){
      return Math.round(n.lvl*misc.randomnum(1,16)*n.skills.siphoning+n.skills.filtration/9);
   }
   /**
    * Generates the number of heliumIII based of the previously generated siphoning and filtration skills.
    * @param {NPC} n The NPC the heliumIII is being generated for.
    * @returns {Number} The amount of heliumIII the NPC has.
    */
   genHeliumIII(n){
      return Math.round(n.lvl*misc.randomnum(1,16)*n.skills.siphoning+n.skills.filtration/20);
   }

   //--Materials--
   /**
    * Generates the number of nat_mat based of the previously generated harvesting skill.
    * @param {NPC} n The NPC the nat_mat is being generated for.
    * @returns {Number} The amount of nat_mat the NPC starts out with.
    */
   genNatMat(n){
      return Math.round(n.lvl*misc.randomnum(1,16)*n.skills.harvesting/6)
   }
   /**
    * Generates the number of tera_mat based of the previously generated excavating skill.
    * @param {NPC} n The NPC the tera_mat is being generated for.
    * @returns {Number} The amount of tera_mat the NPC has.
    */
   genTeraMat(n){
      return Math.round(Math.round(n.lvl*misc.randomnum(1,16)*n.skills.excavating/6));
   }
   
   //--Crops--
   /**
    * Generates the number of seed based of the previously generated farming skill.
    * @param {NPC} n The NPC the seed is being generated for.
    * @returns {Number} The amount of seed the NPC has.
    */
   genSeed(n){
      return Math.round(n.lvl*misc.randomnum(1,16)*n.skills.farming/6)
   }
   /**
    * Generates the number of crop based of the previously generated farming skill.
    * @param {NPC} n The NPC the crop is being generated for.
    * @returns {Number} The amount of crop the NPC has.
    */
   genCrop(n){
      return Math.round(n.lvl*misc.randomnum(1,16)*n.skills.farming/9)
   }
   /**
    * Generates the number of food based of the previously generated cooking skill.
    * @param {NPC} n The NPC the food is being generated for.
    * @returns {Number} The amount of food the NPC has.
    */
   genFood(n){
      return Math.round(n.lvl*misc.randomnum(1,16)*n.skills.cooking/3)
   }

   //--Synthetics--
   /**
    * Generates the number of synthI based of the previously generated synthesizing skill.
    * @param {NPC} n The NPC the synthI is being generated for.
    * @returns {Number} The amount of synthI the NPC has.
    */
   genSynthI(n){
      return Math.round(n.lvl*misc.randomnum(1,16)*n.skills.synthesizing/6)
   }
   /**
    * Generates the number of synthII based of the previously generated synthesizing skill.
    * @param {NPC} n The NPC the synthII is being generated for.
    * @returns {Number} The amount of synthII the NPC has.
    */
   genSynthII(n){
      return Math.round(n.lvl*misc.randomnum(1,16)*n.skills.synthesizing/9)
   }
   /**
    * Generates the number of synthIII based of the previously generated synthesizing skill.
    * @param {NPC} n The NPC the synthIII is being generated for.
    * @returns {Number} The amount of synthIII the NPC has.
    */
   genSynthIII(n){
      return Math.round(n.lvl*misc.randomnum(1,16)*n.skills.synthesizing/15)
   }
   /**
    * Generates the number of synthIV based of the previously generated synthesizing skill.
    * @param {NPC} n The NPC the synthIV is being generated for.
    * @returns {Number} The amount of synthIV the NPC has.
    */
   genSynthIV(n){
      return Math.round(n.lvl*misc.randomnum(1,16)*n.skills.synthesizing/24)
   }

   //--Stone--
   /**
    * Generates the number of stone based of the previously generated excavating skill.
    * @param {NPC} n The NPC the stone is being generated for.
    * @returns {Number} The amount of stone the NPC has.
    */
   genStone(n){
      return Math.round(n.lvl*misc.randomnum(1,16)*n.skills.excavating);
   }
   /**
    * Generates the number of slag based of the previously generated excavating skill.
    * @param {NPC} n The NPC the slag is being generated for.
    * @returns {Number} The amount of slag the NPC has.
    */
   genSlag(n){
      return Math.round(n.lvl*misc.randomnum(1,16)*n.skills.sifting/6);
   }
   /**
    * Generates the number of oreI based of the previously generated excavating skill.
    * @param {NPC} n The NPC the oreI is being generated for.
    * @returns {Number} The amount of oreI the NPC has.
    */
   genOreI(n){
      return Math.round(n.lvl*misc.randomnum(1,16)*n.skills.smelting/6);
   }
   /**
    * Generates the number of oreII based of the previously generated excavating skill.
    * @param {NPC} n The NPC the oreII is being generated for.
    * @returns {Number} The amount of oreII the NPC has.
    */
   genOreII(n){
      return Math.round(n.lvl*misc.randomnum(1,16)*n.skills.smelting/9);
   }
   /**
    * Generates the number of oreIII based of the previously generated excavating skill.
    * @param {NPC} n The NPC the oreIII is being generated for.
    * @returns {Number} The amount of oreIII the NPC has.
    */
   genOreIII(n){
      return Math.round(n.lvl*misc.randomnum(1,16)*n.skills.smelting/15);
   }
   /**
    * Generates the number of oreIV based of the previously generated excavating skill.
    * @param {NPC} n The NPC the oreIV is being generated for.
    * @returns {Number} The amount of oreIV the NPC has.
    */
   genOreIV(n){
      return Math.round(n.lvl*misc.randomnum(1,16)*n.skills.smelting/24);
   }

   //--Relics--
   /**
    * Generates the number of relics the NPC has.
    * @param {NPC} n The NPC the relics are being generated for.
    * @returns {Number} The amount of relics the NPC has.
    */
   genRelicToken(n){
      return this.state.tier+(misc.randomnum(1,5)-3);
   }

   //--Points--
   /**
    * Generates the number of research_points based of the previously generated researching skill.
    * @param {NPC} n The NPC the research_points is being generated for.
    * @returns {Number} The amount of research_points the NPC has.
    */
   genResearchPoint(n){
      return Math.round(n.lvl*misc.randomnum(1,16)*n.skills.researching/10);
   }
   /**
    * Generates the number of skill_point based of the previously generated research_point resource.
    * @param {NPC} n The NPC the skill_point is being generated for.
    * @returns {Number} The amount of skill_point the NPC has.
    */
   genSkillPoint(n){
      return Math.round(n.lvl*misc.randomnum(1,16)*n.resources['research_point']/3);
   }
   /**
    * Generates the number of tech_point based of the previously generated research_point resource.
    * @param {NPC} n The NPC the tech_point is being generated for.
    * @returns {Number} The amount of tech_point the NPC has.
    */
   genTechPoint(n){
      return Math.round(n.lvl*misc.randomnum(1,16)*n.resources['research_point']/3);
   }

   //--Exotic--
   /**
    * Generates the number of antimatter the NPC has.
    * @param {NPC} n The NPC the antimatter is being generated for.
    * @returns {Number} The amount of antimatter the NPC has.
    */
   genAntimatter(n){
      if(this.state.tier >= 3){
         return misc.randomnum(1,10)*(this.state.tier-2);
      }
      else{
         return 0;
      }
   }


   //---Actions---
   /**
    * NOT YET IMPLEMENTED
    * Moves the NPC between planets, planetoids, and/or systems.
    */
   async move(){
      //Not yet implemented
   }
}

class Commander extends NPC{

}

module.exports = {
   npc: NPC,
   commander: Commander,
}