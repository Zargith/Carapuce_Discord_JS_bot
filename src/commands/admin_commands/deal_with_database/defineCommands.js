const sendError = require("../../../utils/sendError.js");
const defineReportLogChannel = require("../../../utils/database/define/reportLogChannel.js");
const defineDefaultRoles = require("../../../utils/database/define/defaultRoles.js");
// const defineBannedWords = require("./admin_commands/defineBannedWords.js");

module.exports = async function(message) {
	try {
		const args = message.content.trim().split(" ");
		args.shift();
		const command = args.shift();
		let res;

		// check if the first word (after the word for the command) of the message content is equal to one of the following ones
		switch (command) {
			case ("logChannel"):
				res = await defineReportLogChannel(Number.parseInt(message.guild.id), Number.parseInt(args[0]));
				if (!res.success)
					throw Error(res.message);
				if (res.success && res.message)
					message.channel.send(res.message);
				else
					message.channel.send("Configuration enrgistrée !");
				break;

			case ("defaultRoles"):
				res = await defineDefaultRoles(Number.parseInt(message.guild.id), args);
				if (!res.success)
					throw Error(res.message);
				if (res.success && res.message)
					message.channel.send(res.message);
				else
					message.channel.send("Configuration enrgistrée !");
				break;

			// case ("bannedWords"):
			// 	defineBannedWords(message);
			// 	break;
			default:
				message.channel.send("Je ne connais pas cette commande");
				break;
		}
	} catch (exception) {
		sendError(message, exception);
	}
};