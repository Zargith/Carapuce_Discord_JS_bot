const Discord = require("discord.js");
const emojiCharacters = require("../../utils/emojiCharacters.js");

module.exports = function(message) {
	const devUnicorn = new Discord.MessageAttachment("./src/commands/helps/coding_unicorn.png");

	message.channel.send({ files: [devUnicorn], embeds: [
		{
			color: 0xace4ff,
			description: "__**Les différentes commandes :**__",
			fields: [
				{
					name: `${bot.config.prefix}help admin`,
					value: "```Pour afficher cette aide qui est pour les admins du serveur.```"
				},
				{
					name: `${bot.config.prefix}help *<DB / db / database / data base>*`,
					value: "```Pour afficher l'aide des commandes relatives à la base de données.```"
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
					name: `${bot.config.prefix}pin *<message>*`,
					value: "```Épingle le message qui commence par cette commande.```"
				},
				{
					name: `${bot.config.prefix}unpin *<id du message>*`,
					value: "```Désépingle le message dont l'id est spécifiée.```"
				},
				{
					name: `${bot.config.prefix}join`,
					value: "```Pour simuler notre arrivée sur le serveur.```",
					inline: true
				},
				{
					name: `${bot.config.prefix}clean`,
					value: "```Pour supprimer tous les messages d'un channel.```"
				},
				{
					name: `${bot.config.prefix}cleanAfter *<id du message>*`,
					value: "```Pour supprimer tous les messages d'un channel **après** un message.```"
				},
				{
					name: `${bot.config.prefix}cleanNLasts *<nombre>*`,
					value: "```Pour supprimer les N (+1 qui est cette commande) derniers messages d'un channel.```"
				},
				{
					name: `${bot.config.prefix}count *<id du rôle / @leRole / leNomDuRôle >*`,
					value: "```Pour avoir la liste des serveurs sur lequel est le bot.```"
				},
				{
					name: `${bot.config.prefix}throw *<...>*`,
					value: "```Pour provoquer un throw avec un message custom.```",
					inline: true
				},
				{
					name: `${bot.config.prefix}define *<id du channel de log>*`,
					value: "```Pour définir la channel de rapport des logs pour ce serveur.```",
				},
				{
					name: `${bot.config.prefix}redefine *<id du channel de log>*`,
					value: "```Pour redéfinir la channel de rapport des logs pour ce serveur.```",
				}
			],
			footer: {text: `-----------------------------------------------------------------------------------------------\n${emojiCharacters.FR} Ce bot utilise un projet Github fait par Zargith (Zargith/Carapuce_Discord_JS_bot)\n${emojiCharacters.EN} This bot uses a Github project made by Zargith (Zargith/Carapuce_Discord_JS_bot)`, icon_url: "attachment://coding_unicorn.png"},
			timestamp: new Date()
		}]
	});
};