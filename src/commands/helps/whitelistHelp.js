const Discord = require("discord.js");
const emojiCharacters = require("../../utils/emojiCharacters.js");

module.exports = function(message) {
	const devUnicorn = new Discord.MessageAttachment("./src/commands/helps/coding_unicorn.png");

	message.channel.send({
		files: [devUnicorn],
		embed: {
			color: 3447003,
			description: "__**Les différentes commandes :**__",
			fields: [
				{
					name: `${bot.prefix}whitelistHelp`,
					value: "```Pour afficher cette aide qui est pour les personnes faisant partie de la whitelist du bot.```"
				},
				{
					name: `${bot.prefix}emote`,
					value: "```Pour afficher l\'émote Carapuce débile.```",
					inline: true
				},
				{
					name: `${bot.prefix}happy`,
					value: "```Pour afficher l\'émote Carapuce heureux.```",
					inline: true
				},
				{
					name: `${bot.prefix}sad`,
					value: "```Remplace le massage par l\'emote Carapuce triste.```",
					inline: true
				},
				{
					name: `${bot.prefix}angry`,
					value: "```Remplace le massage par l\'emote Carapuce en colère.```",
					inline: true
				},
				{
					name: `${bot.prefix}surprised`,
					value: "```Remplace le massage par l\'emote Carapuce choqué.```",
					inline: true
				},
				{
					name: `${bot.prefix}restart`,
					value: "```Pour redémarrer le bot.```",
					inline: true
				},
				{
					name: `${bot.prefix}listServers`,
					value: "```Pour avoir la liste des serveurs sur lequel est le bot.```"
				},
				{
					name: `${bot.prefix}channelsOfServer *<id du serveur>*`,
					value: "```Pour voir les channels d'un serveur.```"
				},
				{
					name: `${bot.prefix}messageToChannel *<id du channel>* *<message>*`,
					value: "```Pour envoyer un message dans un channel\n/!\\ **Doit être un channel textuel.**```"
				},
				{
					name: `${bot.prefix}sendMP <*id d\'une personne>* *<message>*`,
					value: "```Pour envoyer un message privé à quelqu'un.```"
				}
			],
			footer: {text: `-----------------------------------------------------------------------------------------------\n${emojiCharacters.FR} Ce bot utilise un projet Github fait par Zargith (Zargith/Carapuce_Discord_JS_bot)\n${emojiCharacters.EN} This bot uses a Github project made by Zargith (Zargith/Carapuce_Discord_JS_bot)`, icon_url: "attachment://coding_unicorn.png", url: "https://github.com/Zargith/Carapuce_Discord_JS_bot"},
			timestamp: new Date()
		}
	});
};