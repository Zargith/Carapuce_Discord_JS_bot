module.exports = async function(json) {
	try {
		if (!bot.db.get())
			throw Error("Il n'y a pas de bases de données");

		const resGettingDB = await bot.db.get().collection("Servers").findOne({serverdId: json.serverdId});
		if (resGettingDB)
			throw Error("Il y a déjà une configuration pour le serveur");

		if (!json.serverId)
			throw Error("Il manque au moins l'ID du serveur pour la configuration de ce dernier dans la base de données");
		let server = {serverId: json.serverId};

		if (json.reportLogChannel)
			server.reportLogChannel = json.reportLogChannel;
		if (json.defaultRolesIds)
			server.defaultRolesIds = json.defaultRolesIds;
		if (json.listeners)
			server.listeners = json.listeners;

		const resInsertDB = await bot.db.get().collection("Servers").insertOne(server);
		if (!resInsertDB.result || !resInsertDB.result.ok || resInsertDB.result.ok != 1)
			throw Error("Echec en essayant d'ajouter le serveur à la base de données");

		return {success: true};
	} catch (exception) {
		return {success: false, message: exception.stack};
	}
};