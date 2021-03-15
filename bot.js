const Discord = require("discord.js");
const client = new Discord.Client();
const dotenv = require('dotenv').config()
const r6api = require('@vince144/r6-api');

let email = process.env.email;
let password = process.env.password;
let platform = 'uplay';
let season = '1';

let account = r6api.createAccount(email, password, platform);

async function fetchStats(user) { 
  try {
    let session = await r6api.createSession(account).catch(e => { console.error(e) }); 
    let player = await r6api.createPlayer(user, platform, session).catch(e => { console.error(e) }); 
    let stats = await r6api.getStatsBySeason(player, session, season).catch(e => { console.error(e) });
    return stats
  } catch {
    console.log("error")
  }
   
}


client.on("ready", () => {
  console.log(`Logged in as ${client.user.tag}!`);
});
 
client.on("message", async (message) => {
  if (message.content.startsWith("!find")) {
    const user_raw = message.content
    var user = user_raw.replace("!find ","")
    if (/^([a-zA-Z0-9|._-]){3,15}$/.test(user)) {
      try {
        let stats = await fetchStats(String(user));
        const username = user.charAt(0).toUpperCase() + user.slice(1)
        const statsEmbed = new Discord.MessageEmbed()
          .setColor('#B980ca')
          .setTitle('Ranked Stats')
          .setDescription(username)
          .addFields(
              { name: 'mmr', value: String(stats.map(o  => o.mmr)), inline: true },
              { name: 'max mmr', value: String(stats.map(o  => o.max_mmr)), inline: true })
          .setTimestamp()
          .setFooter('R6 Slut');
        message.channel.send(statsEmbed);
      } catch {
        const statsEmbed = new Discord.MessageEmbed()
          .setColor('#B980ca')
          .setTitle('User not found')
          .setTimestamp()
          .setFooter('R6 Slut');
        message.channel.send(statsEmbed);
      }
      } 
    } 
});
 
client.login(process.env.token);