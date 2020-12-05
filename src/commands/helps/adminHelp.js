const config = require("../../../config.json");
const emojiCharacters = require("../../utils/emojiCharacters.js");

module.exports = function(message) {
	message.channel.send({
		embed: {
			color: 3447003,
			description: "__**Les différentes commandes :**__",
			fields: [
				{
					name: `${config.prefix}adminHelp`,
					value: "```Pour afficher cette aide qui est pour les admins du serveur.```"
				},
				{
					name: `${config.prefix}help *<DB / db / data base>*`,
					value: "```Pour afficher l'aide des commandes relatives à la base de données.```"
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
					name: `${config.prefix}pin *<message>*`,
					value: "```Épingle le message qui commence par cette commande.```"
				},
				{
					name: `${config.prefix}unpin *<id du message>*`,
					value: "```Désépingle le message dont l'id est spécifiée.```"
				},
				{
					name: `${config.prefix}join`,
					value: "```Pour simuler notre arrivée sur le serveur.```",
					inline: true
				},
				{
					name: `${config.prefix}restart`,
					value: "```Pour redémarrer le bot.```",
					inline: true
				},
				{
					name: `${config.prefix}clean`,
					value: "```Pour supprimer tous les messages d'un channel.```"
				},
				{
					name: `${config.prefix}cleanAfter *<id du message>*`,
					value: "```Pour supprimer tous les messages d'un channel **après** un message.```"
				},
				{
					name: `${config.prefix}cleanNLasts *<nombre>*`,
					value: "```Pour supprimer les N (+1 qui est cette commande) derniers messages d'un channel.```"
				},
				{
					name: `${config.prefix}listGuilds`,
					value: "```Pour avoir la liste des serveurs sur lequel est le bot.```"
				},
				{
					name: `${config.prefix}count *<id du rôle / @leRole / leNomDuRôle >*`,
					value: "```Pour avoir la liste des serveurs sur lequel est le bot.```"
				},
				{
					name: `${config.prefix}throw *<...>*`,
					value: "```Pour provoquer un throw avec un message custom.```",
					inline: true
				},
				{
					name: `${config.prefix}channelsOfGuild *<id du serveur>*`,
					value: "```Pour voir les channels d'un serveur.```"
				},
				{
					name: `${config.prefix}messageToChannel *<id du channel>* *<message>*`,
					value: "```Pour envoyer un message dans un channel\n/!\\ Doit être un channel textuel.```"
				},
				{
					name: `${config.prefix}sendMP <*id d\'une personne>* *<message>*`,
					value: "```Pour envoyer un message privé à quelqu'un.```"
				},
			],
			footer: {text: `---------------------------------------------------------------------------------------------------\n${emojiCharacters.FR} Ce bot utilise un projet Github fait par Zargith (Zargith/Carapuce_Discord_JS_bot)\n${emojiCharacters.EN} This bot uses a Github project made by Zargith (Zargith/Carapuce_Discord_JS_bot)`},
			author: {name: "Auteur: Zargith", url: "https://github.com/Zargith/Carapuce_Discord_JS_bot"},
			timestamp: new Date()
		}
	});
};