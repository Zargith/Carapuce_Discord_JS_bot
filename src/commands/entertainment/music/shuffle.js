module.exports = async function(message) {
	if (!bot.player.getQueue(message))
		return message.channel.send("Aucune musique actuellement jouée.");

	bot.player.shuffle(message);
	return message.channel.send(`Playlist méliangée ! Il y a **${bot.player.getQueue(message).tracks.length}** musique(s) !`);
};