module.exports = async function(message) {
	if (!bot.player.getQueue(message))
		return message.channel.send("Aucune musique actuellement jouée.");

	const track = await bot.player.nowPlaying(message);
	const filters = [];

	Object.keys(bot.player.getQueue(message).filters).forEach(filterName => {
		if (bot.player.getQueue(message).filters[filterName]) filters.push(filterName);
	});

	message.channel.send({
		embed: {
			color: 3447003,
			author: {name: track.title, url: track.url},
			fields: [
				{
					name: "Salon",
					value: track.author,
					inline: true
				},
				{
					name: "Demandée par",
					value: track.requestedBy.username,
					inline: true
				},
				{
					name: "De la playlist",
					value: track.fromPlaylist ? "Oui" : "Non",
					inline: true
				},
				{
					name: "Vues",
					value: track.views,
					inline: true
				},
				{
					name: "Durée",
					value: track.duration,
					inline: true
				},
				{
					name: "Filtres activés",
					value: filters.length,
					inline: true
				},
				{
					name: "Barre de progression",
					value: bot.player.createProgressBar(message, {timecodes: true}),
					inline: true
				}
			],
			thumbnail: {url: track.thumbnail},
			timestamp: new Date()
		},
	});
};