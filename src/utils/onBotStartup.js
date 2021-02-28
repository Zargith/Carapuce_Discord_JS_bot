const config = require("../../config.json");

module.exports = function() {
	// Define (and set) some other variables
	const {Player} = require("discord-player"); // Create a new Player (Youtube API key is your Youtube Data v3 key)
	const player = new Player(bot, {autoSelfDeaf: false, leaveOnEmptyCooldown: 15000}); // To easily access the player

	bot.player = player;
	bot.filters = config.filters;

	if (config.prefix)
		bot.prefix = config.prefix;
	else
		bot.prefix = "";

	bot.login(config.token);

};