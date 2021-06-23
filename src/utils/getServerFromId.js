module.exports = function(serverId) {
	return bot.guilds.cache.find(serv => serv.id == serverId);
};