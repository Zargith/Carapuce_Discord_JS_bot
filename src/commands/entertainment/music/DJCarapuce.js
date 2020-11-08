const config = require("../../../../config.json");
const isInArray = require("../../../utils/isInArray.js");
const sendError = require("../../../utils/sendError.js");
const execute = require("./executeMusic.js");
const playlist = require("./playlistMusic.js");
const skip = require("./skipMusic.js");
const stop = require("./stopMusic.js");

const queue = new Map();

module.exports = async function(message, bot) {
	try {
		// split the message content to exactly get the command
		const args = message.content.split(" ");
		// check if the command is really a music command and not a misunderstanding
		if (!isInArray(args[0], [`${config.prefix}playlist`, `${config.prefix}play`, `${config.prefix}skip`, `${config.prefix}stop`])) {
			message.channel.send(`Commande \`${args[0]}\` non-reconnue...`);
			return;
		} else if (args[0] === `${config.prefix}playlist` && args.length != 1) {
			message.channel.send("Pas besoin d'arguments lorsque tu me demandes la playlist !");
			return;
		}
		// get the que queue for the server the command was used
		// redirect to the good function depending of the command send, else send a message that says that the command isn't reconized
		if (message.content === `${config.prefix}playlist`)
			playlist(message, queue.get(message.guild.id));
		else if (message.content.startsWith(`${config.prefix}play`))
			execute(message, queue, bot);
		else if (message.content.startsWith(`${config.prefix}skip`))
			skip(message, queue);
		else if (message.content.startsWith(`${config.prefix}stop`))
			stop(message, queue);
		else
			message.channel.send(`Commande \`${message.content}\` non-reconnue...`);
	} catch (exception) {
		sendError(message, exception, bot);
	}
};