const Discord = require('discord.js');
const client = new Discord.Client();

client.on('ready', () => {
  console.log(`Logged in as ${client.user.tag}!`);
});

client.on('message', msg => {
  if (msg.content === 'ping') {
    msg.reply('Pong!');
  }
});

client.login('NjA3NzA1MjYwMDAxMTk4MDkw.XgqEQA.4QJNtW33ncL-0t5koeq49GA8QXA');