const Discord = require("discord.js");
const sendError = require("../sendError.js");
const getServerNamefromId = require("../getServerNameFromId.js");

module.exports = async function(message) {
	try {
		const args = message.content.trim().split(" ");
		args.shift();

		if (!bot.db.get())
			throw Error("Il n'y a pas de bases de données");

		if (args.length < 1) {
			if (message.guild)
				args.push(Number.parseInt(message.guild.id));
			else
				return (message.channel.send("Tu dois préciser l'ID d'un serveur où te trouver dans un si tu vux utiliser la commande telle quelle"));
		}

		if (args[0] === "all") {
			const resGettingDB = await bot.db.get().collection("Servers").find({});
			if (!resGettingDB)
				return message.channel.send("Il n'y a pas de serveurs configurés");
			resGettingDB.forEach(elem => sendEmbedMessage(message, elem));
			return;
		} else {
			const resGettingDB = await bot.db.get().collection("Servers").findOne({serverId: Number.parseInt(args[0])});
			if (!resGettingDB)
				return message.channel.send("Il n'y a pas de configuration pour le serveur");
			sendEmbedMessage(message, resGettingDB);
		}
	} catch (exception) {
		sendError(message, exception);
	}
};

function sendEmbedMessage(message, server) {
	const poll = new Discord.MessageEmbed()
		.setColor(0xace4ff)
		.setTitle(`Serveur *${getServerNamefromId(server.serverId)}*`)
		.setDescription(`ID du serveur *${server.serverId}*`);

	delete server._id;
	delete server.serverId;

	for (const [key, value] of Object.entries(server)) {
		if (value && value != "" && value !== 0)
			poll.addField(`__**${key} :**__`, value.toString());
	}

	message.channel.send(poll);
}