const fs = require('graceful-fs');
const mkdirp = require('mkdirp');
const copydir = require('copy-dir');
const path = require('path');
const misc = require('./misc.js');

const names = JSON.parse(fs.readFileSync('../ref/names.json'));

class NPC{
   constructor(x, y, loc, ldr, amt, t, path){
      this.state = {
         leader: ldr,
         commanders: [],
         tier: t,
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
         this.state.commanders = null;
      }
      //console.log(this.state.n2);
   }
   async subNPC(ldr, t){
      return new NPC(ldr.state.coorX, ldr.state.coorY, ldr.state.location, ldr.state.npcID, 1, t);
   }
   async generate(){
      //console.log(`starting phase 1`);
      //Tier
      if(this.state.tier != null){
         this.state.tier = misc.randomnum(1,100);
         if(this.state.tier <= 5){
            this.state.tier = 4;
         }
         else if(this.state.tier > 5 && this.state.tier <= 24){
            this.state.tier = 3;
         }
         else if(this.state.tier > 24 && this.state.tier <=48){
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
      switch(this.state.tier){
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
      this.state.n.skills[this.state.priority[5]] = (misc.randomnum(1,4))*(1+(0.5*this.state.tier));

      result = new Number(0);
      for(var k = 0; k < this.state.tier; k++){
         result += misc.randomnum(1,500)-250
      }
      this.state.n.skills['honor'] = result;
      result = new Number(0);
      for(var k = 0; k < this.state.tier; k++){
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
      result = Math.round(result*(1+((0.2*(this.state.tier-3))*this.state.n.skills['cooking'])));
      this.state.n.resources['food'] = result;

      result = new Number(0);
      for(var k = 0; k < this.state.n.level; k++){
         result += misc.randomnum(1,32);
      }
      result = Math.round(result*(1+((0.4*this.state.tier)*this.state.n.skills['synthesizing'])));
      this.state.n.resources['synthI'] = result;
      result = new Number(0);
      for(var k = 0; k < this.state.n.level; k++){
         result += misc.randomnum(1,32);
      }
      result = Math.round(result*(1+((0.4*(this.state.tier-1))*this.state.n.skills['synthesizing'])));
      this.state.n.resources['synthII'] = result;
      result = new Number(0);
      for(var k = 0; k < this.state.n.level; k++){
         result += misc.randomnum(1,32);
      }
      result = Math.round(result*(1+((0.4*(this.state.tier-2))*this.state.n.skills['synthesizing'])));
      this.state.n.resources['synthIII'] = result;
      result = new Number(0);
      for(var k = 0; k < this.state.n.level; k++){
         result += misc.randomnum(1,32);
      }
      result = Math.round(result*(1+((0.4*(this.state.tier-3))*this.state.n.skills['synthesizing'])));
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
      result = Math.round(result*(1+((0.3*this.state.tier)*this.state.n.skills['refining'])));
      this.state.n.resources['oreI'] = result;
      result = new Number(0);
      for(var k = 0; k < this.state.n.level; k++){
         result += misc.randomnum(1,32);
      }
      result = Math.round(result*(1+((0.3*(this.state.tier-1))*this.state.n.skills['refining'])));
      this.state.n.resources['oreII'] = result;
      result = new Number(0);
      for(var k = 0; k < this.state.n.level; k++){
         result += misc.randomnum(1,32);
      }
      result = Math.round(result*(1+((0.3*(this.state.tier-2))*this.state.n.skills['refining'])));
      this.state.n.resources['oreIII'] = result;
      result = new Number(0);
      for(var k = 0; k < this.state.n.level; k++){
         result += misc.randomnum(1,32);
      }
      result = Math.round(result*(1+((0.3*(this.state.tier-3))*this.state.n.skills['refining'])));
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
      //Sub-commanders
      if(misc.randomnum(1,100) <= 25*this.state.tier){
         for(var k = 0; k < Math.floor(this.state.n.level/4*this.state.tier); k++){
            var temp = misc.randomnum(1,100/4*this.state.tier);
            console.log(temp);
            if(temp<=15){
               var atemp = this.state.commanders;
               atemp[atemp.length] = this.subNPC(this, this.state.tier);
               this.state.commanders = atemp;               
            }
            else if(15<temp<=45){
               var atemp = this.state.commanders;
               temp = this.state.tier-2;
               if(temp>0){
               atemp[atemp.length] = this.subNPC(this, temp);
               this.state.commanders = atemp;
               }  
            }
            else if(45<temp<=90){
               var atemp = this.state.commanders;
               temp = this.state.tier-1;
               if(temp>0){
               atemp[atemp.length] = this.subNPC(this, temp);
               this.state.commanders = atemp;
               }  
            }
            else{
               var atemp = this.state.commanders;
               temp = this.state.tier-3;
               if(temp>0){
                  atemp[atemp.length] = this.subNPC(this, temp);
                  this.state.commanders = atemp;
               }
            }
         }
      }
      
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
   async write(bool){
      if(!bool){
         var n2 = this.state.n2;
         for(var k = 0; k < n2.length; k++){
            fs.writeFileSync(`../npcs/${n2[k].desig}/profile.json`, JSON.stringify(n2[k]));
         }
      }
   }
   async writeCom(){
      for(var k = 0; k < this.state.n2; k++){
         com = this.state.n2[k].commanders;
         for(var i = 0; i < com.length; i++){
            await com[i].generate();
         }
         for(var i = 0; i < com.length; i++){
            await copydir('../ref/npc-template', `../npcs/${this.state.n2[k].desig}/commanders/${com[i].state.n.desig}`,{utimes: true, mode: true, cover: true},(err)=>{if(err){throw err; return;}});
            fs.writeFileSync(`../npcs/${this.state.n2[k].desig}/commanders/${com[i].state.n.desig}/profile.json`, JSON.stringify(com[i]));
         }
      }
   }
   move(){

   }
   act(){

   }
}

class Commander extends NPC{

}

module.exports = {
   npc: NPC,
   commander: Commander
}