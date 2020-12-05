const config = require("../../../config.json");

module.exports = function(message) {
	message.channel.send({
		embed: {
			color: 3447003,
			description: "__**Les différentes commandes :**__",
			fields: [
				{
					name: `> ${config.prefix}help`,
					value: "Pour afficher cette aide.",
					inline: true
				},
				{
					name: `> ${config.prefix}help musique`,
					value: "Pour afficher l'aide pour les musiques."
				},
				{
					name: `__${config.prefix}bonjour/salut/hello/hey/hi/hoï/hola/holà__`,
					value: "Carapuce te dit bonjour.",
					inline: true
				},
				{
					name: `> ${config.prefix}ping`,
					value: "Pour afficher le ping du bot.",
					inline: true
				},
				{
					name: `> ${config.prefix}love`,
					value: "Envoie de l\'amour.",
					inline: true
				},
				{
					name: `> ${config.prefix}quiz`,
					value: "Permet de jouer à un quiz !",
					inline: true
				},
				{
					name: `> ${config.prefix}vatar`,
					value: "Renvoie l\'URL vers votre Avatar.",
					inline: true
				},
				{
					name: `> ${config.prefix}flip *<pile / face>*`,
					value: "Permet de jouer à pile ou face.",
					inline: true
				},
				{
					name: `> ${config.prefix}listemojis`,
					value: "Envoie la liste des emojis du serveur.",
					inline: true
				},
				{
					name: `> ${config.prefix}*nom d'un emoji animé du serveur*`,
					value: "Supprime votre message et met un message avec l'emoji animé que vous avez indiqué."
				},
				{
					name: `> ${config.prefix}shifumi *<pierre (ou p) / feuille (ou f) / ciseaux (ou c)>*`,
					value: "Permet de jouer à shifumi / pierre feuille ciseaux."
				},
				{
					name: `> ${config.prefix}poll *<question; réponse 1; réponse 2; ...>*`,
					value: "Permet de créer un sondage de 2 à 11 propositions."
				},
				{
					name: `> ${config.prefix}LasVegas *<optionnel: @quelqu\'un>*`,
					value: "Permet de vous marier à n'importe qui sur le serveur (ou la personne que vous souhaitez en la mentionnant) grâce aux divines lois de Las Vegas !"
				},
				{
					name: `> ${config.prefix}invite`,
					value: "Permet d'obtenir un lien d'invitation du bot, si vous voulez l'inviter sur votre serveur."
				},
				{
					name: `> ${config.prefix}DansLaWhiteList`,
					value: "Permet de savoir si vous êtes dans la white list."
				},
				{
					name: `> ${config.prefix}ownerHelp`,
					value: "Permet d'afficher le help de la whitelist."
				}
			],
			footer: {text: `---------------------------------------------------------------------------------------------------\n${emojiCharacters.FR} Ce bot utilise un projet Github fait par Zargith (Zargith/Carapuce_Discord_JS_bot)\n${emojiCharacters.EN} This bot uses a Github project made by Zargith (Zargith/Carapuce_Discord_JS_bot)`},
			author: {name: "Auteur: Zargith", url: "https://github.com/Zargith/Carapuce_Discord_JS_bot"},
			timestamp: new Date()
		}
	});
};