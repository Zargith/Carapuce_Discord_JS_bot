module.exports = async function(message) {
	if (!bot.player.getQueue(message))
		return message.channel.send("Aucune musique actuellement jouée.");

	bot.player.setRepeatMode(message, false);
	bot.player.stop(message);
	message.channel.send("Musique(s) **arrêtée(s)** sur ce serveur.");
};