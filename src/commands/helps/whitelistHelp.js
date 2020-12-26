const config = require("../../../config.json");
const emojiCharacters = require("../../utils/emojiCharacters.js");

module.exports = function(message) {
	message.channel.send({
		embed: {
			color: 3447003,
			description: "__**Les différentes commandes :**__",
			fields: [
				{
					name: `${config.prefix}whitelistHelp`,
					value: "```Pour afficher cette aide qui est pour les personnes faisant partie de la whitelist du bot.```"
				},
				{
					name: `${config.prefix}emote`,
					value: "```Pour afficher l\'émote Carapuce débile.```",
					inline: true
				},
				{
					name: `${config.prefix}happy`,
					value: "```Pour afficher l\'émote Carapuce heureux.```",
					inline: true
				},
				{
					name: `${config.prefix}sad`,
					value: "```Remplace le massage par l\'emote Carapuce triste.```",
					inline: true
				},
				{
					name: `${config.prefix}angry`,
					value: "```Remplace le massage par l\'emote Carapuce en colère.```",
					inline: true
				},
				{
					name: `${config.prefix}surprised`,
					value: "```Remplace le massage par l\'emote Carapuce choqué.```",
					inline: true
				},
				{
					name: `${config.prefix}restart`,
					value: "```Pour redémarrer le bot.```",
					inline: true
				},
				{
					name: `${config.prefix}listServers`,
					value: "```Pour avoir la liste des serveurs sur lequel est le bot.```"
				},
				{
					name: `${config.prefix}channelsOfServer *<id du serveur>*`,
					value: "```Pour voir les channels d'un serveur.```"
				},
				{
					name: `${config.prefix}messageToChannel *<id du channel>* *<message>*`,
					value: "```Pour envoyer un message dans un channel\n/!\\ **Doit être un channel textuel.**```"
				},
				{
					name: `${config.prefix}sendMP <*id d\'une personne>* *<message>*`,
					value: "```Pour envoyer un message privé à quelqu'un.```"
				}
			],
			footer: {text: `---------------------------------------------------------------------------------------------------\n${emojiCharacters.FR} Ce bot utilise un projet Github fait par Zargith (Zargith/Carapuce_Discord_JS_bot)\n${emojiCharacters.EN} This bot uses a Github project made by Zargith (Zargith/Carapuce_Discord_JS_bot)`},
			author: {name: "Auteur: Zargith", url: "https://github.com/Zargith/Carapuce_Discord_JS_bot"},
			timestamp: new Date()
		}
	});
};