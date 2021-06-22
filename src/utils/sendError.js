const getReportLogChannel = require("./database/getReportLogChannel.js");

module.exports = function sendError(message, exception) {
	consoleErrorMessage(message, exception);
	channelErrorMessage(message, exception);
	ownerErrorMessage(message, exception);
};

const consoleErrorMessage = function(message, exception) {
	// to send the error into the host console
	console.error(`ERROR at ${new Date()}\nUser ${(message.author ? `*${message.author.tag}*` : "null")}${!message.guild ? "" : `, on server ${message.guild.name}`} sent :\n${message.content}\n\nFollowing error happened:\n${exception.stack}`);
};

const channelErrorMessage = async function(message, exception) {
	try {
		// first send an error message into the channel were the operations were wrong
		message.channel.send(`__**ERREUR**__\n${exception.message}`);
		// then if the message was sent in MP, the function returns
		if (!message.guild)
			return;

		// else check if a report log channel is defined and send a error report to if it succeed to get it
		const reportLogChannel = message.guild.channels.cache.get(await getReportLogChannel(message.guild.id));
		if (reportLogChannel)
			reportLogChannel.send({embed: {color: 16711680, description: `__**ERREUR**__\nL\'utilisateur *${message.author.username}* sur ce serveur a envoyé la commande :\n${message.content}\n\n__L\'erreur suivante s\'est produite :__\n*${exception.stack}*`, timestamp: new Date()}});
	} catch (excep) {
		ownerErrorMessage(message, excep);
	}
};

const ownerErrorMessage = async function(message, exception) {
	// if a bot owner is defined, the bot will send him/her the complete error to let him/her know what happened
	if (bot.owner)
		bot.owner.send({embed: {color: 16711680, description: `__**ERREUR**__\nL\'utilisateur *${message.author.tag}*${!message.guild ? "" : `, sur le serveur ${message.member.guild.name}`} a envoyé la commande :\n${message.content}\n\n__L\'erreur suivante s\'est produite :__\n*${exception.stack}*`, timestamp: new Date()}});
};

module.exports.consoleErrorMessage = consoleErrorMessage;
module.exports.channelErrorMessage = channelErrorMessage;
module.exports.ownerErrorMessage = ownerErrorMessage;