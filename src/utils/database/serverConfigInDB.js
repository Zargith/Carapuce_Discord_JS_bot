const Discord = require("discord.js");
const sendError = require("../sendError.js");
const getServerNamefromId = require("../getServerNameFromId.js");

module.exports = async function(message) {
	try {
		const args = message.content.trim().split(" ");
		args.shift();

		if (!bot.db.get())
			throw Error("Il n'y a pas de bases de données");

		if (args.length < 1)
			args.push(Number.parseInt(message.guild.id));
		const resGettingDB = await bot.db.get().collection("Servers").findOne({serverId: args[0]});
		if (!resGettingDB)
			return message.channel.send("Il n'y a pas de configuration pour le serveur");

		delete resGettingDB._id;

		const poll = new Discord.MessageEmbed()
			.setColor(3447003)
			.setTitle(`Serveur *${getServerNamefromId(resGettingDB.serverId)}*`)
			.setDescription(`ID du serveur *${resGettingDB.serverId}*`);
		delete resGettingDB.serverId;
		for (const [key, value] of Object.entries(resGettingDB)) {
			poll.addField(`__**${key} :**__`, value);
		}
		// message.channel.send(JSON.stringify(resGettingDB));
		message.channel.send(poll);
	} catch (exception) {
		sendError(message, exception);
	}
};