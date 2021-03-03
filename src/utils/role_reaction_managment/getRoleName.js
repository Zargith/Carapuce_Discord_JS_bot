module.exports = function(idServer, idMessage, emoji) {
	let guild;
	for (let i = 0; i < bot.config.guilds.length; i++)
		if (bot.config.guilds[i]["guildID"] === idServer)
			guild = bot.config.guilds[i];
	if (!guild)
		return;
	let listener;
	for (let i = 0; i < guild["listeners"].length; i++)
		if (guild["listeners"][i]["messageID"] === idMessage)
			listener = guild["listeners"][i];
	if (!listener)
		return;
	for (let i = 0; i < listener["reactionRole"].length; i++)
		if (listener["reactionRole"][i]["emoji"] === emoji)
			return (listener["reactionRole"][i]["roleName"]);
	return;
};