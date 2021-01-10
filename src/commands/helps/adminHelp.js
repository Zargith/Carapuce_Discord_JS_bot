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
					name: `${bot.prefix}adminHelp`,
					value: "```Pour afficher cette aide qui est pour les admins du serveur.```"
				},
				{
					name: `${bot.prefix}help *<DB / db / data base>*`,
					value: "```Pour afficher l'aide des commandes relatives à la base de données.```"
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
					name: `${bot.prefix}pin *<message>*`,
					value: "```Épingle le message qui commence par cette commande.```"
				},
				{
					name: `${bot.prefix}unpin *<id du message>*`,
					value: "```Désépingle le message dont l'id est spécifiée.```"
				},
				{
					name: `${bot.prefix}join`,
					value: "```Pour simuler notre arrivée sur le serveur.```",
					inline: true
				},
				{
					name: `${bot.prefix}clean`,
					value: "```Pour supprimer tous les messages d'un channel.```"
				},
				{
					name: `${bot.prefix}cleanAfter *<id du message>*`,
					value: "```Pour supprimer tous les messages d'un channel **après** un message.```"
				},
				{
					name: `${bot.prefix}cleanNLasts *<nombre>*`,
					value: "```Pour supprimer les N (+1 qui est cette commande) derniers messages d'un channel.```"
				},
				{
					name: `${bot.prefix}count *<id du rôle / @leRole / leNomDuRôle >*`,
					value: "```Pour avoir la liste des serveurs sur lequel est le bot.```"
				},
				{
					name: `${bot.prefix}throw *<...>*`,
					value: "```Pour provoquer un throw avec un message custom.```",
					inline: true
				}
			],
			footer: {text: `-----------------------------------------------------------------------------------------------\n${emojiCharacters.FR} Ce bot utilise un projet Github fait par Zargith (Zargith/Carapuce_Discord_JS_bot)\n${emojiCharacters.EN} This bot uses a Github project made by Zargith (Zargith/Carapuce_Discord_JS_bot)`, icon_url: "attachment://coding_unicorn.png", url: "https://github.com/Zargith/Carapuce_Discord_JS_bot"},
			timestamp: new Date()
		}
	});
};