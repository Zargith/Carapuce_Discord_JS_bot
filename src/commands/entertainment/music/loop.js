module.exports = async function(bot, message) {
	if (!bot.player.getQueue(message))
		return message.channel.send("Aucune musique actuellement jouée.");

	const repeatMode = bot.player.getQueue(message).repeatMode;
	if (repeatMode) {
		bot.player.setRepeatMode(message, false);
		return message.channel.send({embed: {color: 65330, description: "Mode boucle **désactivé** !"}});
	} else {
		bot.player.setRepeatMode(message, true);
		return message.channel.send({embed: {color: 65330, description: "Mode boucle **activé** !"}});
	}
};