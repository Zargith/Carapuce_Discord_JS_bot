const addServer = require("./addServer.js");

module.exports = async function(serverdId, channelID) {
	try {
		/*
			set the ID of the channel you configured as the report log channel from the server configuration in the database
			take as argument the id of the server you want to set the information and the id of the channel to define as report log channel
			if there is no config, create one with channelID as report log channel
			return a bool with value true when operations succeed and false when they not
			return {success: false, message: "Error message"};
		*/
		if (!bot.db.get())
			throw Error("La base de données n'est pas connectée...");

		const server = {serverdId: serverdId};
		const resGettingDB = await bot.db.get().collection("Servers").findOne(server);
		if (!resGettingDB)
			return (await addServer({serverId: serverdId, reportLogChannel: channelID}));

		if (resGettingDB.reportLogChannel)
			return {success: false, message: `Un channel de rapport des logs est déjà défini, tu veux surement utiliser la commande *${bot.config.prefix}redifine* à la place ?`};

		await bot.db.updateField(server, "Servers", "reportLogChannel", channelID);
		return {success: true};
	} catch (exception) {
		return {success: false, message: exception.stack};
	}
};