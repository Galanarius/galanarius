const fs = require('graceful-fs');
const mkdirp = require('mkdirp');
const copydir = require('copy-dir');
const path = require('path');
const misc = require('./misc.js');

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
      for(var k = 0; k < 9; k++){
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
      //console.log(`lvl: ${.n.lvl}`);
      //Skills
      n.skills['honor'] = this.genHonor();
      n.skills['renown'] = this.genRenown();
      
      n.skills['attacking'] = this.genAttacking();
      n.skills['defending'] = this.genDefending();
      n.skills['recruiting'] = this.genRecruiting();
      n.skills['researching'] = this.genResearching();
      n.skills['harvesting'] = this.genHarvesting();
      n.skills['excavation'] = this.genExcavation();

      n.skills['recon'] = this.genRecon(n);
      n.skills['boarding'] = this.genBoarding(n);
      n.skills['seiging'] = this.genSeiging(n);
      n.skills['invading'] = this.genInvading(n);
      n.skills['patroling'] = this.genPatroling(n);
      n.skills['barricading'] = this.genBarricading(n);
      n.skills['guerilla'] = this.genGuerilla(n);
      
      n.skills['farming'] = this.genFarming(n);
      n.skills['cooking'] = this.genCooking(n);
      n.skills['synthesizing'] = this.genSynthesizing(n);

      n.skills['refining'] = this.genRefining(n);
      n.skills['sifting'] = this.genSifting(n);

      //Resources

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
      return Math.round((this.state.priority.length/(this.state.priority.indexOf('recruiting')+1))*misc.randomnum(1,20));
   }
   genResearching(){
      return Math.round((this.state.priority.length/(this.state.priority.indexOf('researching')+1))*misc.randomnum(1,20));
   }

   //--Attacking--
   genAttacking(){
      return Math.round((this.state.priority.length/(this.state.priority.indexOf('attacking')+1))*misc.randomnum(1,20));
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
      return Math.round((this.state.priority.length/(this.state.priority.indexOf('defending')+1))*misc.randomnum(1,20));
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
      return Math.round((this.state.priority.length/(this.state.priority.indexOf('harvesting')+1))*misc.randomnum(1,20));
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
      return Math.round((this.state.priority.length/(this.state.priority.indexOf('excavation')+1))*misc.randomnum(1,20));
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

   }

   //--Materials--
   genNatMat(n){

   }
   genTeraMat(n){

   }
   
   //--Crops--
   genSeed(n){

   }
   genCrop(n){

   }
   genFood(n){

   }

   //--Synthetics--
   genSynthI(n){

   }
   genSynthII(n){

   }
   genSynthIII(n){

   }
   genSynthIV(n){

   }

   //--Stone--
   genStone(n){

   }
   genSlag(n){

   }
   genOreI(n){
      
   }
   genOreII(n){

   }
   genOreIII(n){

   }
   genOreIV(n){

   }

   //--Relics--
   genRelicTokens(n){

   }

   //--Points--
   genResearchPoint(n){

   }
   genSkillPoint(n){

   }
   genTechPoint(n){

   }

   //--Exotic--
   genAntimatter(n){
      
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