// const redefineBannedWords = require("./admin_commands/redefineBannedWords.js");

module.exports = function(message) {
	const args = message.content.trim().split(" ");
	args.shift();
	const command = args.shift();

	// check if the first word of the message content is equal to one of the following ones
	switch (command) {
		// case (`${bot.config.prefix}redefineBannedWords`):
		// 	redefineBannedWords(message);
		// 	break;
		default:
			// if not an admin command, go to users commands parsing function
			usersCommands(message);
			break;
	}
};