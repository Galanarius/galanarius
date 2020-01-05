const fs = require('fs');
const mkdirp = require('mkdirp');
const copydir = require('copy-dir');

module.exports ={
   create: function(user, id){
      copydir(`../ref/profile-template`, `../profiles/${id}`, (err) => {
         if(err){
            throw err;
            return;
         }
      });
      var c = fs.readFile(`../profiles/${id}/profile.json`);
      c.username = user;
      c.ID = id;
      console.log(`Character created succesfully`);
   }
}