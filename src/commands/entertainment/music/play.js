module.exports = async function(message, args) {
	if (!args[0])
		return message.channel.send("Indiquez le nom d'une musique ou fournissez un lien Youtube/Spotify/Soundcloud.");

	bot.player.play(message, args.join(" "));
};