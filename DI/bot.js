const Discord = require('discord.js');
const client = new Discord.Client();
const fs = require('graceful-fs');

const misc = require('../packages/misc.js');
const profile = require('../packages/profile.js');
const actions = require('../packages/actions.js');
const config = JSON.parse(fs.readFileSync('./config.json'));

/**
 * Runs when the bot has finished initializing the session.
 */
client.on('ready', () => {
  if(!fs.existsSync('../npcs') || !fs.existsSync('../profiles') || !fs.existsSync('../maps'))
    throw new Error('One or more referenced directories is missing');
  console.log(`Logged in as ${client.user.tag}!`);
});

/**
 * Runs when a message is sent somewhere the bot has access to.
 */
client.on('message', msg => {
  msg.content = msgprecon(msg);
  if(msg.content == null) return;
  //test
  if(msg.content == 'test'){
    msg.reply(`\`\`\`I here you loud and clear!\`\`\``);
  }
  else if(msg.content.substring(0, msg.content.indexOf(' ')).toLowerCase() == 'help' || msg.content.toLowerCase() == 'help') {
    msg.channel.send(`
__**Commands:**__
  -help: *Displays this message.*
  -roll: *Rolls a number of dice with the given number of sides.* **(i.e. roll 1d6; roll 3d12)**
  -create: *Creates a character if you do not already have one.*
  -profile/display: *Displays your character's stats, resources, and skills.*
  -whereami/location/wai/loc: *Displays your current in-game location.* **(WARNING: Use in public channels sparingly to avoid giving other factions an advantage)**
  -choose: *Prompts you to choose which in-game faction to join.* **(i.e. choose Symbic; choose Regalia; choose Empirus)**
    `);
  }
  //roll (number of dice)d(number of sides)
  else if(msg.content.substring(0, msg.content.indexOf(' ')).toLowerCase() == 'roll') {
    roll(msg, msg.content.substring(5, msg.content.indexOf('d')), msg.content.substring(msg.content.indexOf('d')+1));
  }
  else if(msg.content.toLowerCase() == 'roll' ){
    msg.reply(`you need to specify a number of dice and sides (i.e. 1d6).`);
  }
  //character create
  else if(msg.content.substring(0, msg.content.indexOf(' ')).toLowerCase() == 'create' || msg.content.toLowerCase() == 'create') {
    if(fs.existsSync(`../profiles/${msg.author.id}`)) {
      msg.channel.send(`You already have a character!`);
      return;
    }
    profile.create(msg.author.username, msg.author.id);
    msg.reply(`character made successfully!`);
  }
  //display character
  else if(msg.content.substring(0, msg.content.indexOf(' ')).toLowerCase() == 'profile' || msg.content.substring(0, msg.content.indexOf(' ')).toLowerCase() == 'display' || msg.content.toLowerCase() == 'profile' || msg.content.toLowerCase() == 'display') {
    if(fs.existsSync(`../profiles/${msg.author.id}`)) {
      var c = profile.getprofile(msg.author.id);
      msg.channel.send(`**Profile:**\n\n\n**Basic:**\n\`\`\`${profile.displayprofile.basic(c)}\`\`\`\n\n**Resources:**\n\`\`\`${profile.displayprofile.resources(c)}\`\`\`\n\n**Skills:**\n\`\`\`${profile.displayprofile.skills(c)}\`\`\``);
    }
    else {
      msg.channel.send(`You need to make a character first`);
    }
  }
  //where am I/location
  else if(msg.content.substring(0, msg.content.indexOf(' ')).toLowerCase() == 'whereami' || msg.content.toLowerCase() == 'whereami' || msg.content.substring(0, msg.content.indexOf(' ')).toLowerCase() == 'location' || msg.content.toLowerCase() == 'location' || msg.content.substring(0, msg.content.indexOf(' ')).toLowerCase() == 'wai' || msg.content.toLowerCase() == 'wai') {
    if(fs.existsSync(`../profiles/${msg.author.id}`)) {
      var c = profile.getprofile(msg.author.id);
      msg.channel.send(profile.displayprofile.location(c));
    }
    else {
      msg.reply(`you need to make a character to be able to use this command.`);
    }
  }
  //faction choice
  else if(msg.content.substring(0, msg.content.indexOf(' ')).toLowerCase() == 'faction' || msg.content.substring(0, msg.content.indexOf(' ')).toLowerCase() == 'choose') {
    if(fs.existsSync(`../profiles/${msg.author.id}`)) { 
      var c = profile.getprofile(msg.author.id);
      if(c.faction == 'undecided') {
        var temp = profile.chooseFaction(msg.author.id, msg.content.substring(msg.content.indexOf(' ')+1));
        if(temp == 'ERR')
          msg.channel.send(`There are no factions under the alias \`${msg.content.substring(msg.content.indexOf(' '))}\`.`);
        else
          msg.channel.send(`Welcome to the \`${temp}\`, <@${msg.author.id}>!`);
      }
      else
        msg.channel.send(`You are already a lifelong member of ${c.faction}, <@${msg.author.id}>.`)
    }
    else
      msg.reply(`you need to make a character to be able to use this command.`);
  }
  else if(msg.content.toLowerCase() == 'faction' || msg.content.toLowerCase() == 'choose') {
    if(fs.existsSync(`../profiles/${msg.author.id}`))
      msg.channel.send(`You must specify a faction to join (\`Empirus\`, \`Regalia\`, or \`Symbic\`)`);
    else
      msg.reply(`you need to make a character to be able to use this command.`);
  }
  //gather
  /*else if(msg.content.substring(0, msg.content.indexOf(' ')).toLowerCase() == 'gather' || msg.content.substring(0, msg.content.indexOf(' ')).toLowerCase() == 'get'){
    if(fs.existsSync(`../profiles/${msg.author.id}`)){
      let temp = actions.gather.gather(
        profile.getprofile(msg.author.id), 
        msg.content.substring(msg.content.indexOf(' ')+1)
      );
      if(temp != -1){
        msg.channel.send(`Gathering \`${msg.content.substring(msg.content.indexOf(' ')+1)}\`...`);
        let p = profile.getprofile(msg.author.id);
        p.resources[actions.gather.aliasToRes(msg.content.substring(msg.content.indexOf(' ')+1))] += new Number(temp);
        profile.saveprofile(p, msg.author.id);
        msg.channel.send(`Gathered \`${temp} in ${actions.gather.aliasToRes(msg.content.substring(msg.content.indexOf(' ')+1))}\``)
      }
      else{
        msg.channel.send(`Could not find the resource alias ${msg.content.substring(msg.content.indexOf(' ')+1)}`);
      }
    }
    else{
      msg.reply(`you need to make a character to be able to use this command.`);
    }
  }*/
  /*else if(msg.content.toLowerCase() == 'gather' || msg.content.toLowerCase() == 'get'){
    if(fs.existsSync(`../profiles/${msg.author.id}`))
      msg.channel.send(`You must specify a resource to gather.`);
    else
      msg.reply(`you need to make a character to be able to use this command.`);
  }*/
  //no command found
  else {
    if(msg.content.indexOf(' ') >= 0)
      msg.channel.send(`Command \`${msg.content.substring(0, msg.content.indexOf(' '))}\` not found`);
    else
      msg.channel.send(`Command \`${msg.content}\` not found`);
  }
});

/**
 * Checks for prefix and channel whitelist, then returns the message without the prefix.
 * @param {Message} msg A discord message object for the message sent.
 * @returns {Message} A revised version of the provided Message parameter.
 */
function msgprecon(msg){
  msg.content = msg.content.trim();
  if(msg.content.charAt(0) != '?'){
    return null;
  }
  if(!whitelist(msg)){
    return null;
  }
    return msg.content.substring(1);
}

/**
 * Checks to see if the message is sent in a channel the bot is programmed to respond in.
 * @param {Message} msg A discord message object for the message sent
 */
function whitelist(msg){
  for(var k = 0; k < config.whitelist.length; k++) 
    if(msg.channel.id == config.whitelist[k]) return true;
  if(msg.guild === null)
    return true;
}

/**
 * Simulates rolling 'numofdice' many dice with 'numofsides' many sides.
 * @param {MessageEvent} msg 
 * @param {Number} numofdice 
 * @param {Number} numofsides 
 */
function roll(msg, numofdice, numofsides){
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
      for(let roll = 1; roll <= numofdice; roll++){
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
  for(let roll = 1; roll <= numofdice; roll++){
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

client.login(config.login);