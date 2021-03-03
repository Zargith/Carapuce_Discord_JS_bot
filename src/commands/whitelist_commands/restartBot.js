module.exports = async function restartBot(channel) {
	if (channel)
		channel.send("Redémarrage en cours...")
			.then(() => bot.destroy())
			.then(async function() {
				bot.login(bot.config.token)
					.then(() => bot.user.setActivity(`${bot.config.prefix}help`, {type: "WATCHING"}));
				if (bot.owner)
					bot.owner.send({embed: {color: 65330, description: "Bot redémarré manuellement"}});
				channel.send("Redémarrage terminé !");
			});
	else {
		bot.destroy();
		bot.login(bot.config.token)
			.then(() => bot.user.setActivity(`${bot.config.prefix}help`, {type: "WATCHING"}));
	}
};