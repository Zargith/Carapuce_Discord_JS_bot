module.exports = function(idServer, idMessage) {
	let guild;
	for (let i = 0; i < bot.config.guilds.length; i++)
		if (bot.config.guilds[i]["guildID"] === idServer)
			guild = bot.config.guilds[i];
	if (!guild)
		return (false);
	for (let i = 0; i < guild["listeners"].length; i++)
		if (guild["listeners"][i]["messageID"] === idMessage)
			return (true);
	return (false);
};