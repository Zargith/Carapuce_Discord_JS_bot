module.exports = function(idServer) {
	if (!idServer)
		return;
	for (let i = 0; i < bot.config.guilds.length; i++)
		if (bot.config.guilds[i]["guildID"] === idServer && bot.config.guilds[i]["reportLogChannel"])
			return (bot.config.guilds[i]["reportLogChannel"]);
	return;
};