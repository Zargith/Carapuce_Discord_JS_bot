module.exports = async function(message) {
	if (!bot.player.getQueue(message))
		return message.channel.send("Aucune musique actuellement jouée.");

	bot.player.clearQueue(message);
	message.channel.send("La playliste à été **vidée** !");
};