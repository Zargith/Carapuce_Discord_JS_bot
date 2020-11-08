const config = require("../config.json");

module.exports = function(idServer) {
	for (let i = 0; i < config.guilds.length; i++)
		if (config.guilds[i]["guildID"] === idServer)
			return (true);
	return (false);
};