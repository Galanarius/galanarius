const fs = require('graceful-fs');
const mkdirp = require('mkdirp');
const copydir = require('copy-dir');
const path = require('path');

const misc = require('./misc.js');
const npc = require('./npc.js');

class Galaxy{
   constructor(x, y){
      this.state = {
         galaxyID = this.genID(),
         x_size = x,
         y_size = y,
         systems = this.genSystems(),
      }
   }

   genID(){
      var temp = 0;
      for(var k = 0; k < 10; k++){
         if(k == 0)
            temp = `${misc.randomnum(1,10)-1}`;
         else
            temp += `${misc.randomnum(1,10)-1}`;
      }
      return 
   }

   genSystems(){
      var s = new Array(this.state.x_size);
      for(var k = 0; k < this.state.x_size; k++){
         s[k] = new Array(this.state.y_size);
      }
      for(var k = 0; k < this.state.x_size; k++){
         for(var i = 0; i < this.state.y_size; i++){
            s[k][i] = new System(k,i);
         }
      }
      return s;
   }
}

class System{
   constructor(x, y){
      this.state = {
         x_coord = x,
         y_coord = y,
         classif = this.genClassif(),
         planets = this.genPlanets(),
         planetoids = this.genPlanetoids()
      }
   }

   genClassif(){
      var temp = misc.randomnum(1,100);
      if(temp <= 1)
         return 'O';
      if(temp <= 4)
         return 'B';
      if(temp <= 9)
         return 'A';
      if(temp <= 17)
         return 'F';
      if(temp <= 41)
         return 'G';
      if(temp <= 84)
         return 'K';
      if(temp <= 100)
         return 'M';
      //else
      var temp2 = today.getFullYear()+'-'+(today.getMonth()+1)+'-'+today.getDate()+' '+today.getHours() + ":" + today.getMinutes() + ":" + today.getSeconds();
      fs.write('../8System generated.json', temp2, (err) => {if(err) throw err});
      return 8;
   }

   genPlanets(){
      var result = new Array(() =>{
         switch(this.state.classif){
            case 'M':
               return misc.randomnum(3,10);
            case 'K':
               return misc.randomnum(5,16);
            case 'G':
               return misc.randomnum(8,26);
            case 'F':
               return misc.randomnum(13,42);
            case 'A':
               return misc.randomnum(21,68);
            case 'B':
               return misc.randomnum(34,110);
            case 'O':
               return misc.randomnum(55,178)
         }
      });
      for(var k = 0; k < result.length; k++){
         result[k] = new Planet(`${this.state.x_coord},${this.state.y_coord}`);
      }
      return result;
   }

   genPlanetoids(){
      var result = new Array(() =>{
         switch(this.state.classif){
            case 'M':
               return misc.randomnum(1,10);
            case 'K':
               return misc.randomnum(3,26);
            case 'G':
               return misc.randomnum(6,42);
            case 'F':
               return misc.randomnum(8,68);
            case 'A':
               return misc.randomnum(13,110);
            case 'B':
               return misc.randomnum(21,178);
            case 'O':
               return misc.randomnum(34,288)
         }
      });
      for(var k = 0; k < result.length; k++){
         result[k] = new Planetoid(`${this.state.x_coord}${this.state.y_coord}`);
      }
      return result;
   }
}

class Planet{
   constructor(sys_id){
      //Implemented
      parent_ID = par_id,
      //Implemented
      id = genID();
      //Implemented
      size = this.genSize(),
      //Implemented
      capacity = this.genCapacity(),
      //Not Implemented
      terrain_type = this.genTerrain(),
      //Implemented
      inhabitants = this.genInhabitants(),
      //Not Implemented
      restrictions = this.genRestrictions(),
      //Not Implemented
      accomodations = this.genAccomodations(),
      //Implemented
      node_base = this.genNodeBase(),
      //Implemented
      nodes = this.genNodes()
   }

   genSize(){
      var temp = misc.randomnum(1,100);
      if(temp <= 5)
         return 5;
      if(temp <= 15)
         return 4;
      if(temp <= 30)
         return 3;
      if(temp <= 80)
         return 2;
      if(temp <= 100)
         return 1;
      //else
      var temp2 = today.getFullYear()+'-'+(today.getMonth()+1)+'-'+today.getDate()+' '+today.getHours() + ":" + today.getMinutes() + ":" + today.getSeconds();
      fs.write('../0PlanetGenerated.json', temp2, (err) => {if(err) throw err});
      return 0;
      return temp;
   }

   genCapacity(){
      switch(this.state.size){
         case 5:
            return 34;
         case 4:
            return 21;
         case 3:
            return 13;
         case 2:
            return 8;
         case 1:
            return 5;
         default:
            return 1;
      }
   }
   
   genID(){
      var result = null;
      for(var k = 0; k < 3; k++){
         if(k == 0)
            result = `${misc.randomnum(1,10)-1}`;
         else
            result += `${misc.randomnum(1,10)-1}`;
      }
      return result;
   }

   genTerrain(){
      //Not yet implemented
   }

   genInhabitants(){
      var temp = misc.randomnum(1,100);
      if(temp >= 30){
         var c = new Array(this.state.size*misc.randomnum(1,5));
         for(var k = 0; k < c.length; k++){
            c[k] = new npc.npc(this.state.par_id.substring(0, this.state.par_id.indexOf(',')), this.state.par_id.subtring(this.state.par_id.indexOf(',')+1), this.state.id);
         }
      }
      else
         return [];
   }

   genRestrictions(){
      //Not yet implemented
   }

   genAccomodations(){
      //Not yet implemented
   }

   genPlanetoids(){
      var result = new Araray(() =>{
         switch(this.state.size){
            case 'M':
               return misc.randomnum(1,8);
            case 'K':
               return misc.randomnum(3,13);
            case 'G':
               return misc.randomnum(5,21);
            case 'F':
               return misc.randomnum(8,34);
            case 'A':
               return misc.randomnum(21,55);
            case 'B':
               return misc.randomnum(34,8);
            case 'O':
               return misc.randomnum(55,178)
         }
      });
      for(var k = 0; k < result.length; k++){
         result[k] = new Planetoid(`${this.state.parent_id}-${this.state.id}`);
      }
      return result
   }

   genNodeBase(){
      switch(this.state.size){
         case 5:
            return 21;
         case 4:
            return 13;
         case 3:
            return 8;
         case 2:
            return 5;
         case 1:
            return 3;
         default:
            return 1;
      }
   }

   genNodes(){
      var temp = 0;
      switch(this.state.size){
         case 1:
            temp =misc.randomnum(2,5);
         case 2:
            temp = misc.randomnum(3,8);
         case 3:
            temp = misc.randomnum(5,13);
         case 4:
            temp = misc.randomnum(8,21);
         case 5:
            temp = misc.randomnum(13,34);
         default:
            temp = 1;
      }
      var result = new Array(temp);
      for(var k = 0; k < result.length; k++){
         result[k] = new ResourceNode(this.state.id);
      }
   }
}

class Planetoid{
   constructor(par_id){
      //Implemented
      parent_ID = par_id,
      //Implemented
      id = this.genID();
      //Implemented
      size = this.genSize(),
      //Not Implemented
      type = this.genType(),
      //Implemented
      nodes = this.genNodes(),
      //Implemented
      node_base = this.genNodeBase()
   }

   genID(){
      var result = null;
      for(var k = 0; k < 5; k++){
         if(k == 0)
            result = `${misc.randomnum(1,10)-1}`;
         else
            result += `${misc.randomnum(1,10)-1}`;
      }
      return result;
   }

   genSize(){
      var temp = misc.randomnum(1,100);
      if(temp <= 20)
         return 3;
      if(temp <= 70)
         return 2;
      if(temp <= 100)
         return 1;
      //else
      var temp2 = today.getFullYear()+'-'+(today.getMonth()+1)+'-'+today.getDate()+' '+today.getHours() + ":" + today.getMinutes() + ":" + today.getSeconds();
      fs.write('../0PlanetOIDGenerated.json', temp2, (err) => {if(err) throw err});
      return 0;
   }

   genType(){
      //Not yet implemented
   }

   genNodes(){
      var temp = 0;
      switch(this.state.size){
         case 1:
            temp =misc.randomnum(1,3);
            break;
         case 2:
            temp = misc.randomnum(2,5);
            break;
         case 3:
            temp = misc.randomnum(3,8);
            break;
         default:
            temp = 1;
      }
      var result = new Array(temp);
      for(var k = 0; k < result.length; k++){
         result[k] = new ResourceNode(this.state.id);
      }
   }

   genNodeBase(){
      switch(this.state.size){
         case 3:
            return 21;
         case 2:
            return 13;
         case 1:
            return 8;
         default:
            return 1;
      }
   }
}

class ResourceNode{
   constructor(par_id){
      this.state = {
         //Implemented
         parent_ID: par_id,
         //Implemented
         id: this.genID(),
         //Not Yet Implemented
         type: this.genType(),
         //Not Yet Implemented
         modules: []
      }
   }

   genID(){
      var result = null;
      for(var k = 0; k < 10; k++){
         if(k == 0)
            result = `${misc.randomnum(1,10)-1}`;
         else
            result += `${misc.randomnum(1,10)-1}`;
      }
      return result;
   }

   genType(){
      //Not yet implemented
   }
}