const config = require("../../config.json");
const getReportLogChannel = require("./getReportLogChannel.js");

module.exports = function sendError(message, exception, bot) {
	consoleErrorMessage(message, exception);
	channelErrorMessage(message, exception, bot);
	ownerErrorMessage(message, exception, bot);
};

module.exports = function consoleErrorMessage(message, exception) {
	// to send the error into the host console
	console.log(`ERREUR at ${new Date()}\nL\'utilisateur ${(message.author ? message.author.tag : "null")}${!message.guild ? "" : `, sur le serveur ${message.guild.name}`} a envoyé la commande :\n${message.content}\n\nL\'erreur suivante s\'est produite :\n${exception.stack}`);
};

module.exports = function channelErrorMessage(message, exception, bot) {
	try {
		// first send an error message into the channel were the operations were wrong
		message.channel.send(`__**ERREUR**__\n${exception.message}`);
		// then if the message was sent in MP, the function returns
		if (!message.guild)
			return;
		// else check if a report log channel is defined and send a error report to if it succeed to get it
		const reportLogChannel = message.guild.channels.cache.get(getReportLogChannel(message.guild.id));
		if (reportLogChannel)
			reportLogChannel.send({embed: {color: 16711680, description: `__**ERREUR**__ at ${new Date()}\nL\'utilisateur ${message.author.username} sur ce serveur a envoyé la commande :\n${message.content}\n\n__L\'erreur suivante s\'est produite :__\n*${exception.stack}*`}});
	} catch (exception) {
		ownerErrorMessage(message, exception, bot);
	}
};

module.exports = async function ownerErrorMessage(message, exception, bot) {
	// if a bot owner ID is defined, the bot will send him the complete error to let him know what happened
	if (config.ownerID) {
		const owner = await bot.users.fetch(config.ownerID);
		if (owner)
			owner.send({embed: {color: 16711680, description: `__**ERREUR**__ at ${new Date()}\nL\'utilisateur ${message.author.tag}${!message.guild ? "" : `, sur le serveur ${message.member.guild.name}`} a envoyé la commande :\n${message.content}\n\n__L\'erreur suivante s\'est produite :__\n*${exception.stack}*`}});
	}
};