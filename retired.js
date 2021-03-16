if (message.content.startsWith("!operators")) {
    const user_raw = message.content
    var user = user_raw.replace("!operators ","")
    if (/^([a-zA-Z0-9|._-]){3,15}$/.test(user)) {
      const username = user.charAt(0).toUpperCase() + user.slice(1)
      let attackers = await fetchOperator("attacker", String(user));
      attackStats = attackers.Attacker
      console.log(attackers)
      const attackMain = String(attackStats.map(o  => o.statsDetail)).substr(0, String(attackStats.map(o  => o.statsDetail)).indexOf(','));
      const attackKills = String(attackStats.map(o  => o.kills)).substr(0, String(attackStats.map(o  => o.kills)).indexOf(','));
      const attackDeaths = String(attackStats.map(o  => o.death)).substr(0, String(attackStats.map(o  => o.death)).indexOf(','));
      const attackKD = parseFloat(attackKills / attackDeaths).toFixed(2);
      let defenders = await fetchOperator("defender", String(user));
      defenderStats = defenders.Defender
      const defenderMain = String(defenderStats.map(o  => o.statsDetail)).substr(0, String(defenderStats.map(o  => o.statsDetail)).indexOf(','));
      const defenderKills = String(defenderStats.map(o  => o.kills)).substr(0, String(defenderStats.map(o  => o.kills)).indexOf(','));
      const defenderDeaths = String(defenderStats.map(o  => o.death)).substr(0, String(defenderStats.map(o  => o.death)).indexOf(','));
      const defenderKD = parseFloat(defenderKills / defenderDeaths).toFixed(2);

      const statsEmbed = new Discord.MessageEmbed()
        .setColor('#B980ca')
        .setTitle(username)
        .addField("```"+attackMain+"```", "Attacker")
        .addFields(
            { name: 'Kills', value: attackKills, inline: true },
            { name: 'Deaths', value: attackDeaths, inline: true },
            { name: 'K/D', value: attackKD, inline: true })
        .addField("```"+defenderMain+"```", "Defender")
        .addFields(
            { name: 'Kills', value: defenderKills, inline: true },
            { name: 'Deaths', value: defenderDeaths, inline: true },
            { name: 'K/D', value: defenderKD, inline: true })
        .setTimestamp()
        .setFooter('R6 Slut');
      message.channel.send(statsEmbed);
    } else {
      const statsEmbed = new Discord.MessageEmbed()
          .setColor('#B980ca')
          .setTitle('User not found')
          .setTimestamp()
          .setFooter('R6 Slut');
        message.channel.send(statsEmbed);
    }
}