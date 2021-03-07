const config = require("../../config.json");

module.exports = function() {
	// Define (and set) some other variables
	const {Player} = require("discord-player"); // Create a new Player (Youtube API key is your Youtube Data v3 key)
	const player = new Player(bot, {autoSelfDeaf: false, leaveOnEmptyCooldown: 15000}); // To easily access the player

	bot.player = player;
	bot.filters = config.filters;

	// The bot needs his config file to work properly with the database.
	if (!config || !config.dbName)
		throw new Error("Missing information in config file.");

	bot.config = config;
	if (!bot.config.prefix)
		bot.config.prefix = "";

	bot.login(config.token);
	bot.db = require("./database/database.js");
	bot.db.connect();
};