const getServerFromId = require("./getServerFromId.js");
const getRoleFromMention = require("./getRoleFromMention.js");


module.exports = function(serverId, roleMentions) {
	const server = getServerFromId(serverId);
	if (!server)
		return {success: false, message: "Server introuvable"};

	const roles = [];
	for (let i = 0; i < roleMentions.length; i++) {
		const role = getRoleFromMention(server, roleMentions[i]);
		if (!role)
			return {success: false, message: `Role ${roleMentions[i]} introuvable`};
		roles.push(role);
	}

	return {success: true, roles: roles};
};