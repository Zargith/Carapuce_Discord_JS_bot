module.exports = async function(serverId, channelId) {
	try {
		/*
			set the ID of the channel you configured as the report log channel from the server configuration in the database
			take as argument the id of the server you want to set the information and the id of the channel to define as report log channel
			if there is no config, create one with channelId as report log channel
			return a bool with value true when operations succeed and false when they not
			return {success: false, message: "Error message"};
		*/
		if (!bot.db.get())
			throw Error("La base de données n'est pas connectée...");

		const server = {serverId: serverId};
		console.debug(server)
		const resGettingDB = await bot.db.get().collection("Servers").findOne(server);
		console.debug(resGettingDB)
		if (!resGettingDB || !resGettingDB.reportLogChannel)
			return {success: true, message: `Tu ne peux pas redéfinir un paramètre s'il n'est pas déjà configuré. Utilises plutôt ${bot.config.prefix}define logChannel`};

		const resUpdt = await bot.db.updateField(server, "Servers", "reportLogChannel", channelId);
		if (!resUpdt.success)
			return ({success: false, message: resUpdt.message});

		return {success: true};
	} catch (exception) {
		return {success: false, message: exception.stack};
	}
};