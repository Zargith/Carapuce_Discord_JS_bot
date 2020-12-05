const config = require("../../config.json");
const emojis = require("../utils/emojiCharacters.js");
const help = require("./helps/help.js");
const cleanChannel = require("./admin_commands/clean_messages/cleanChannel.js");
const usersCommands = require("./usersCommands.js");
const cleanAfterMessage = require("./admin_commands/clean_messages/cleanAfterMessage.js");
const cleanNLastMessages = require("./admin_commands/clean_messages/cleanNLastMessages.js");
const testThrow = require("./admin_commands/testThrow.js");
const channelsOfServer = require("./admin_commands/channelsOfServer.js");
const messageToChannel = require("./admin_commands/messageToChannel.js");
const sendMP = require("./admin_commands/sendMP.js");
const listOfServers = require("./admin_commands/listOfServers.js");
const restartBot = require("./admin_commands/restartBot.js");
const countRole = require("./admin_commands/count_roles/countRole.js");
// const createServerConfig = require("./admin_commands/createServerConfig.js");
// const defineReportLogChannel = require("./admin_commands/defineReportLogChannel.js");
// const defineDefaultRole = require("./admin_commands/defineDefaultRole.js");
// const defineUnauthorizedCommands = require("./admin_commands/defineUnauthorizedCommands.js");
// const redefineUnauthorizedCommands = require("./admin_commands/redefineUnauthorizedCommands.js");
// const showTableInDB = require("./admin_commands/showTableInDB.js");
// const dropTable = require("./admin_commands/dropTable.js");
// const defineBannedWords = require("./admin_commands/defineBannedWords.js");
// const redefineBannedWords = require("./admin_commands/redefineBannedWords.js");
// const manageRole = require("./count_roles/manageRole.js");


module.exports = function(message, bot) {
	const command = message.content.trim().split(" ").shift();
	const args = message.content.split(" ");

	// check if the first word of the message content is equal to one of the following ones
	switch (command) {
		case (`${config.prefix}emote`):
			message.delete();
			message.channel.send(emojis.carapuce);
			return;

		case (`${config.prefix}happy`):
			message.delete();
			message.channel.send(emojis.happy_carapuce);
			return;

		case (`${config.prefix}sad`):
			message.delete();
			message.channel.send(emojis.sad_carapuce);
			return;

		case (`${config.prefix}angry`):
			message.delete();
			message.channel.send(emojis.angry_carapuce);
			return;

		case (`${config.prefix}surprised`):
			message.delete();
			message.channel.send(emojis.surprised_carapuce);
			return;

		case (`${config.prefix}adminHelp`):
			if (args.length !== 1) {
				message.channel.send("Cette commande ne prend pas de paramètre(s)");
				break;
			}
			// print the help for admins
			help.printAdminHelp(message);
			break;

		case (`${config.prefix}help`):
			if ((args.length === 2 && args[1].toLowerCase() === "db") || (args.length === 3 && args[1].toLowerCase() === "data" && args[2].toLowerCase() === "base")) {
				help.printDataBaseHelp(message);
				break;
			} else {
				// maybe another help so redirect to users commands function
				usersCommands(message, bot);
			}
			break;

		case (`${config.prefix}restart`):
			if (args.length !== 1) {
				message.channel.send("Cette commande ne prend pas de paramètre(s)");
				break;
			}
			// restart the bot except if it doesn't run with pm2 or anything that allow it to restart when the program is shutdowned
			restartBot(message.channel, bot);
			break;

		case (`${config.prefix}count`):
			// counting role on the server
			countRole(message, bot);
			break;

		case (`${config.prefix}clean`):
			if (args.length !== 1) {
				message.channel.send("Cette commande ne prend pas de paramètre(s)");
				break;
			}
			// clean al messages into the channel
			cleanChannel(message);
			break;

		case (`${config.prefix}cleanAfter`):
			// clean all messages in a channel after a message given as parameter (an ID is necessary)
			cleanAfterMessage(message);
			break;

		case (`${config.prefix}cleanNLasts`):
			// clean the N last messages of the channel (+1 that is th command)
			cleanNLastMessages(message);
			break;

		case (`${config.prefix}throw`):
			// send a test throw to check if the repport log channel is well defined
			testThrow(message, bot);
			break;

		case (`${config.prefix}listServers`):
			if (args.length !== 1) {
				message.channel.send("Cette commande ne prend pas de paramètre");
				break;
			}
			// send a list of Discord servers that th ebot is connected to with thir ID
			listOfServers(message, bot);
			break;

		case (`${config.prefix}channelsOfServer`):
			// send the list of channels of a server given as parameter (an ID is necessary) with their name, ID and type
			channelsOfServer(message, bot);
			break;

		case (`${config.prefix}messageToChannel`):
			// send a message to a channel like if the bot said that
			messageToChannel(messageToChannel, bot);
			break;

		case (`${config.prefix}sendMP`):
			// send a private message to someone like if the bot said that
			sendMP(message, bot);
			break;

		case (`${config.prefix}pin`):
			// to pin a the message
			message.pin();
			break;

		case (`${config.prefix}unpin`):
			// to unpin a the message
			if (args.length != 2) {
				message.channel.send(`Il faut que tu me donnes l'ID du message que tu veux unpin ${emojis.carapuce}`);
				break;
			}
			message.channel.messages.fetch(args[1]).then(msg => {
				if (!msg) {
					message.channel.send(`Il faut que tu me donnes l'ID du message que tu veux unpin, celui-ci doit être dans le channel où tu rentres cette commande ${emojis.carapuce}`);
					return;
				}
				if (!msg.pinned) {
					message.channel.send(`Message not pinned ${emojis.carapuce}`);
					return;
				}
				msg.unpin();
				message.channel.send(`Message unpinned ${emojis.happy_carapuce}`);
			}).catch(err => {
				throw err;
			});
			break;

		case (`${config.prefix}join`):
			if (message.guild === null) {
				message.reply("Tu ne peux pas utiliser cette commande en privé.");
				return;
			}
			bot.emit("guildMemberAdd", message.member);
			break;

		// case (`${config.prefix}createServerConfig`):
		// 	createServerConfig(message, bot);
		// 	break;
		// case (`${config.prefix}defineLogChannel`):
		// 	defineReportLogChannel(message, bot);
		// 	break;
		// case (`${config.prefix}defineRole`):
		// 	defineDefaultRole(message, bot);
		// 	break;
		// case (`${config.prefix}defineCommands`):
		// 	defineUnauthorizedCommands(message, bot);
		// 	break;
		// case (`${config.prefix}redefineCommands`):
		// 	redefineUnauthorizedCommands(message, bot);
		// 	break;
		// case (`${config.prefix}defineBannedWords`):
		// 	defineBannedWords(message, bot);
		// 	break;
		// case (`${config.prefix}redefineBannedWords`):
		// 	redefineBannedWords(message, bot);
		// 	break;
		// case (`${config.prefix}showTable`):
		// 	showTableInDB(message, bot);
		// 	break;
		// case (`${config.prefix}dropTable`):
		// 	dropTable(message);
		// 	break;
		default:
			// if not an admin command, go to users commands parsing function
			usersCommands(message, bot);
			break;
	}
};
