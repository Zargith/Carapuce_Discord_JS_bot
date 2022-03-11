module.exports = async function(message, isInteraction, args) {
	if (!args[0])
		return message.channel.send("Indiquez le nom d'une musique ou fournissez un lien Youtube/Spotify/Soundcloud.");

	message.author = message.user;
	bot.player.play(message, isInteraction ? args : args.join(" "));
};