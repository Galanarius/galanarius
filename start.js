const cmd = require('node-cmd');
const readline = require('readline').createInterface({
   input: process.stdin,
   output: process.stdout
 });
 
 readline.question(`Enter the id for the program you wish to run =>`, (choice) => {
   console.log(`${choice} is now running`);
   cmd.get(`${choice}.bat`,(err, data, stderr) =>{
      if(err){
         console.log(err);
      }
      else{
         console.log(data);
      }
   });
   readline.close();
 });