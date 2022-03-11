const config = require("../../config.json");
const { REST } = require("@discordjs/rest");
const { Routes } = require("discord-api-types/v9");
const getAllCommands = require("./getAllCommands");
// const { Player } = require("discord-player");

module.exports = async function() {
	// The bot needs his config file to work properly with the database.
	// if (!config || !config.prefix || !config.token || !config.applicationId || !config.ownerId || !config.filters || !config.database || !config.database.dbName || !config.database.host || !config.database.port || !config.database.authSource || !config.apiKeys || !config.apiKeys.OpenWeatherMap)
	// 	throw new Error("Missing information in config file. Please  refer to the 'README.md'.");

	// Define (and set) some other variables

	// Create a new Player (Youtube API key is your Youtube Data v3 key)
	// bot.player = new Player(bot, {autoSelfDeaf: false, leaveOnEmptyCooldown: 15000}); // To easily access the player //DESACTIVATED
	bot.filters = config.filters;

	bot.config = config;
	if (!bot.config.prefix)
		bot.config.prefix = "";

	bot.login(config.token);
	// bot.db = require("./database/database.js");
	// bot.db.connect();

	const rest = new REST({ version: "9" }).setToken(config.token);
	(async () => {
		try {
			console.log("Started refreshing application (/) commands.");
			await rest.put(Routes.applicationCommands(bot.config.applicationId), { body: getAllCommands() });
			console.log("Successfully reloaded application (/) commands.");
		} catch (error) {
			console.error(error);
		}
	})();
};