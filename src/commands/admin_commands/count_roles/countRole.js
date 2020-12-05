const countRoleByName = require("./countRoleByName.js");
const countRoleById = require("./countRoleById.js");
const countRoleByPing = require("./countRoleByPing.js");

module.exports = function(message, bot) {
	const args = message.content.split(" ");
	if (args.length !== 2) {
		message.channel.send("J'ai uniquement besoin d'une id, ping ou nom de rôle.");
		return;
	}
	if (Number.isInteger(parseInt(args[1])) == true)
		countRoleById(message, bot);
	else if (args[1][0] === "<" && args[1][1] === "@" && args[1][2] === "&")
		countRoleByPing(message, bot);
	else
		countRoleByName(message, bot);
};
