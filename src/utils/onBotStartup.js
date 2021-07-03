const config = require("../../config.json");

module.exports = function() {
	// Define (and set) some other variables
	const {Player} = require("discord-player"); // Create a new Player (Youtube API key is your Youtube Data v3 key)
	const player = new Player(bot, {autoSelfDeaf: false, leaveOnEmptyCooldown: 15000}); // To easily access the player

	bot.player = player;
	bot.filters = config.filters;

	// The bot needs his config file to work properly with the database.
	if (!config || !config.prefix || !config.token || !config.ownerId || !config.filters || !config.database || !config.database.dbName || !config.database.host || !config.database.port || !config.database.authSource || !config.APIKeys || !config.APIKeys.OpenWeatherMap)
		throw new Error("Missing information in config file. Please  refer to the 'README.md'.");

	bot.config = config;
	if (!bot.config.prefix)
		bot.config.prefix = "";

	bot.login(config.token);
	bot.db = require("./database/database.js");
	bot.db.connect();
};