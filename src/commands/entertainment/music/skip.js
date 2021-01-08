module.exports = async function(message) {
	if (!bot.player.getQueue(message))
		return message.channel.send("Aucune musique actuellement jouée.");

	bot.player.skip(message);
	message.channel.send("La musique actuellement jouée vient d'être **passée** !");
};