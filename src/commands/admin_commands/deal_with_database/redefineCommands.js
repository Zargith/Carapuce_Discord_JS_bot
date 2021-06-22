const sendError = require("../../../utils/sendError.js");
const redefineReportLogChannel = require("../../../utils/database/redefine/reportLogChannel.js");
// const redefineBannedWords = require("./admin_commands/redefineBannedWords.js");

module.exports = async function(message) {
	try {
		const args = message.content.trim().split(" ");
		args.shift();
		const command = args.shift();

		// check if the first word of the message content is equal to one of the following ones
		switch (command) {
			case ("logChannel"):
				res = await redefineReportLogChannel(Number.parseInt(message.guild.id), Number.parseInt(args[0]));
				if (!res.success)
					throw Error(res.message);
				if (res.success && res.message)
					message.channel.send(res.message);
				else
					message.channel.send("Configuration enrgistrée !");
				break;

			case ("defaultRoles"):
				res = defineDefaultRoles(Number.parseInt(message.guild.id), args);
				if (!res.success)
					throw Error(res.message);
				if (res.success && res.message)
					message.channel.send(res.message);
				else
					message.channel.send("Configuration enrgistrée !");
				break;

			// case (`${bot.config.prefix}redefineBannedWords`):
			// 	redefineBannedWords(message);
			// 	break;
			default:
				message.channel.send("Je ne connais pas cette commande");
				break;
		}
	} catch (exception) {
		sendError(message, exception);
	}
};