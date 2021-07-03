module.exports = async function(idServer) {
	if (!idServer)
		return;

	if (!bot.db.get())
		throw Error("La base de données n'est pas connectée...");

	const resGettingDB = await bot.db.get().collection("Servers").findOne({serverId: idServer});
	if (!resGettingDB)
		return;

	return resGettingDB.reportLogChannel;
};