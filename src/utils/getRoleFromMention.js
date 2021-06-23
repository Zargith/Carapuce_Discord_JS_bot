const parseMention = require("./parseMention.js");

module.exports = function(guild, mention) {
	const roleId = parseMention(mention);
	return guild.roles.cache.find(rl => rl.id == roleId);
};