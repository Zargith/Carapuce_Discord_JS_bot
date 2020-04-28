const config = require("../config.json");

module.exports.printHelp = function(message) {
	message.channel.send({
		embed: {
			color: 3447003,
			description: "__**Les différentes commandes :**__",
			fields: [
				{
					name: `__${config.prefix}help__`,
					value: "Pour afficher cette aide.",
					inline: true
				},
				{
					name: `__${config.prefix}bonjour__`,
					value: "Carapuce te dit bonjour.",
					inline: true
				},
				{
					name: `__${config.prefix}ping__`,
					value: "Pong !",
					inline: true
				},
				{
					name: `__${config.prefix}puce__`,
					value: "Carapuce !",
					inline: true
				},
				{
					name: `__${config.prefix}love__`,
					value: "Envoie de l\'amour.",
					inline: true
				},
				{
					name: `__${config.prefix}listemojis__`,
					value: "Envoie la liste des emojis du serveur.",
					inline: true
				},
				{
					name: `__${config.prefix}quiz__`,
					value: "Permet de jouer à un quiz !",
					inline: true
				},
				{
					name: `__${config.prefix}vatar__`,
					value: "Renvoie l\'URL vers votre Avatar.",
					inline: true
				},
				{
					name: `__${config.prefix}flip [pile ou face]__`,
					value: "Permet de jouer à pile ou face.",
					inline: true
				},
				{
					name: `__${config.prefix}play__`,
					value: "Joue la musique ou ajoute à la liste d'attente. Prend en paramètre une URL (ou ID) Youtube ou des mots clé et joue la première ."
				},
				{
					name: `__${config.prefix}skip__`,
					value: "Permet de passer une musique et passer à la suivante de la liste."
				},
				{
					name: `__${config.prefix}stop__`,
					value: "Permet d'arreter de jouer de la musique (même s'il reste des musiques dans la liste)."
				},
				{
					name: `__${config.prefix}pin__`,
					value: "Epingle le message qui commence par cette commande"
				},
				{
					name: `__${config.prefix}shifumi [pierre (ou p) ou feuille (ou f) ou ciseaux (ou c)]__`,
					value: "Permet de jouer à shifumi (ou pierre feuille ciseaux selon comment tu appelles ce jeu)."
				},
				{
					name: `__${config.prefix}poll [question; réponse 1; réponse 2; ...]__`,
					value: "Permet de créer un sondage de 2 à 11 propositions."
				},
				{
					name: `__${config.prefix}LasVegas__`,
					value: "Permet de vous marier à n'importe qui sur le serveur (ou la personne que vous souhaitez en la mentionnant) grâce aux divines lois de Las Vegas !."
				},
				{
					name: `__${config.prefix}DansLaWhiteList__`,
					value: "Permet de savoir si vous êtes dans la white list."
				},
				{
					name: `__${config.prefix}ownerHelp__`,
					value: "Permet d'afficher le help de la whitelist."
				},
				{
					name: `__${config.prefix}invite__`,
					value: "Permet d'obtenir un lien d'invitation du bot, si vous voulez l'inviter sur votre serveur."
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
					name: `__${config.prefix}ownerHelp__`,
					value: "Pour afficher cette aide pour les membres de la white list."
				},
				{
					name: `__${config.prefix}emote__`,
					value: "Pour afficher l\'émote Carapuce débile."
				},
				{
					name: `__${config.prefix}happy__`,
					value: "Pour afficher l\'émote Carapuce heureux."
				},
				{
					name: `__${config.prefix}sad__`,
					value: "Pour afficher l\'emote Carapuce triste."
				},
				{
					name: `__${config.prefix}angry__`,
					value: "Pour afficher l\'emote Carapuce en colère."
				},
				{
					name: `__${config.prefix}surprised__`,
					value: "Pour afficher l\'emote Carapuce choqué."
				},
				{
					name: `__${config.prefix}join__`,
					value: "Pour simuler notre arrivée sur le serveur."
				},
				{
					name: `__${config.prefix}restart__`,
					value: "Pour redémarrer le bot."
				},
				{
					name: `__${config.prefix}listGuilds__`,
					value: "Pour avoir la liste des serveurs sur lequel est le bot."
				},
				{
					name: `__${config.prefix}channelsOfGuild [id du serveur]__`,
					value: "Pour voir les channels d'un serveur."
				},
				{
					name: `__${config.prefix}messageToChannel [id du channel] [message]__`,
					value: "Pour envoyer un message dans un channel\n/!\\ Doit être un channel textuel."
				},
				{
					name: `__${config.prefix}sendMP [id d'une personne] [message]__`,
					value: "Pour envoyer un message privé à quelqu'un."
				},
			],
		}
	});
};