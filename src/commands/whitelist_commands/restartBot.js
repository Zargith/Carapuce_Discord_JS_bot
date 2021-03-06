const config = require("../../../config.json");

module.exports = async function restartBot(channel, bot) {
	if (channel)
		channel.send("Redémarrage en cours...")
			.then(() => bot.destroy())
			.then(async function() {
				bot.login(config.token)
					.then(() => bot.user.setActivity(`${config.prefix}help`, {type: "WATCHING"}));
				const owner = await bot.users.fetch(config.ownerID);
				if (owner)
					owner.send({embed: {color: 65330, description: "Bot redémarré manuellement"}});
				channel.send("Redémarrage terminé !");
			});
	else {
		bot.destroy();
		bot.login(config.token)
			.then(() => bot.user.setActivity(`${config.prefix}help`, {type: "WATCHING"}));
	}
};