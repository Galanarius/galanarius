const Discord = require('discord.js');
const client = new Discord.Client();
const fs = require('graceful-fs');
const misc = require('../packages/misc.js');
const profile = require(`../packages/profile.js`);

client.on('ready', () => {
  console.log(`Logged in as ${client.user.tag}!`);
});

client.on('message', msg => {
  msg.content = msgprecon(msg);
  if(msg.content == null) return;
  //test
  if(msg.content == 'test'){
    msg.reply(`\`\`\`I here you loud and clear!\`\`\``);
  }
  //roll (number of dice)d(number of sides)
  else if(msg.content.substring(0, msg.content.indexOf(' ')) == 'roll'){
    roll(msg, msg.content.substring(5, msg.content.indexOf('d')), msg.content.substring(msg.content.indexOf('d')+1));
  }
  //character create
  else if(msg.content.substring(0, msg.content.indexOf(' ')) == 'create' || msg.content == 'create'){
    if(fs.existsSync(`../profiles/${msg.author.id}`)){
      msg.channel.send(`You already have a character!`);
      return;
    }
    profile.create(msg.author.username, msg.author.id);
    msg.reply(`character made successfully!`);
  }
  //display character
  else if(msg.content.substring(0, msg.content.indexOf(' ')) == 'profile' || msg.content.substring(0, msg.content.indexOf(' ')) == 'display' || msg.content == 'profile' || msg.content == 'display'){
    if(fs.existsSync(`../profiles/${msg.author.id}`)){
      var c = profile.getprofile(msg.author.id);
      msg.channel.send(`**Profile:**\n\n\n**Basic:**\n\`\`\`${profile.displayprofile.basic(c)}\`\`\`\n\n**Resources:**\n\`\`\`${profile.displayprofile.resources(c)}\`\`\`\n\n**Skills:**\n\`\`\`${profile.displayprofile.skills(c)}\`\`\``);
    }
    else{
      msg.channel.send(`You need to make a character first`);
    }
  }
  //no command found
  else{
    msg.channel.send('Command not found');
  }
});

//Checks for prefix and channel whitelist, then returns the message without the prefix
function msgprecon(msg){
  msg.content = msg.content.trim();
  if(msg.content.charAt(0) != '?'){
    return null;
  }
  else if(!whitelist(msg)){
    return null;
  }
  else{
    return msg.content.substring(1);
  }
}

function whitelist(msg){
  var channellist = ['600805783088660563'];
  for(var k = 0; k < channellist.length; k++) 
    if(msg.channel.id == channellist[k]) return true;
  if(msg.guild === null)
    return true;
}

function roll(msg, numofdice, numofsides){
  numofdice = new Number(numofdice);
  numofsides = new Number(numofsides);
  //console.log(`Number of dice: ${numofdice}`);
  //console.log(`Number of sides: ${numofsides}`);
  var result = 0;
  try{
      var resultarr = new Array(numofdice);
  }
  catch{
      msg.channel.send('ERR too many dice!');
      return;
  }
  try{
      for(var roll = 1; roll <= numofdice; roll++){
      resultarr[roll] = misc.randomnum(1, numofsides);
      //console.log(resultarr[roll]);
      result += resultarr[roll];
      }
  }
  catch{
      msg.channel.send('ERR too many sides!');
      return;
  }
  result = 'Total: ' + result + '     Rolls: '
  for(var roll = 1; roll <= numofdice; roll++){
      if(roll != numofdice){
          result = result + resultarr[roll] + ', ';
      }
      else{
          result = result + resultarr[roll];
      }
  }
  //console.log(result);
  msg.channel.send(result.toString());
}

client.login('NjA3NzA1MjYwMDAxMTk4MDkw.XgqIgw.SZzXU0-5bMe502Kg23EmgeoWbJo');