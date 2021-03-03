module.exports = function(idServer) {
	for (let i = 0; i < bot.config.guilds.length; i++)
		if (bot.config.guilds[i]["guildID"] === idServer)
			return (true);
	return (false);
};