const fs = require('graceful-fs');
const mkdirp = require('mkdirp');
const copydir = require('copy-dir');
const path = require('path');
const misc = require('./misc.js');

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
         planetoids = [],
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
         result[k] = new Planet(`${this.state.x_coord}${this.state.y_coord}`);
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
      //Not Implemented
      inhabitants = this.genInhabitants(),
      //Not Implemented
      buildable = this.isBuildable(),
      //Not Implemented
      restrictions = this.genRestrictions(),
      //Not Implemented
      accomodations = this.genAccomodations(),
      //Not Implemented
      node_base = this.genNodeBase(),
      //Not Implemented
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
      //Not yet implemented
   }

   isBuildable(){
      //Not yet implemented
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
      //Not yet implemented
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
      //Not Implemented
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