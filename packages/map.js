const fs = require('graceful-fs');

const misc = require('./misc.js');
const npc = require('./npc.js');
const profile = require('./profile.js');
const actions = require('./actions.js');

class Galaxy{
   /**
    * Procedurally generates an entire galaxy heirarchy.
    * @constructor
    * @param {Number} x The size of the galaxy on its x-axis. 
    * @param {Number} y The size of the galaxy on its y-axis.
    * @param {String} id An optional parameter to create a galaxy with a predetermined ID.
    */
   constructor(x, y, id){
      this.state = {
         galaxyID: id,
         x_size: x,
         y_size: y,
         systems: null,
      }
      if(this.state.galaxyID == null)
         this.state.galaxyID = this.genID();
      this.state.systems = this.genSystems();
      fs.writeFileSync(`../maps/${this.getID()}.json`, JSON.stringify(this.state), (err) =>{if(err) throw err;});
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
      return temp;
   }
   /**
    * @returns the galaxy's ID
    */
   getID(){
      return this.state.galaxyID;
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
         for(var i = 0; i < this.state.x_size; i++){
            s[k][i] = new System(k-(this.state.x_size/2), i-(this.state.y_size/2));
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
         classif: null,
         planets: null,
         planetoids: null,
      }
      this.state.classif = this.genClassif();
      this.state.planetoids = this.genPlanetoids();
      this.state.planets = this.genPlanets();
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
         parent_ID: sys_id,
         id: -1,
         size: -1,
         capacity: -1,
         type: null,
         restrictions: null,
         accomodations: null,
         node_base: -1,
         nodes: null,
         inhabitants: null,
      }
      this.state.id = this.genID();
      this.state.size = this.genSize();
      this.state.capacity = this.genCapacity();
      this.state.type = this.genType();
      //this.state.accomodations = this.genAccomodations();
      //this.state.restrictions = this.genRestrictions();
      this.state.node_base = this.genNodeBase();
      this.state.nodes = this.genNodes();
      //this.state.inhabitants = this.genInhabitants();
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
    * Randomly selects the type of the planet.
    * @returns the type of the planet.
    */
   genType(){
      switch(misc.randomnum(1,7)){
         case 1:
            return 'barren';
         case 2:
            return 'lush';
         case 3:
            return 'aquatic';
         case 4:
            return 'gas';
         case 5:
            return 'rocky';
         case 6:
            return 'plains';
         case 7:
            return 'polis';
      }
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
            break;
         case 2:
            temp = misc.randomnum(3,8);
            break;
         case 3:
            temp = misc.randomnum(5,13);
            break;
         case 4:
            temp = misc.randomnum(8,21);
            break;
         case 5:
            temp = misc.randomnum(13,34);
            break;
         default:
            temp = 1;
      }
      var result = new Array(temp);
      for(var k = 0; k < result.length; k++){
         result[k] = new ResourceNode(this.state.id, this.state.type, this.state.node_base);
      }
      return result;
   }
}

class Planetoid{
   /**
    * Procedurally generates a planetoid and it's nodes.
    * @constructor
    * @param {String} sys_id The coordinates of the system containing the planetoid in the form of 'x,y'.
    */
   constructor(par_id){
      this.state = {
         parent_ID: par_id,
         id: -1,
         size: -1,
         type: null,
         node_base: null,
         nodes: null,
      }
      this.state.id = this.genID();
      this.state.size = this.genSize();
      this.state.type = this.genType();
      this.state.node_base = this.genNodeBase();
      this.state.nodes = this.genNodes();
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
    * Randomly selects the type of the planetoid.
    * @returns {String} the type of the planetoid.
    */
   genType(){
      switch(misc.randomnum(1,5)){
         case 1:
            return 'asteroid_belt';
         case 2:
            return 'comet';
         case 3:
            return 'asteroid';
         case 4:
            return 'moon';
         case 5:
            return 'ring';
      }
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
         result[k] = new ResourceNode(this.state.id, this.state.type, this.state.node_base);
      }
      return result;
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
    * @param {String} par_id The ID of the planet or planetoid at which the node is located. 
    * @param {String} par_type The type of the planet or planetoid at which the node is located.
    */
   constructor(par_id, par_type, par_base){
      this.state = {
         parent_ID: par_id,
         id: -1,
         type: null,
         modules: [],
         mod: 1,
         base: par_base,
      }
      this.state.id = this.genID();
      this.state.type = this.genType(`${par_type}`);
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
    * Randomly selects the type of node based off of its parent's type.
    * @param {String} ter The terrain type of the parent.
    * @returns {String} The name of the node's type.
    */
   genType(ter){
      ter = ter.toLowerCase();
      let temp = misc.randomnum(1,100);
      switch(ter){
         case 'barren':
            if(temp <= 40)
               return 'cave';
            else if(temp <= 60)
               return 'oil_field';
            else
               return 'ruin';
         case 'lush':
            if(temp <= 40)
               return 'wood';
            else if(temp <= 50)
               return 'city';
            else if(temp <= 60)
               return 'field';
            else if(temp <= 70)
               return 'cave';
            else if(temp <= 80)
               return 'ruin';
            else
               return 'oil_field';
         case 'aquatic':
            if(temp <= 10)
               return 'ruin';
            else if(temp <= 30)
               return 'city';
            else if(temp <= 70)
               return 'ocean';
            else if(temp <= 90)
               return 'cave';
            else
            return 'oil_field';
         case 'gas':
            if(temp <= 30)
               return 'city';
            else
               return 'gas_cloud';
         case 'rocky':
            if(temp <= 50)
               return 'cave';
            else if(temp <= 60)
               return 'city';
            else if(temp <= 80)
               return 'ruin';
            else
               return 'oil_field';
         case 'plains':
            if(temp <= 50)
               return 'field';
            else if(temp <= 70)
               return 'city';
            else if(temp <= 80)
               return 'wood';
            else
               return 'lake';
         case 'polis':
            if(temp <= 80)
               return 'city';
            else
               return 'ruins';
         case 'asteroid_belt':
            if(temp <= 90)
               return 'cave';
            else if(temp <= 95)
               return 'city';
            else
               return 'ruin';
         case 'comet':
            if(temp <= 20)
               return 'cave';
            else if(temp <= 60)
               return 'gas_cloud';
            else
               return 'oil_field';
         case 'asteroid':
            if(temp <= 80)
               return 'cave';
            else
               return 'oil_field';
         case 'moon':
            if(temp <= 40)
               return 'cave';
            else if(temp <= 70)
               return 'oil_field';
            else if(temp <= 90)
               return 'city';
            else
               return 'ruins';
         case 'ring':
            if(temp <= 40)
               return 'gas_cloud';
            else if(temp <= 80)
               return 'oil_field';
            else
               return 'cave';
         default:
            return 'ERR'; 
      }
   }
   /**
    * Calls the appropriate gather methods for the resource selected to be gather from the node.
    * @param {String} res Optional parameter if a specific resource is gathered.
    */
   getResource(p, res){
      let temp = '';
      switch(this.state.type){
         case 'cave':
            p.resources.stone += Math.ceil(actions.gather.stone(p)*.3);
            p.resources.slag += Math.ceil(actions.gather.slag(p)*.05);
            p.resources.tera_mat += Math.ceil(actions.gather.tera_mat(p)*.65);
            break;
         case 'wood':
            p.resources.nat_mat += Math.ceil(actions.gather.nat_mat(p)*.9);
            p.resources.seed += Math.ceil(actions.gather.seed(p)*.1);
            break;
         case 'field':
            p.resources.seed += Math.ceil(actions.gather.seed(p)*.7);
            p.resources.crop += Math.ceil(actions.gather.crop(p)*.3);
            break;
         case 'city':
            p.resources.personnel += Math.ceil(actions.gather.personnel(p)*1);
            break;
         case 'dark_star':
            p.resources.antimatter += actions.gather.antimatter(p);
            p.resources.relic_token += actions.gather.relic(p);
            p.resources.research_point += Math.ceil(actions.gather.research(p)*.9);
            break;
         case 'ruin':
            p.resources.research_point += Math.ceil(actions.gather.research(p)*.9);
            p.resources.relic_token += actions.gather.relic(p);
            break;
         case 'ocean':
            p.resources.food += Math.ceil(p.resources.food += misc.randomnum(1,p.resources.personnel/4)*Math.random()*50*Math.log(p.skills.cooking)*1);
            break;
         case 'gas_cloud':
            p.resources.hydrogen += Math.ceil(actions.gather.hydrogen(p)*.45);
            p.resources.heliumI += Math.ceil(actions.gather.heliumI(p)*.35);
            p.resources.heliumII += Math.ceil(actions.gather.heliumII(p)*.15);
            p.resources.heliumIII += Math.ceil(actions.gather.heliumIII(p)*.05);
            break;
         case 'lake':
            p.resources.food += Math.ceil(p.resources.food += misc.randomnum(1,p.resources.personnel/8)*Math.random()*50*Math.log(p.skills.cooking)*1);
            break;
         case 'oil_field':
            p.resources.oil += Math.ceil(actions.gather.oil(p)*.9);
            p.resources.hydrogen += Math.ceil(actions.gather.hydrogen(p)*.1);
            break;
      }
   }
}

module.exports = {
   /**
    * Finds the whereabouts of an item based off its ID.
    * @param {String} userID The player's ID. 
    * @param {String} id The ID of the item to be looked up.
    */
   getItem: function(userID, id){
      var p = profile.getprofile(userID);
      var g = JSON.parse(fs.readFileSync('../maps/0.json', (err) => {if(err) throw err;}));
   },
   galaxy: Galaxy,
   system: System,
   planet: Planet,
   planetoid: Planetoid,
   resource_node: ResourceNode
}