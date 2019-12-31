const Discord = require('discord.js');
const client = new Discord.Client();

client.on('ready', () => {
  console.log(`Logged in as ${client.user.tag}!`);
});

client.on('message', msg => {
  msg.content = msgprecon(msg);
  if(msg.content == null) return;
  if(msg.content == 'test'){
    msg.reply(`\`\`\`I here you loud and clear!\`\`\``);
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
}

client.login('NjA3NzA1MjYwMDAxMTk4MDkw.XgqIgw.SZzXU0-5bMe502Kg23EmgeoWbJo');