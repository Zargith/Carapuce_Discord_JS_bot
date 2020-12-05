module.exports = async function(bot, message) {
	const queue = bot.player.getQueue(message);

	if (!queue)
		return message.channel.send("Aucune musique actuellement jouée.");

	message.channel.send(`**Playlist du serveur ${message.guild.name}**\Actuellement : ${queue.playing.title} | ${queue.playing.author}\n\n` + (queue.tracks.map((track, i) => {
		return `**#${i + 1}** - ${track.title} | ${track.author} (Demandée par : ${track.requestedBy.username})`;
	}).slice(0, 5).join("\n") + `\n\n${queue.tracks.length > 5 ? `And **${queue.tracks.length - 5}** autres musiques...` : `Dans la playlist **${queue.tracks.length}** musique(s)...`}`));
};