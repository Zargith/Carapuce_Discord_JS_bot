const config = require("../config.json");

module.exports.printHelp = function(message) {
	message.channel.send({
		embed: {
			color: 3447003,
			description: "__**Les différentes commandes :**__",
			fields: [
				{
					name: `> ${config.prefix}invite`,
					value: "Permet d'obtenir un lien d'invitation du bot, si vous voulez l'inviter sur votre serveur."
				},
				{
					name: `> ${config.prefix}help`,
					value: "Pour afficher cette aide.",
					inline: true
				},
				{
					name: `> ${config.prefix}bonjour`,
					value: "Carapuce te dit bonjour.",
					inline: true
				},
				{
					name: `> ${config.prefix}ping`,
					value: "Pong !",
					inline: true
				},
				{
					name: `> ${config.prefix}puce`,
					value: "Carapuce !",
					inline: true
				},
				{
					name: `> ${config.prefix}love`,
					value: "Envoie de l\'amour.",
					inline: true
				},
				{
					name: `> ${config.prefix}listemojis`,
					value: "Envoie la liste des emojis du serveur.",
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
					name: `> ${config.prefix}play *<URL ou ID Youtube / mots clés>*`,
					value: "Joue la musique ou ajoute à la liste d'attente. Prend en paramètre une URL (ou ID) Youtube ou des mots-clés et joue la première."
				},
				{
					name: `> ${config.prefix}skip`,
					value: "Permet de passer une musique suivante de la liste."
				},
				{
					name: `> ${config.prefix}stop`,
					value: "Permet d'arrêter de jouer de la musique, même s'il reste des musiques dans la liste d'attente."
				},
				{
					name: `> ${config.prefix}playlist`,
					value: "Permet de voir la playlist en cours de musiques actuelles pour le serveur."
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
					name: `> ${config.prefix}pin *<message>*`,
					value: "Épingle le message qui commence par cette commande."
				},
				{
					name: `> ${config.prefix}LasVegas *<optionnel: @quelqu\'un>*`,
					value: "Permet de vous marier à n'importe qui sur le serveur (ou la personne que vous souhaitez en la mentionnant) grâce aux divines lois de Las Vegas !"
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
		}
	});
};

module.exports.printOwnerHelp = function(message) {
	message.channel.send({
		embed: {
			color: 3447003,
			description: "__**Les différentes commandes :**__",
			fields: [
				{
					name: `> ${config.prefix}ownerHelp`,
					value: "Pour afficher cette aide pour les membres de la white list."
				},
				{
					name: `> ${config.prefix}emote`,
					value: "Pour afficher l\'émote Carapuce débile."
				},
				{
					name: `> ${config.prefix}happy`,
					value: "Pour afficher l\'émote Carapuce heureux."
				},
				{
					name: `> ${config.prefix}sad`,
					value: "Pour afficher l\'emote Carapuce triste."
				},
				{
					name: `> ${config.prefix}angry`,
					value: "Pour afficher l\'emote Carapuce en colère."
				},
				{
					name: `> ${config.prefix}surprised`,
					value: "Pour afficher l\'emote Carapuce choqué."
				},
				{
					name: `> ${config.prefix}join`,
					value: "Pour simuler notre arrivée sur le serveur."
				},
				{
					name: `> ${config.prefix}restart`,
					value: "Pour redémarrer le bot."
				},
				{
					name: `> ${config.prefix}listGuilds`,
					value: "Pour avoir la liste des serveurs sur lequel est le bot."
				},
				{
					name: `> ${config.prefix}channelsOfGuild *<id du serveur>*`,
					value: "Pour voir les channels d'un serveur."
				},
				{
					name: `> ${config.prefix}messageToChannel *<id du channel>* *<message>*`,
					value: "Pour envoyer un message dans un channel\n/!\\ Doit être un channel textuel."
				},
				{
					name: `> ${config.prefix}sendMP <*id d\'une personne>* *<message>*`,
					value: "Pour envoyer un message privé à quelqu'un."
				},
				{
					name: `> ${config.prefix}clean`,
					value: "Pour envoyer supprimer tous les messages d'un channel."
				},
			],
		}
	});
};