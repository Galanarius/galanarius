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
      
      for(var k = 0; k < this.state.x_size; k++){
         for(var i = 0; i < this.state.y_size; i++){

         }
      }
   }
}

class System{

}