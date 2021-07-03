module.exports = async function(query) {
	try {
		if (!bot.db.get())
			throw Error("Il n'y a pas de bases de données");

		const resGettingDB = await bot.db.get().collection("Servers").findOne({serverId: query.serverId});
		if (resGettingDB)
			throw Error("Il y a déjà une configuration pour le serveur");

		if (!query.serverId)
			throw Error("Il manque au moins l'ID du serveur pour la configuration de ce dernier dans la base de données");
		const server = {serverId: query.serverId, reportLogChannel: "-1", defaultRolesIds: [], listeners: []};

		if (query.reportLogChannel)
			server.reportLogChannel = query.reportLogChannel;
		if (query.defaultRolesIds)
			server.defaultRolesIds = query.defaultRolesIds;
		if (query.listeners)
			server.listeners = query.listeners;

		const resInsertDB = await bot.db.get().collection("Servers").insertOne(server);
		if (!resInsertDB.result || !resInsertDB.result.ok || resInsertDB.result.ok != 1)
			throw Error("Echec en essayant d'ajouter le serveur à la base de données");

		return {success: true};
	} catch (exception) {
		return {success: false, message: exception.stack};
	}
};