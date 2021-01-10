const emojiCharacters = require("../../utils/emojiCharacters.js");

module.exports = function(message) {
	message.channel.send({
		embed: {
			color: 3447003,
			title: "Panneau d'aide principal / Main help pannel",
			description: "__**Les différentes commandes :**__",
			fields: [
				{
					name: `${bot.prefix}help`,
					value: "```Pour afficher cette aide.```",
					inline: true
				},
				{
					name: `${bot.prefix}help musique`,
					value: "```Pour afficher l'aide pour les musiques.```",
					inline: true
				},
				{
					name: `${bot.prefix}*<bonjour / salut / hello / hey / hi / hoï / hola / holà*>`,
					value: "```Carapuce vous dit bonjour.```",
				},
				{
					name: `${bot.prefix}ping`,
					value: "```Pour afficher le ping du bot.```",
					inline: true
				},
				{
					name: `${bot.prefix}quiz`,
					value: "```Permet de jouer à un quiz !```",
					inline: true
				},
				{
					name: `${bot.prefix}avatar`,
					value: "```Renvoie l\'URL vers votre Avatar.```",
					inline: true
				},
				{
					name: ` ${bot.prefix}flip *<pile / face>*`,
					value: "```Permet de jouer à pile ou face.```",
					inline: true
				},
				{
					name: `${bot.prefix}listEmojis`,
					value: "```Envoie la liste des emojis du serveur.```",
					inline: true
				},
				{
					name: `${bot.prefix}*<nom d'un emoji animé du serveur>*`,
					value: "```Supprime votre message et met un message avec l'emoji animé que vous avez indiqué.```"
				},
				{
					name: `${bot.prefix}shifumi *<pierre (ou p) / feuille (ou f) / ciseaux (ou c)>*`,
					value: "```Permet de jouer à shifumi / pierre feuille ciseaux.```"
				},
				{
					name: `${bot.prefix}poll *<question; réponse 1; réponse 2; ...>*`,
					value: "```Permet de créer un sondage de 2 à 11 propositions.```"
				},
				{
					name: `${bot.prefix}LasVegas *<optionnel: @quelqu\'un>*`,
					value: "```Permet de vous marier à n'importe qui sur le serveur (ou la personne que vous souhaitez en la mentionnant) grâce aux divines lois de Las Vegas !```"
				},
				{
					name: `${bot.prefix}devJoke`,
					value: "```Envoie une blague de dev (en anglais) style jokes de papa```"
				},
				{
					name: `${bot.prefix}invite`,
					value: "```Permet d'obtenir un lien d'invitation du bot, si vous voulez l'inviter sur votre serveur.```"
				},
				{
					name: `${bot.prefix}DansLaWhiteList`,
					value: "```Permet de savoir si vous êtes dans la white list.```"
				},
				{
					name: `${bot.prefix}adminHelp`,
					value: "```Permet d'afficher le help des admins.```"
				},
				{
					name: `${bot.prefix}whitelistHelp`,
					value: "```Pour afficher le help pour les personnes faisant partie de la whitelist du bot.```"
				}
			],
			footer: {text: `---------------------------------------------------------------------------------------------------\n${emojiCharacters.FR} Ce bot utilise un projet Github fait par Zargith (Zargith/Carapuce_Discord_JS_bot)\n${emojiCharacters.EN} This bot uses a Github project made by Zargith (Zargith/Carapuce_Discord_JS_bot)`},
			author: {name: "Auteur: Zargith", url: "https://github.com/Zargith/Carapuce_Discord_JS_bot"},
			timestamp: new Date()
		}
	});
};