const countRoleByName = require("./countRoleByName.js");
const countRoleById = require("./countRoleById.js");
const countRoleByPing = require("./countRoleByPing.js");

module.exports = function(message) {
	const args = message.content.trim().split(" ");
	args.shift();

	if (Number.isInteger(parseInt(args[0])) == true)
		countRoleById(message);
	else if (args[0].startsWith("\\<@&"))
		countRoleByPing(message);
	else
		countRoleByName(message);
};