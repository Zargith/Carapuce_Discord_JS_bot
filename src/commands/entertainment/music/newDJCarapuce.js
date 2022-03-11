const playlist = require("./playlist.js");
const play = require("./play.js");
const pause = require("./pause.js");
const resume = require("./resume.js");
const skip = require("./skip.js");
const stop = require("./stop.js");
const loop = require("./loop.js");
const shuffle = require("./shuffle.js");
const setVolume = require("./setVolume.js");
const filters = require("./filters.js");
const filtersManagment = require("./filtersManagment.js");
const progress = require("./progress.js");
const clearPlaylist = require("./clearPlaylist.js");

module.exports = function(message, isInteraction) {
	if (!message.member.voice.channel)
		return message.channel.send("Vous devez être connecté à un salon vocal avant d'utiliser cette commande !");

	// split the message content to exactly get the command and its arguments
	const args = isInteraction ? [] : message.content.slice(bot.config.prefix.length).trim().split(" ");
	const command = isInteraction ? message.commandName : args.shift();

	switch (command) {
		case ("playlist"):
			playlist(message);
			return;
		case ("play"):
			play(message, isInteraction, isInteraction ? message.options.get("url_or_key_words").value : args);
			return;
		case ("pause"):
			pause(message);
			return;
		case ("resume"):
			resume(message);
			return;
		case ("skip"):
			skip(message);
			return;
		case ("stop"):
			stop(message);
			return;
		case ("loop"):
			loop(message);
			return;
		case ("shuffle"):
			shuffle(message);
			return;
		case ("setVolume"):
			setVolume(message, args);
			return;
		case ("filters"):
			if (!args[0]) {
				filters(message);
				return;
			} else if ((isInteraction && message.options.get("update_filters").value) || (!isInteraction && args[0] !== "update"))
				return message.channel.send("Merci de préciser si tu veux ajouter ou supprimer un filtre en précisant **update** au début de la commande.");
			filtersManagment(message, args);
			return;
		case ("progress"):
			progress(message);
			return;
		case ("clearPlaylist"):
			clearPlaylist(message);
			return;
	}
};