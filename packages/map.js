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
         sectors: new Array(),
      }
   }
   /**
    * Calls the asynchronous functions to generate the fields of the object.
    */
   async init(){
      if(this.state.galaxyID == undefined)
         this.state.galaxyID = await this.genID();
      this.state.sectors = await this.genSectors();
      fs.writeFile(`../maps/${this.getID()}.json`, JSON.stringify(this.state), (err) =>{if(err) throw err;});
   }
   /**
    * Generates the galaxy's 10 digit code
    * @returns The galaxy's 10 digit code.
    */
   async genID(){
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
    * Creates and stores the sector objects in the galaxy's matrix of sectors.
    */
   async genSectors(){
      var s = new Array(this.state.x_size);
      for(var k = 0; k < this.state.x_size; k++){
         s[k] = new Array(this.state.y_size);
      }
      for(var k = 0; k < this.state.x_size; k++){
         for(var i = 0; i < this.state.x_size; i++){
            s[k][i] = new Sector(k-(this.state.x_size/2), i-(this.state.y_size/2));
            await s[k][i].init();
         }
      }
      return s;
   }
}

class Sector{
   /**
    * Procedurally generates an entire sector heirarchy.
    * @constructor
    * @param {Number} x The x-coordinate of the sector in its galaxy. 
    * @param {Number} y The y-coordinate of the sector in its galaxy.
    */
   constructor(x, y){
      this.state = {
         x_coord: x,
         y_coord: y,
         classif: new String(),
         planets: new Array(),
         planetIDs: new Array(),
         planetoids: new Array(),
         planetoidIDs: new Array(),
      }
      this.init();
   }
   /**
    * Calls the asynchronous functions to generate the fields of the object.
    */
   async init(){
      this.state = await this.genClassif(this.state);
      this.state = await this.genPlanets(this.state);
      this.state = await this.getPlanetIDs(this.state);
      this.state = await this.genPlanetoids(this.state);
      this.state = await this.getPlanetoidIDs(this.state);
   }
   /**
    * Uses a weighted generation algorithm to generate the size-classificaiton of the Sector.
    * @returns {Promise} Once resolved, it returns a modified version of the given Sector object.
    */
   async genClassif(sector){
      let temp = misc.randomnum(1,100);
      if(temp <= 1)
         temp = 'O';
      else if(temp <= 4)
         temp = 'B';
      else if(temp <= 9)
         temp = 'A';
      else if(temp <= 17)
         temp = 'F';
      else if(temp <= 41)
         temp = 'G';
      else if(temp <= 84)
         temp = 'K';
      else if(temp <= 100)
         temp = 'M';
      else{
         let temp2 = today.getFullYear()+'-'+(today.getMonth()+1)+'-'+today.getDate()+' '+today.getHours() + ":" + today.getMinutes() + ":" + today.getSeconds();
         fs.write('../8SectorGenerated.json', temp2, (err) => {if(err) throw err});
         temp = 8;
      }
      sector.classif = temp;
      return sector;
   }
   /**
    * Creates an randomly sized Array, based of the sector's classification, of generated planet objects.
    * @returns {Promise} On resolve returns a modified version of the Sector object.
    */
   async genPlanets(sector){
      let types = {
         M: {l: 3, h: 10},
         K: {l: 5, h: 16},
         G: {l: 8, h: 26},
         F: {l: 13, h: 42},
         A: {l: 21, h: 68},
         B: {l: 34, h: 110},
         O: {l: 55, h: 178},
      }
      let temp = types[sector.classif];
      let result = new Array(misc.randomnum(temp.l, temp.h));
      for(let k = 0; k < result.length; k++){
         result[k] = this.genPlanet(sector);
      }
      sector.planets = result;
      return sector;
   }
   genPlanet(sector){
      let result = new Planet(`${sector.x_coord},${sector.y_coord}`);
      result.init();
      return result;
   }
   /**
    * @returns {Promise} On resolve returns a modified version of the Sector object.
    */
   async getPlanetIDs(sector){
      let temp = new Array(sector.planets.length);
      for(let k = 0; k < sector.planets.length; k++){
         temp[k] = sector.planets[k].state.id;
      }
      sector.planetIDs = temp;
      return sector;
   }
   /**
    * Creates an randomly sized Array, based off of the sector's classification, of generated planetoid objects.
    * @returns {Promise} An array of planetoid objects.
    */
   async genPlanetoids(sector){
      let types = {
         M: {l: 1, h: 10},
         K: {l: 3, h: 26},
         G: {l: 6, h: 42},
         F: {l: 8, h: 68},
         A: {l: 13, h: 110},
         B: {l: 21, h: 178},
         O: {l: 34, h: 288},
      }
      let temp = types[sector.classif];
      let result = new Array(misc.randomnum(temp.l, temp.h));
      for(let k = 0; k < result.length; k++){
         result[k] = new Planetoid(`${sector.x_coord},${sector.y_coord}`);
      }
      sector.planetoids = result;
      return sector;
   }
   /**
    * Determines the IDs of all the sector's planetoid objects.
    * @returns {Promise} On resolve returns a modified version of the Sector object.
    */
   async getPlanetoidIDs(sector){
      let temp = new Array(sector.planetoids.length);
      for(let k = 0; k < sector.planetoids.length; k++){
         temp[k] = sector.planetoids[k].state.id;
      }
      sector.planetoidIDs = temp;
      return sector;
   }
}

class Planet{
   /**
    * Procedurally generates a planet and it's nodes.
    * @constructor
    * @param {String} sys_id The coordinates of the sector containing the planet in the form of 'x,y'.
    */
   constructor(sys_id){
      this.state = {
         parent_ID: sys_id,
         id: -1,
         size: -1,
         type: new String(),
         planetoids: new Array(),
         planetoidIDs: new Array(),
         restrictions: new Array(),
         accomodations: new Array(),
         node_base: -1,
         nodes: new Array(),
         inhabitants: new Array(),
      }
   }
   async init(){
      this.state.id = await this.genID();
      this.state.size = await this.genSize();
      this.state.type = await this.genType();
      this.state.planetoids = await this.genPlanetoids();
      //this.state.accomodations = await this.genAccomodations();
      //this.state.restrictions = await this.genRestrictions();
      this.state.node_base = await this.genNodeBase();
      this.state.nodes = await this.genNodes();
      //this.state.inhabitants = await this.genInhabitants();
      this.state.planetoidIDs = await this.getPlanetoidIDs(this);
   }
   /**
    * Uses a weighted generation algorithm to obtain the size ID of the planet.
    * @returns {Number} The size ID for the planet.
    */
   async genSize(){
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
    * Generates the planet's 3 digit ID.
    * @returns {String} The planet's 3 digit ID.
    */
   async genID(){
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
   async genType(){
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
    * Creates an randomly sized Array, based of the sector's classification, of generated planetoid objects.
    * @returns {Array} An array of planetoid objects.
    */
   async genPlanetoids(){
      let types = {
         1: {l:1, h:2},
         2: {l:1, h:3},
         3: {l:1, h:5},
         4: {l:1, h:8},
         5: {l:1, h:13},
      }
      let temp = types[this.state.size];
      let result = new Array(misc.randomnum(temp.l, temp.h));
      for(var k = 0; k < result.length; k++){
         result[k] = new Planetoid(`${this.state.parent_ID}:${this.state.id}`);
      }
      return result;
   }
   /**
    * @returns {Array} All the sector's planetoid's IDs.
    */
   async getPlanetoidIDs(planet){
         let temp = new Array(planet.state.planetoids.length);
         for(let k = 0; k < planet.state.planetoids.length; k++){
            temp[k] = planet.state.planetoids[k].state.id;
         }
         return temp;
   }
   /**
    * NOT YET FULLY IMPLEMENTED
    * Generates a random number of NPCs inhabiting the planet's surface based off of its size.
    */
   async genInhabitants(){
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
   async genRestrictions(){
      //Not yet implemented
   }
   /**
    * NOT YET IMPLEMENTED
    * Determines the building accomodation tags the planet is given based off of its terrain type and other miscelaneous factors.
    */
   async genAccomodations(){
      //Not yet implemented
   }
   /**
    * Determines the node_base based off of the planet's size.
    */
   async genNodeBase(){
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
   async genNodes(){
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
    * @param {String} sys_id The coordinates of the sector containing the planetoid in the form of 'x,y'.
    */
   constructor(par_id){
      this.state = {
         parent_ID: par_id,
         id: -1,
         size: -1,
         type: new String(),
         node_base: -1,
         nodes: new Array(),
         inhabitants: new Array(),
      }
      this.state.id = this.genID();
      this.state.size = this.genSize();
      this.state.type = this.genType();
      this.state.node_base = this.genNodeBase();
      this.state.nodes = this.genNodes();
      //this.state.inhabitants = this.genInhabitants();
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
   /**
    * NOT YET IMPLEMENTED
    */
   genInhabitants(){
      //See Planet.genInhabitants for current partial implementation.
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
         type: new String(),
         modules: new Array(),
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
   getItem: (userID, id) => {
      /*var p = profile.getprofile(userID);
      var g = JSON.parse(fs.readFileSync('../maps/0.json', (err) => {if(err) throw err;}));*/
   },
   galaxy: Galaxy,
   sector: Sector,
   planet: Planet,
   planetoid: Planetoid,
   resource_node: ResourceNode
}