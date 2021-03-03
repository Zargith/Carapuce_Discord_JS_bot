module.exports = async function(json) {
	if (!bot.db.get())
		throw Error("There is no database");

	const resGettingDB = await db.get().collection("Servers").findOne({"serverdId": json.serverdId});
	if (resGettingDB)
		throw Error("Email already used");

	const resInsertDB = await db.get().collection("Servers").insertOne(
		{
			"serverdId": json.serverdId,
			"reportLogChannel": json.reportLogChannel,
			"defaultRolesIds": json.defaultRolesIds,
			"listeners": json.listeners
		}
	);
	if (!resInsertDB.result || !resInsertDB.result.ok || resInsertDB.result.ok != 1)
		throw Error("Error, fail when inserting Server into collection");
	return (true);
};