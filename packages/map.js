const fs = require('graceful-fs');
const mkdirp = require('mkdirp');
const copydir = require('copy-dir');
const path = require('path');

const misc = require('./misc.js');
const npc = require('./npc.js');

class Galaxy{
   /**
    * Procedurally generates an entire galaxy heirarchy.
    * @constructor
    * @param {Number} x The size of the galaxy on its x-axis. 
    * @param {Number} y The size of the galaxy on its y-axis.
    */
   constructor(x, y){
      this.state = {
         galaxyID: this.genID(),
         x_size: x,
         y_size: y,
         systems: this.genSystems(),
      }
   }
   /**
    * Generates the galaxy's 10 digit code
    * @returns The galaxy's 10 digit code.
    */
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
   /**
    * Creates and stores the system objects in the galaxy's matrix of systems.
    */
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
   /**
    * Procedurally generates an entire system heirarchy.
    * @constructor
    * @param {Number} x The x-coordinate of the system in its galaxy. 
    * @param {Number} y The y-coordinate of the system in its galaxy.
    */
   constructor(x, y){
      this.state = {
         x_coord: x,
         y_coord: y,
         classif: this.genClassif(),
         planets: this.genPlanets(),
         planetoids: this.genPlanetoids()
      }
   }
   /**
    * Uses a weighted generation algorithm to generate the size-classificaiton of the system.
    * @returns {String} A single character string identifying the size of the system.
    */
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
   /**
    * Creates an randomly sized Array, based of the system's classification, of generated planet objects.
    * @returns {Array} An array of planet objects.
    */
   genPlanets(){
      var result = new Array(() =>{
         switch(this.state.classif){
            case 'M':
               return [misc.randomnum(3,10)];
            case 'K':
               return [misc.randomnum(5,16)];
            case 'G':
               return [misc.randomnum(8,26)];
            case 'F':
               return [misc.randomnum(13,42)];
            case 'A':
               return [misc.randomnum(21,68)];
            case 'B':
               return [misc.randomnum(34,110)];
            case 'O':
               return [misc.randomnum(55,178)];
         }
      });
      for(var k = 0; k < result.length; k++){
         result[k] = new Planet(`${this.state.x_coord},${this.state.y_coord}`);
      }
      return result;
   }
   /**
    * Creates an randomly sized Array, based of the system's classification, of generated planetoid objects.
    * @returns {Array} An array of planetoid objects.
    */
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
   /**
    * Procedurally generates a planet and it's nodes.
    * @constructor
    * @param {String} sys_id The coordinates of the system containing the planet in the form of 'x,y'.
    */
   constructor(sys_id){
      this.state = {
         //Implemented
         parent_ID: sys_id,
         //Implemented
         id: genID(),
         //Implemented
         size: this.genSize(),
         //Implemented
         capacity: this.genCapacity(),
         //Not Implemented
         terrain_type: this.genTerrain(),
         //Implemented
         inhabitants: this.genInhabitants(),
         //Not Implemented
         restrictions: this.genRestrictions(),
         //Not Implemented
         accomodations: this.genAccomodations(),
         //Implemented
         node_base: this.genNodeBase(),
         //Implemented
         nodes: this.genNodes()
      }
   }
   /**
    * Uses a weighted generation algorithm to obtain the size ID of the planet.
    * @returns {Number} The size ID for the planet.
    */
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
      else{
         var temp2 = today.getFullYear()+'-'+(today.getMonth()+1)+'-'+today.getDate()+' '+today.getHours() + ":" + today.getMinutes() + ":" + today.getSeconds();
         fs.write('../0PlanetGenerated.json', temp2, (err) => {if(err) throw err});
         return 0;
      }
      return temp;
   }
   /**
    * Returns the capacity of the planet based off of its previously generated size.
    * @returns {Number} The capacity of the planet (number of building that can be built on the planet).
    */
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
   /**
    * Generates the planet's 3 digit ID.
    * @returns {String} The planet's 3 digit ID.
    */
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
   /**
    * NOT YET IMPLEMENTED
    * Randomly selects the terrain-type of the planet.
    */
   genTerrain(){
      //Not yet implemented
   }
   /**
    * NOT YET FULLY IMPLEMENTED
    * Generates a random number of NPCs inhabiting the planet's surface based off of its size.
    */
   genInhabitants(){
      var temp = misc.randomnum(1,100);
      if(temp >= 30){
         var c = new Array(this.state.size*misc.randomnum(1,5));
         for(var k = 0; k < c.length; k++){
            c[k] = new npc.npc(this.state.parent_id.substring(0, this.state.parent_id.indexOf(',')), this.state.parent_id.subtring(this.state.parent_id.indexOf(',')+1), this.state.id);
         }
      }
      else
         return [];
   }
   /**
    * NOT YET IMPLEMENTED
    * Determines the building restriction tags the planet is given based off of its terrain type and other miscelaneous factors.
    */
   genRestrictions(){
      //Not yet implemented
   }
   /**
    * NOT YET IMPLEMENTED
    * Determines the building accomodation tags the planet is given based off of its terrain type and other miscelaneous factors.
    */
   genAccomodations(){
      //Not yet implemented
   }
   /**
    * Generates the number of planetoids based of the system's size, and the generates the planetoids themselves.
    * @returns {Array} The array holding the planet's planetoids.
    */
   genPlanetoids(){
      var result = new Araray(() =>{
         switch(this.state.size){
            case '1':
               return misc.randomnum(1,2);
            case '2':
               return misc.randomnum(3,8);
            case '3':
               return misc.randomnum(5,21);
            case '4':
               return misc.randomnum(8,34);
            case '5':
               return misc.randomnum(21,55);
         }
      });
      for(var k = 0; k < result.length; k++){
         result[k] = new Planetoid(`${this.state.parent_id}-${this.state.id}`);
      }
      return result
   }
   /**
    * Determines the node_base based off of the planet's size.
    */
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
   /**
    * Determines the number of nodes the planet has based off its size, and then generates the nodes.
    * @returns {Array} The array holding the planet's nodes.
    */
   genNodes(){
      var temp = 0;
      switch(this.state.size){
         case 1:
            temp = misc.randomnum(2,5);
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
         result[k] = new ResourceNode(this);
      }
   }
}

class Planetoid{
   /**
    * Procedurally generates a planetoid and it's nodes.
    * @constructor
    * @param {String} sys_id The coordinates of the system containing the planetoid in the form of 'x,y'.
    */
   constructor(par_id){
      this.state ={
         //Implemented
         parent_ID: par_id,
         //Implemented
         id: this.genID();
         //Implemented
         size: this.genSize(),
         //Not Implemented
         type: this.genType(),
         //Implemented
         nodes: this.genNodes(),
         //Implemented
         node_base: this.genNodeBase()
      }
   }
   /**
    * Generates the planetoid's 5 digit ID.
    * @returns The planetoid's 5 digit ID.
    */
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
   /**
    * Uses a weighted generation algorithm to determine the size of the planetoid.
    * @returns The size ID of the planetoid.
    */
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
   /**
    * NOT YET IMPLEMENTED
    * Randomly selects the type of the planetoid.
    */
   genType(){
      //Not yet implemented
   }
   /**
    * Randomly generates the number of nodes the planetoid has, and then generates the nodes.
    * @returns {Array} The Array of the planetoid's nodes.
    */
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
         result[k] = new ResourceNode(this);
      }
   }
   /**
    * Determines the node_base based off of the planetoid's size.
    */
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
   /**
    * Procedurally generates a node for its parent planet or planetoid.
    * @constructor
    * @param {String} par_id The ID of the planet or planetoid at which the node it located. 
    */
   constructor(par){
      this.state = {
         //Implemented
         parent_ID: par.state.id,
         //Implemented
         id: this.genID(),
         //Not Yet Implemented
         type: this.genType(),
         //Not Yet Implemented
         modules: []
      }
   }
   /**
    * Generates the node's 8 digit ID .
    * @returns {String} The node's 8 digit ID.
    */
   genID(){
      var result = null;
      for(var k = 0; k < 8; k++){
         if(k == 0)
            result = `${misc.randomnum(1,10)-1}`;
         else
            result += `${misc.randomnum(1,10)-1}`;
      }
      return result;
   }
   /**
    * NOT YET IMPLEMENTED
    * Randomly selects the type of node based off of its parent's type.
    * @returns {String} The name of the node's type.
    */
   genType(){
      //Not yet implemented
   }
}