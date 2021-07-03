const getReportLogChannel = require("../../utils/database/getReportLogChannel.js");
const sendError = require("../../utils/sendError.js");

module.exports = async function(message) {
	try {
		// command to do a throw test and check if a report log channel is defined
		// it's possible to set a personalized message as argument
		throw Error(message.content.substring(bot.config.prefix.length + 5));
	} catch (exception) {
		try {
			const reportLogChannelId = await getReportLogChannel(message.guild.id);
			const reportLogChannel = message.guild.channels.cache.find(ch => ch.id == reportLogChannelId);

			// if it exist, get the report log channel and send it a message with the error log
			if (reportLogChannel)
				reportLogChannel.send({embed: {color: 16711680, description: `__**ERREUR**__\nL\'utilisateur ${message.author.tag}${(!message.guild ? "" : `, sur le serveur ${message.member.guild.name}`)} a envoyé la commande :\n${message.content}\n\n__L\'erreur suivante s\'est produite :__\n*${exception.stack}*`}});
			else
				message.channel.send("Le channel de rapport des logs n'est pas défini ou mal configuré. Merci de concter un admin (du serveur) si vous souhaitez que ce soit fait");
		} catch (exp) {
			sendError(message, exp);
		}
	}
};