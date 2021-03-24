const emojis = require("../utils/emojiCharacters.js");
const help = require("./helps/help.js");
const usersCommands = require("./usersCommands.js");
const adminCommands = require("./adminCommands.js");
const channelsOfServer = require("./whitelist_commands/channelsOfServer.js");
const messageToChannel = require("./whitelist_commands/messageToChannel.js");
const sendMP = require("./whitelist_commands/sendMP.js");
const listOfServers = require("./whitelist_commands/listOfServers.js");
const restartBot = require("./whitelist_commands/restartBot.js");
const isServerAdmin = require("../utils/isServerAdmin.js");
const serverConfigInDB = require("../utils/database/serverConfigInDB.js");

module.exports = function(message) {
	const args = message.content.trim().split(" ");
	const command = args.shift();

	// check if the first word of the message content is equal to one of the following ones
	switch (command) {
		case (`${bot.config.prefix}emote`):
			message.delete();
			message.channel.send(emojis.carapuce);
			return;

		case (`${bot.config.prefix}happy`):
			message.delete();
			message.channel.send(emojis.happy_carapuce);
			return;

		case (`${bot.config.prefix}sad`):
			message.delete();
			message.channel.send(emojis.sad_carapuce);
			return;

		case (`${bot.config.prefix}angry`):
			message.delete();
			message.channel.send(emojis.angry_carapuce);
			return;

		case (`${bot.config.prefix}surprised`):
			message.delete();
			message.channel.send(emojis.surprised_carapuce);
			return;

		case (`${bot.config.prefix}whitelistHelp`):
			if (args.length !== 1) {
				message.channel.send("Cette commande ne prend pas de paramètre(s)");
				break;
			}
			// print the help for people in bot's whitelist
			help.printWhitelistHelp(message);
			break;

		case (`${bot.config.prefix}restart`):
			if (args.length !== 1) {
				message.channel.send("Cette commande ne prend pas de paramètre(s)");
				break;
			}
			// restart the bot except if it doesn't run with pm2 or anything that allow it to restart when the program is shutdowned
			restartBot(message.channel);
			break;

		case (`${bot.config.prefix}listServers`):
			if (args.length !== 1) {
				message.channel.send("Cette commande ne prend pas de paramètre");
				break;
			}
			// send a list of Discord servers that th ebot is connected to with thir ID
			listOfServers(message);
			break;

		case (`${bot.config.prefix}channelsOfServer`):
			// send the list of channels of a server given as parameter (an ID is necessary) with their name, ID and type
			channelsOfServer(message);
			break;

		case (`${bot.config.prefix}messageToChannel`):
			// send a message to a channel like if the bot said that
			messageToChannel(message);
			break;

		case (`${bot.config.prefix}sendMP`):
			// send a private message to someone like if the bot said that
			sendMP(message);
			break;

		case (`${bot.config.prefix}serverConfig`):
			if (message.guild === null) {
				message.reply("Tu ne peux pas utiliser cette commande en privé.");
				break;
			}
			serverConfigInDB(message);
			break;

		default:
			// if the user is an admin, then go to the admin commands parsing function
			if (message.guild && isServerAdmin(message)) {
				adminCommands(message);
				break;
			}
			// if not an admin command, then go to users commands parsing function
			usersCommands(message);
			break;
	}
};
