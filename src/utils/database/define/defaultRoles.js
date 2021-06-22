const addServer = require("../addServer.js");

module.exports = async function(serverId, roleIds) {
	try {
		/*
			set the IDs of the roles you configured as the default roles given to new members from the server
			if there is no config, create one with defaultRolesIds as list of role IDs
			return a bool with value true when operations succeed and false when they not
			return {success: false, message: "Error message"};
		*/
		if (!bot.db.get())
			throw Error("La base de données n'est pas connectée...");

		const server = {serverId: serverId};
		const resGettingDB = await bot.db.get().collection("Servers").findOne(server);
		if (!resGettingDB)
			return (await addServer({serverId: serverId, defaultRolesIds: roleIds}));

		if (resGettingDB.defaultRolesIds)
			return {success: true, message: `Des rôles par défaut sont déjà définis, tu veux surement utiliser la commande *${bot.config.prefix}redefine* à la place ?`};

		await bot.db.updateField(server, "Servers", "defaultRolesIds", channelID);
		return {success: true};
	} catch (exception) {
		return {success: false, message: exception.stack};
	}
};