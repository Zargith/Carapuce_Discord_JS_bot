const addServer = require("../addServer.js");

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
		const resGettingDB = await bot.db.get().collection("Servers").findOne(server);
		if (!resGettingDB)
			return (await addServer({serverId: serverId, reportLogChannel: channelId}));

		if (resGettingDB.reportLogChannel)
			return {success: false, message: `Un channel de rapport des logs est déjà défini, tu veux surement utiliser la commande *${bot.config.prefix}redefine* à la place ?`};

		const resUpdt = await bot.db.updateField(resGettingDB, "Servers", "reportLogChannel", channelId);
		if (!resUpdt.success)
			return ({success: false, message: resUpdt.message});

		return {success: true};
	} catch (exception) {
		return {success: false, message: exception.stack};
	}
};