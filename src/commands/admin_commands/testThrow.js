const config = require("../../../config.json");
const getRepportLogChannel = require("../../utils/getReportLogChannel.js");
const sendError = require("../../utils/sendError");


module.exports = async function(message, bot) {
	try {
		// command to do a throw test and check if a report log channel is defined
		// it's possible to set a personalized message as argument
		throw Error(message.content.substring(config.prefix.length + 5));
	} catch (exception) {
		try {
			const reportLogChannel = message.guild.channels.cache.get(getRepportLogChannel(message.guild.id));

			// if it exist get the report log channel and send it a message with the error log
			if (reportLogChannel) {
				reportLogChannel.send({embed: {color: 16711680, description: `__**ERREUR**__\nL\'utilisateur ${message.author.tag}${(!message.guild ? "" : `, sur le serveur ${message.member.guild.name}`)} a envoyé la commande :\n${message.content}\n\n__L\'erreur suivante s\'est produite :__\n*${exception.stack}*`}});
				message.channel.send("Report log channel properly set");
			} else
				message.channel.send("Report log channel not properly set. Please contact an admin if you want to correct this");
		} catch (exp) {
			sendError(message, exp, bot);
		}
	}
};