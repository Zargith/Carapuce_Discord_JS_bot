const redefineReportLogChannel = require("../../../utils/database/redefineReportLogChannel.js");
// const redefineBannedWords = require("./admin_commands/redefineBannedWords.js");

module.exports = async function(message) {
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

		// case (`${bot.config.prefix}redefineBannedWords`):
		// 	redefineBannedWords(message);
		// 	break;
		default:
			// if not an admin command, go to users commands parsing function
			usersCommands(message);
			break;
	}
};