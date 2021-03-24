const defineReportLogChannel = require("../../../utils/database/defineReportLogChannel.js");
// const defineDefaultRole = require("./admin_commands/defineDefaultRole.js");
// const defineBannedWords = require("./admin_commands/defineBannedWords.js");

module.exports = async function(message) {
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
			message.channel.send("Configuration enrgistrée !");
			break;
		// case ("defaultRole"):
		// 	defineDefaultRole(message);
		// 	break;
		// case ("bannedWords"):
		// 	defineBannedWords(message);
		// 	break;
		default:
			// if not an admin command, go to users commands parsing function
			usersCommands(message);
			break;
	}
};