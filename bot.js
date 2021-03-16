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
  } catch (e) {
    console.log(e)
  }
}

client.on("ready", () => {
  console.log(`Logged in as ${client.user.tag}!`);
});
 
function getRank(mmr) {
  if (mmr >= 5000) {
    return rank = "Champion"
  }
  if (mmr >= 4400) {
    return rank = "Diamond"
  } 
  if (mmr >= 4000) {
    return rank = "Platinum I"
  }
  if (mmr >= 3600) {
    return rank = "Platinum II"
  } 
  if (mmr >= 3200) {
    return rank = "Platinum III"
  } 
  if (mmr >= 3000) {
    return rank = "Gold I"
  } 
  if (mmr >= 2800) {
    return rank = "Gold II"
  } 
  if (mmr >= 2600) {
    return rank = "Gold III"
  } 
  if (mmr >= 2500) {
    return rank = "Silver I"
  } 
  if (mmr >= 2400) {
    return rank = "Silver II"
  } 
  if (mmr >= 2300) {
    return rank = "Silver III"
  } 
  if (mmr >= 2200) {
    return rank = "Silver IV"
  } 
  if (mmr >= 2100) {
    return rank = "Silver V"
  } 
  if (mmr >= 2000) {
    return rank = "Bronze I"
  } 
  if (mmr >= 1900) {
    return rank = "Bronze II"
  }
  if (mmr >= 1800) {
    return rank = "Bronze III"
  } 
  if (mmr >= 1700) {
    return rank = "Bronze IV"
  } 
  if (mmr >= 1600) {
    return rank = "Bronze V"
  } 
  if (mmr >= 1500) {
    return rank = "Copper I"
  }
  if (mmr >= 1400) {
    return rank = "Copper II"
  }
  if (mmr >= 1300) {
    return rank = "Copper III"
  }
  if (mmr >= 1200) {
    return rank = "Copper IV"
  }
  if (mmr >= 1100) {
    return rank = "Copper V"
  } else {
    return rank = "Dust I"
  }
}

client.on("message", async (message) => {
  if (message.content.startsWith("!find")) {
    const user_raw = message.content
    var user = user_raw.replace("!find ","")
    if (/^([a-zA-Z0-9|._-]){3,15}$/.test(user)) {
      try {
        let stats = await fetchStats(String(user));
        const mmr = stats.map(o  => o.mmr)
        const rank = getRank(mmr)
        const username = user.charAt(0).toUpperCase() + user.slice(1)
        const statsEmbed = new Discord.MessageEmbed()
          .setColor('#B980ca')
          .setTitle(username)
          .setDescription(rank)
          .addFields(
              { name: 'mmr', value: String(stats.map(o  => o.mmr)), inline: true },
              { name: 'max mmr', value: String(stats.map(o  => o.max_mmr)), inline: true },
              { name: 'mmr change', value: String(stats.map(o  => o.last_match_mmr_change)), inline: true },
              { name: 'K/D', value: (parseFloat(String(stats.map(o  => o.kills))) / parseFloat(String(stats.map(o  => o.deaths)))).toFixed(2), inline: true },
              { name: 'kills', value: String(stats.map(o  => o.kills)), inline: true },
              { name: 'deaths', value: String(stats.map(o  => o.deaths)), inline: true })
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
    } else {
      const statsEmbed = new Discord.MessageEmbed()
          .setColor('#B980ca')
          .setTitle('User not found')
          .setTimestamp()
          .setFooter('R6 Slut');
        message.channel.send(statsEmbed);
    }
  } 
  if(message.content.startsWith("!help")) {
    const statsEmbed = new Discord.MessageEmbed()
          .setColor('#B980ca')
          .setTitle("Commands")
          .addFields(
              { name: 'find', value: "Shows the ranked stats for that player."},
              { name: 'help', value: "Shows this help menu."})
          .setTimestamp()
          .setFooter('R6 Slut');
        message.channel.send(statsEmbed);
  }
});
 
client.login(process.env.token);