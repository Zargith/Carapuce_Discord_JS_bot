const emojis = require("../utils/emojiCharacters.js");
const help = require("./helps/help.js");
const cleanChannel = require("./admin_commands/clean_messages/cleanChannel.js");
const usersCommands = require("./usersCommands.js");
const cleanAfterMessage = require("./admin_commands/clean_messages/cleanAfterMessage.js");
const cleanNLastMessages = require("./admin_commands/clean_messages/cleanNLastMessages.js");
const testThrow = require("./admin_commands/testThrow.js");
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


module.exports = function(message) {
	const args = message.content.trim().split(" ");
	const command = args.shift();

	// check if the first word of the message content is equal to one of the following ones
	switch (command) {
		case (`${bot.prefix}emote`):
			message.delete();
			message.channel.send(emojis.carapuce);
			return;

		case (`${bot.prefix}happy`):
			message.delete();
			message.channel.send(emojis.happy_carapuce);
			return;

		case (`${bot.prefix}sad`):
			message.delete();
			message.channel.send(emojis.sad_carapuce);
			return;

		case (`${bot.prefix}angry`):
			message.delete();
			message.channel.send(emojis.angry_carapuce);
			return;

		case (`${bot.prefix}surprised`):
			message.delete();
			message.channel.send(emojis.surprised_carapuce);
			return;

		case (`${bot.prefix}adminHelp`):
			if (args.length !== 0) {
				message.channel.send("Cette commande ne prend pas de paramètre.");
				break;
			}
			// print the help for admins
			help.printAdminHelp(message);
			break;

		case (`${bot.prefix}help`):
			if ((args.length === 1 && args[0].toLowerCase() === "db") || (args.length === 2 && args[0].toLowerCase() === "data" && args[1].toLowerCase() === "base")) {
				help.printDataBaseHelp(message);
				break;
			} else {
				// maybe another help so redirect to users commands function
				usersCommands(message);
			}
			break;

		case (`${bot.prefix}restart`):
			if (args.length !== 0) {
				message.channel.send("Cette commande ne prend pas de paramètre.");
				break;
			}
			// restart the bot except if it doesn't run with pm2 or anything that allow it to restart when the program is shutdowned
			restartBot(message.channel);
			break;

		case (`${bot.prefix}count`):
			if (args.length !== 1) {
				message.channel.send("Cette commande a besoin d'un paramètre (ex: `ID du rôle`, `@leRole` ou `leNomDuRôle`).");
				break;
			}
			// counting role on the server
			countRole(message);
			break;

		case (`${bot.prefix}clean`):
			if (args.length !== 0) {
				message.channel.send("Cette commande ne prend pas de paramètre.");
				break;
			}
			// clean al messages into the channel
			cleanChannel(message);
			break;

		case (`${bot.prefix}cleanAfter`):
			// clean all messages in a channel after a message given as parameter (an ID is necessary)
			cleanAfterMessage(message);
			break;

		case (`${bot.prefix}cleanNLasts`):
			// clean the N last messages of the channel (+1 that is th command)
			cleanNLastMessages(message);
			break;

		case (`${bot.prefix}throw`):
			// send a test throw to check if the repport log channel is well defined
			testThrow(message);
			break;

		case (`${bot.prefix}pin`):
			// to pin a the message
			message.pin();
			break;

		case (`${bot.prefix}unpin`):
			// to unpin a the message
			if (args.length != 1) {
				message.channel.send(`Il faut que tu me donnes l'ID du message que tu veux unpin ${emojis.carapuce}`);
				break;
			}
			message.channel.messages.fetch(args[0]).then(msg => {
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

		case (`${bot.prefix}join`):
			if (message.guild === null) {
				message.reply("Tu ne peux pas utiliser cette commande en privé.");
				return;
			}
			bot.emit("guildMemberAdd", message.member);
			break;

		// case (`${bot.prefix}createServerConfig`):
		// 	createServerConfig(message);
		// 	break;
		// case (`${bot.prefix}defineLogChannel`):
		// 	defineReportLogChannel(message);
		// 	break;
		// case (`${bot.prefix}defineRole`):
		// 	defineDefaultRole(message);
		// 	break;
		// case (`${bot.prefix}defineCommands`):
		// 	defineUnauthorizedCommands(message);
		// 	break;
		// case (`${bot.prefix}redefineCommands`):
		// 	redefineUnauthorizedCommands(message);
		// 	break;
		// case (`${bot.prefix}defineBannedWords`):
		// 	defineBannedWords(message);
		// 	break;
		// case (`${bot.prefix}redefineBannedWords`):
		// 	redefineBannedWords(message);
		// 	break;
		// case (`${bot.prefix}showTable`):
		// 	showTableInDB(message);
		// 	break;
		// case (`${bot.prefix}dropTable`):
		// 	dropTable(message);
		// 	break;
		default:
			// if not an admin command, go to users commands parsing function
			usersCommands(message);
			break;
	}
};
