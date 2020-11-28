module.exports = async function(bot, message) {
	if (!bot.player.getQueue(message))
		return message.channel.send("Aucune musique actuellement jouée.");

	bot.player.pause(message);
	message.channel.send(`Musique ${bot.player.getQueue(message).playing.title} **mise sur pause** !`);
};