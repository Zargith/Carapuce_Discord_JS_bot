module.exports = function(idServer) {
	for (let i = 0; i < bot.config.guilds.length; i++)
		if (bot.config.guilds[i]["guildID"] === idServer && bot.config.guilds[i]["bannedWords"])
			return (bot.config.guilds[i]["bannedWords"]);
	return;
};