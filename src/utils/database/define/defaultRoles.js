const addServer = require("../addServer.js");
const parseRoles = require("../../parseRoles.js");
const getRolesIds = require("../../getRolesIds.js");

module.exports = async function(serverId, roleMentions) {
	try {
		/*
			set the IDs of the roles you configured as the default roles given to new members from the server
			if there is no config, create one with defaultRolesIds as list of role IDs
			return a bool with value true when operations succeed and false when they not
			return {success: false, message: "Error message"};
		*/
		if (!bot.db.get())
			throw Error("La base de données n'est pas connectée...");

		const roles = parseRoles(serverId, roleMentions);
		if (!roles.success)
			return {success: true, message: roles.message};
		const roleIds = getRolesIds(roles.roles);

		const server = {serverId: serverId};
		const resGettingDB = await bot.db.get().collection("Servers").findOne(server);
		if (!resGettingDB)
			return (await addServer({serverId: serverId, defaultRolesIds: roleIds}));

		if (resGettingDB.defaultRolesIds)
			return {success: true, message: `Des rôles par défaut sont déjà définis, tu veux surement utiliser la commande *${bot.config.prefix}redefine* à la place ?`};

		const resUpdt = await bot.db.updateField(resGettingDB, "Servers", "defaultRolesIds", roleIds);
		if (!resUpdt.success)
			return ({success: false, message: resUpdt.message});

		return {success: true};
	} catch (exception) {
		return {success: false, message: exception.stack};
	}
};