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
					name: `${bot.config.prefix}whitelistHelp`,
					value: "```Pour afficher cette aide qui est pour les personnes faisant partie de la whitelist du bot.```"
				},
				{
					name: `${bot.config.prefix}emote`,
					value: "```Pour afficher l\'émote Carapuce débile.```",
					inline: true
				},
				{
					name: `${bot.config.prefix}happy`,
					value: "```Pour afficher l\'émote Carapuce heureux.```",
					inline: true
				},
				{
					name: `${bot.config.prefix}sad`,
					value: "```Remplace le massage par l\'emote Carapuce triste.```",
					inline: true
				},
				{
					name: `${bot.config.prefix}angry`,
					value: "```Remplace le massage par l\'emote Carapuce en colère.```",
					inline: true
				},
				{
					name: `${bot.config.prefix}surprised`,
					value: "```Remplace le massage par l\'emote Carapuce choqué.```",
					inline: true
				},
				{
					name: `${bot.config.prefix}restart`,
					value: "```Pour redémarrer le bot.```",
					inline: true
				},
				{
					name: `${bot.config.prefix}listServers`,
					value: "```Pour avoir la liste des serveurs sur lequel est le bot.```"
				},
				{
					name: `${bot.config.prefix}channelsOfServer *<id du serveur>*`,
					value: "```Pour voir les channels d'un serveur.```"
				},
				{
					name: `${bot.config.prefix}messageToChannel *<id du channel>* *<message>*`,
					value: "```Pour envoyer un message dans un channel\n/!\\ **Doit être un channel textuel.**```"
				},
				{
					name: `${bot.config.prefix}sendMP *<id d\'une personne>* *<message>*`,
					value: "```Pour envoyer un message privé à quelqu'un.```"
				},
				{
					name: `${bot.config.prefix}serverConfig *<id d\'un server / all>*`,
					value: "```- Si aucun argument ou id: Pour afficher la configuration du serveur (sur lequel on est ou celui précisé).\n\n- Si argument all: Pour afficher toutes les configurations de serveur stockées dans la base de données.```"
				}
			],
			footer: {text: `-----------------------------------------------------------------------------------------------\n${emojiCharacters.FR} Ce bot utilise un projet Github fait par Zargith (Zargith/Carapuce_Discord_JS_bot)\n${emojiCharacters.EN} This bot uses a Github project made by Zargith (Zargith/Carapuce_Discord_JS_bot)`, icon_url: "attachment://coding_unicorn.png", url: "https://github.com/Zargith/Carapuce_Discord_JS_bot"},
			timestamp: new Date()
		}
	});
};