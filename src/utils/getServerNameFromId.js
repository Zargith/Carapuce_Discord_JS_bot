module.exports = function(serverId) {
	const servers = bot.guilds.cache.toJSON();

	for (let i = 0; i < servers.length; i++)
		if (servers[i].id == serverId)
			return (servers[i].name);
};