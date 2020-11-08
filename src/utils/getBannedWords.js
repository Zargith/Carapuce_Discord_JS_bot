const config = require("../config.json");

module.exports = function(idServer) {
	for (let i = 0; i < config.guilds.length; i++)
		if (config.guilds[i]["guildID"] === idServer && config.guilds[i]["bannedWords"])
			return (config.guilds[i]["bannedWords"]);
	return;
};