const config = require("../../config.json");
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

module.exports = function(message, bot) {
	if (!message.member.voice.channel)
		return message.channel.send("Vous devez être connecté à un salon vocal avant d'utiliser cette commande !");

	// split the message content to exactly get the command and its arguments
	const args = message.content.slice(config.prefix.length).trim().split(" ");
	const command = args.shift().toLowerCase();

	switch (command) {
		case ("playlist"):
			playlist(bot, message);
			return;
		case ("play"):
			play(bot, message, args);
			return;
		case ("pause"):
			pause(bot, message);
			return;
		case ("resume"):
			resume(bot, message);
			return;
		case ("skip"):
			skip(bot, message);
			return;
		case ("stop"):
			stop(bot, message);
			return;
		case ("loop"):
			loop(bot, message);
			return;
		case ("shuffle"):
			shuffle(bot, message);
			return;
		case ("setVolume"):
			setVolume(bot, message, args);
			return;
		case ("filters"):
			if (!args[0]) {
				filters(bot, message);
				return;
			} else if (args[0] !== "update")
				return message.channel.send("Merci de préciser si tu veux ajouter ou supprimer un filtre en précisant **update** au début de la commande.");
			filtersManagment(bot, message, args);
			return;
		case ("progress"):
			progress(bot, message);
			return;
		case ("clearPlaylist"):
			clearPlaylist(bot, message);
			return;
	}
};