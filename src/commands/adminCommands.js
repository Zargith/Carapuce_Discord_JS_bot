const emojis = require("../utils/emojiCharacters.js");
const help = require("./helps/help.js");
const cleanChannel = require("./admin_commands/clean_messages/cleanChannel.js");
const usersCommands = require("./usersCommands.js");
const cleanAfterMessage = require("./admin_commands/clean_messages/cleanAfterMessage.js");
const cleanNLastMessages = require("./admin_commands/clean_messages/cleanNLastMessages.js");
const testThrow = require("./admin_commands/testThrow.js");
const countRole = require("./admin_commands/count_roles/countRole.js");
const defineCommands = require("./admin_commands/deal_with_database/defineCommands.js");
const redefineCommands = require("./admin_commands/deal_with_database/redefineCommands.js");
// const createServerConfig = require("./admin_commands/createServerConfig.js");
// const showTableInDB = require("./admin_commands/showTableInDB.js");
// const dropTable = require("./admin_commands/dropTable.js");


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

		case (`${bot.config.prefix}adminHelp`):
			if (args.length > 0) {
				message.channel.send("Cette commande ne prend pas de paramètre.");
				break;
			}
			// print the help for admins
			help.printAdminHelp(message);
			break;

		case (`${bot.config.prefix}help`):
			if ((args.length === 1 && args[0].toLowerCase() === "db") || (args.length === 2 && args[0].toLowerCase() === "data" && args[1].toLowerCase() === "base")) {
				help.printDataBaseHelp(message);
				break;
			} else {
				// maybe another help so redirect to users commands function
				usersCommands(message);
			}
			break;

		case (`${bot.config.prefix}count`):
			if (args.length !== 1) {
				message.channel.send("Cette commande a besoin d'un paramètre (ex: `ID du rôle`, `@leRole` ou `leNomDuRôle`).");
				break;
			}
			// counting role on the server
			countRole(message);
			break;

		case (`${bot.config.prefix}clean`):
			if (args.length !== 0) {
				message.channel.send("Cette commande ne prend pas de paramètre.");
				break;
			}
			// clean al messages into the channel
			cleanChannel(message);
			break;

		case (`${bot.config.prefix}cleanAfter`):
			// clean all messages in a channel after a message given as parameter (an ID is necessary)
			cleanAfterMessage(message);
			break;

		case (`${bot.config.prefix}cleanNLasts`):
			// clean the N last messages of the channel (+1 that is th command)
			cleanNLastMessages(message);
			break;

		case (`${bot.config.prefix}throw`):
			// send a test throw to check if the repport log channel is well defined
			testThrow(message);
			break;

		case (`${bot.config.prefix}pin`):
			// to pin a the message
			message.pin();
			break;

		case (`${bot.config.prefix}unpin`):
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

		case (`${bot.config.prefix}join`):
			if (message.guild === null) {
				message.reply("Tu ne peux pas utiliser cette commande en privé.");
				return;
			}
			bot.emit("guildMemberAdd", message.member);
			break;

		// case (`${bot.config.prefix}createServerConfig`):
		// 	createServerConfig(message);
		// 	break;
		case (`${bot.config.prefix}define`):
			defineCommands(message);
			break;
		case (`${bot.config.prefix}redefine`):
			redefineCommands(message);
			break;
		default:
			// if not an admin command, go to users commands parsing function
			usersCommands(message);
			break;
	}
};
