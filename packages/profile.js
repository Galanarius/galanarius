const fs = require('graceful-fs');
const mkdirp = require('mkdirp');
const copydir = require('copy-dir');
const path = require('path');

module.exports ={
   create: function(user, userID){
      copydir('../ref/profile-template', `../profiles/${userID}`,{utimes: true, mode: true, cover: true},(err)=>{if(err){throw err; return;}});
      setTimeout(function(){
         var c = JSON.parse(fs.readFileSync(`../profiles/${userID}/profile.json`));
      c.username = user;
      c.ID = userID;
      setTimeout(function(){
         fs.writeFileSync(`../profiles/${userID}/profile.json`, JSON.stringify(c), (err) => {if(err) throw err});
      }, 500);
      }, 500);
      
   }
}