const fs = require('graceful-fs');
const mkdirp = require('mkdirp');
const copydir = require('copy-dir');
const path = require('path');
const misc = require('./misc.js');

const names = JSON.parse(fs.readFileSync('../ref/names.json'));

class NPC{
   constructor(x, y, loc, ldr, amt){
      this.state = {
         leader: ldr,
         coorX: x,
         coorY: y,
         location: loc,
         npcID: null,
         name: null,
         gender: null,
         priority: ["attacking", "defending", "recruiting", "researching", "harvesting", "excavation"],
         n: null,
         n2: [],
      }
      for(var k = 0; k < amt; k++){
         this.generate();
         this.save();
      }
      //console.log(this.state.n2);
   }
   async generate(){
      //console.log(`starting phase 1`);
      //Tier
      var tier = misc.randomnum(1,100);
      if(tier <= 5){
         tier = 4;
      }
      else if(tier > 5 && tier <= 24){
         tier = 3;
      }
      else if(tier > 24 && tier <=48){
         tier = 2;
      }
      else{
         tier = 1;
      }
      //console.log(`tier: ${tier}`);
      //ID
      for(var k = 0; k < 9; k++){
         if(k == 0)
            this.state.npcID = `${misc.randomnum(1,10)-1}`;
         else
            this.state.npcID += `${misc.randomnum(1,10)-1}`;
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
      for(var k = 0; k < 500000; k++){
         this.state.priority.sort(() => Math.random() - 0.5);
      }

      //console.log(`starting phase 2`);
      //Copying sample directory
      copydir('../ref/npc-template', `../npcs/${this.state.npcID}`,{utimes: true, mode: true, cover: true},(err)=>{if(err){throw err; return;}});

      //Filling details into object for saving
      //Loading template
      this.state.n = JSON.parse(fs.readFileSync(`../ref/npc-template/profile.json`));
      //Basic Info
      this.state.n.name = this.state.name;
      this.state.n.desig = this.state.npcID;
      this.state.n.leader = this.state.leader;
      this.state.n.location = this.state.location;
      this.state.n.coords = [this.state.coorX, this.state.coorY];
      //Level
      switch(tier){
         case 1:
            this.state.n.level = misc.randomnum(1,8);
            break;
         case 2:
            this.state.n.level = misc.randomnum(9,24);
            break;
         case 3:
            this.state.n.level = misc.randomnum(25,56);
            break;
         case 4:
            this.state.n.level = misc.randomnum(56,120);
            break;
         default:
            this.state.n.level = 0;
         
      }
      //console.log(`level: ${this.state.n.level}`);
      //Skills
      var result = 0;
      
      result = new Number(0);
      for(var k = 0; k < 6; k++){
         result += misc.randomnum(8,16);
      }
      result = Math.round(result*(1+(0.5*this.state.n.level)));
      this.state.n.skills[this.state.priority[0]] = result;
      //console.log(`${this.state.priority[0]}: ${this.state.n.skills[this.state.priority[0]]}`);
      result = new Number(0);
      for(var k = 0; k < 5; k++){
         result += misc.randomnum(8,16);
      }
      result = result = new Number(0);
      for(var k = 0; k < this.state.n.level; k++){
         result += misc.randomnum(1,8);
      }
      result = Math.round(result*(1+(0.5*this.state.n.level)));
      this.state.n.skills[this.state.priority[1]] = result;
      //console.log(`${this.state.priority[1]}: ${this.state.n.skills[this.state.priority[1]]}`);
      result = new Number(0);
      for(var k = 0; k < 4; k++){
         result += misc.randomnum(2,6);
      }
      result = Math.round(result*(1+(0.5*this.state.n.level)));
      this.state.n.skills[this.state.priority[2]] = result;
      //console.log(`${this.state.priority[2]}: ${this.state.n.skills[this.state.priority[2]]}`);
      result = new Number(0);
      for(var k = 0; k < 3; k++){
         result += misc.randomnum(2,6);
      }
      result = Math.round(result*(1+(0.5*this.state.n.level)));
      this.state.n.skills[this.state.priority[3]] = result;
      //console.log(`${this.state.priority[3]}: ${this.state.n.skills[this.state.priority[3]]}`);
      result = new Number(0);
      for(var k = 0; k < 2; k++){
         result += misc.randomnum(1,4);
      }
      result = Math.round(result*(1+(0.5*this.state.n.level)));
      this.state.n.skills[this.state.priority[4]] = result;
      //console.log(`${this.state.priority[4]}: ${this.state.n.skills[this.state.priority[4]]}`);
      this.state.n.skills[this.state.priority[5]] = (misc.randomnum(1,4))*(1+(0.5*tier));

      result = new Number(0);
      for(var k = 0; k < tier; k++){
         result += misc.randomnum(1,500)-250
      }
      this.state.n.skills['honor'] = result;
      result = new Number(0);
      for(var k = 0; k < tier; k++){
         result += new Number(misc.randomnum(1,1250)); 
      }
      this.state.n.skills['renown'] = result;

      this.state.n.skills['recon'] = Math.round(this.state.n.skills['attacking']*Math.random());
      this.state.n.skills['boarding'] = Math.round(this.state.n.skills['attacking']*Math.random());
      this.state.n.skills['seiging'] = Math.round(this.state.n.skills['attacking']*Math.random());
      this.state.n.skills['invading'] = Math.round(this.state.n.skills['attacking']*Math.random());
      this.state.n.skills['patroling'] = Math.round(this.state.n.skills['defending']*Math.random());
      this.state.n.skills['barricading'] = Math.round(this.state.n.skills['defending']*Math.random());
      this.state.n.skills['guerilla'] = Math.round(this.state.n.skills['defending']*Math.random());

      this.state.n.skills['farming'] = Math.round(this.state.n.skills['harvesting']*Math.random());
      this.state.n.skills['cooking'] = Math.round(this.state.n.level*misc.randomnum(1,8));
      this.state.n.skills['synthesizing'] = Math.round(this.state.n.skills['harvesting']*Math.random());

      this.state.n.skills['refining'] = Math.round(this.state.n.level*misc.randomnum(1,16));
      this.state.n.skills['sifting'] = Math.round(this.state.n.level*misc.randomnum(1,16));
      //Resources
      result = new Number(0);
      for(var k = 0; k < this.state.n.level; k++){
         result += misc.randomnum(1,16);
      }
      this.state.n.resources['personnel'][1] = result;
      this.state.n.resources['personnel'][0] = this.state.n.resources['personnel'][1];
      
      result = new Number(0);
      for(var k = 0; k < this.state.n.level; k++){
         result += misc.randomnum(1,32);
      }
      result = Math.round(result*(1+(0.5*this.state.n.skills['harvesting'])))
      this.state.n.resources['nat_mat'] = result;
      result = new Number(0);
      for(var k = 0; k < this.state.n.level; k++){
         result += misc.randomnum(1,32);
      }
      result = Math.round(result*(1+(0.3*this.state.n.skills['excavation'])));
      this.state.n.resources['tera_mat'] = result;

      result = new Number(0);
      for(var k = 0; k < this.state.n.level; k++){
         result += misc.randomnum(1,32);
      }
      result = Math.round(result*(1+(0.5*this.state.n.skills['harvesting'])));
      this.state.n.resources['seed'] = result;
      result = new Number(0);
      for(var k = 0; k < this.state.n.level; k++){
         result += misc.randomnum(1,32);
      }
      result = Math.round(result*(1+(0.4*this.state.n.skills['farming'])));
      this.state.n.resources['crop'] = result;
      result = new Number(0);
      for(var k = 0; k < this.state.n.level; k++){
         result += misc.randomnum(1,32);
      }
      result = Math.round(result*(1+((0.2*(tier-3))*this.state.n.skills['cooking'])));
      this.state.n.resources['food'] = result;

      result = new Number(0);
      for(var k = 0; k < this.state.n.level; k++){
         result += misc.randomnum(1,32);
      }
      result = Math.round(result*(1+((0.4*tier)*this.state.n.skills['synthesizing'])));
      this.state.n.resources['synthI'] = result;
      result = new Number(0);
      for(var k = 0; k < this.state.n.level; k++){
         result += misc.randomnum(1,32);
      }
      result = Math.round(result*(1+((0.4*(tier-1))*this.state.n.skills['synthesizing'])));
      this.state.n.resources['synthII'] = result;
      result = new Number(0);
      for(var k = 0; k < this.state.n.level; k++){
         result += misc.randomnum(1,32);
      }
      result = Math.round(result*(1+((0.4*(tier-2))*this.state.n.skills['synthesizing'])));
      this.state.n.resources['synthIII'] = result;
      result = new Number(0);
      for(var k = 0; k < this.state.n.level; k++){
         result += misc.randomnum(1,32);
      }
      result = Math.round(result*(1+((0.4*(tier-3))*this.state.n.skills['synthesizing'])));
      this.state.n.resources['synthIV'] = result;

      result = new Number(0);
      for(var k = 0; k < this.state.n.level; k++){
         result += misc.randomnum(1,32);
      }
      result = Math.round(result*(1+(0.5*this.state.n.skills['excavation'])));
      this.state.n.resources['stone'] = result;
      result = new Number(0);
      for(var k = 0; k < this.state.n.level; k++){
         result += misc.randomnum(1,32);
      }
      result = Math.round(result*(1+(0.4*this.state.n.skills['sifting'])));
      this.state.n.resources['slag'] = result;
      result = new Number(0);
      for(var k = 0; k < this.state.n.level; k++){
         result += misc.randomnum(1,32);
      }
      result = Math.round(result*(1+((0.3*tier)*this.state.n.skills['refining'])));
      this.state.n.resources['oreI'] = result;
      result = new Number(0);
      for(var k = 0; k < this.state.n.level; k++){
         result += misc.randomnum(1,32);
      }
      result = Math.round(result*(1+((0.3*(tier-1))*this.state.n.skills['refining'])));
      this.state.n.resources['oreII'] = result;
      result = new Number(0);
      for(var k = 0; k < this.state.n.level; k++){
         result += misc.randomnum(1,32);
      }
      result = Math.round(result*(1+((0.3*(tier-2))*this.state.n.skills['refining'])));
      this.state.n.resources['oreIII'] = result;
      result = new Number(0);
      for(var k = 0; k < this.state.n.level; k++){
         result += misc.randomnum(1,32);
      }
      result = Math.round(result*(1+((0.3*(tier-3))*this.state.n.skills['refining'])));
      this.state.n.resources['oreIV'] = result;

      result = new Number(0);
      for(var k = 0; k < this.state.n.level/4; k++){
         result += misc.randomnum(1,2)-1;
      }
      this.state.n.resources['relic_token'] = result;

      result = new Number(0);
      for(var k = 0; k < this.state.n.level; k++){
         result += misc.randomnum(1,16);
      }
      result = Math.round(result*(1+(0.2*this.state.n.skills['researching'])));
      this.state.n.resources['research_point'] = result;
      result = new Number(0);
      for(var k = 0; k < this.state.n.level; k++){
         result += misc.randomnum(1,8);
      }
      result = Math.round(result*(1+(0.2*this.state.n.skills['researching'])));
      this.state.n.resources['skill_point'] = result;
      result = new Number(0);
      for(var k = 0; k < this.state.n.level; k++){
         result += misc.randomnum(1,8);
      }
      result = Math.round(result*(1+(0.2*this.state.n.skills['researching'])));
      this.state.n.resources['tech_point'] = result;
   }
   async save(){
      var temp = [];
      if(this.state.n2 == undefined){
         temp[0] = this.state.n
      }
      else{
         for(var k = 0; k < this.state.n2.length; k++){
            temp[k] = this.state.n2[k];
         }
         temp[this.state.n2.length] = this.state.n;
      }
      this.state.n2 = temp;
   }
   async write(){
      var n2 = this.state.n2;
      for(var k = 0; k < n2.length; k++){
         fs.writeFileSync(`../npcs/${n2[k].desig}/profile.json`, JSON.stringify(n2[k]));
      }
   }
}

class Commander extends NPC{

}

module.exports = {
   npc: NPC,
   commander: Commander
}