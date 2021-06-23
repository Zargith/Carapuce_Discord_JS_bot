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
		if (!resGettingDB || resGettingDB.defaultRolesIds)
			return {success: true, message: `Tu ne peux pas redéfinir un paramère s'il n'est pas déjà configuré. Utilises plutôt ${bot.config.prefix}define defaultRoles`};

		const resUpdt = await bot.db.updateField(resGettingDB, "Servers", "defaultRolesIds", roleIds);
		if (!resUpdt.success)
			return ({success: false, message: resUpdt.message});

		return {success: true};
	} catch (exception) {
		return {success: false, message: exception.stack};
	}
};