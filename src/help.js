const config = require("../config.json");
const emojiCharacters = require("./emojiCharacters");

module.exports.printHelp = function(message) {
	message.channel.send({
		embed: {
			color: 3447003,
			title: "Panneau d'aide / Help pannel",
			description: "__**Les différentes commandes :**__",
			fields: [
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
					name: `${config.prefix}devJoke`,
					value: "```Envoie une blague de dev (en anglais) style jokes de papa```"
				},
				{
					name: `> ${config.prefix}help musique`,
					value: "Pour afficher l'aide pour les musiques."
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

module.exports.printHelpMusic = function(message) {
	message.channel.send({
		embed: {
			color: 3447003,
			title: "Panneau d'aide des musiques / Musics help pannel",
			description: "__**Les différentes commandes :**__",
			fields: [
				{
					name: `> ${config.prefix}play *<URL Youtube/Spotify/Soundcloud ou mots clés>*`,
					value: "Joue la musique ou ajoute à la liste d'attente. Prend en paramètre une URL (ou ID) Youtube ou des mots-clés et joue la première."
				},
				{
					name: `> ${config.prefix}pause`,
					value: "Permet de mettre en pause la musique actuellement jouée."
				},
				{
					name: `> ${config.prefix}resume`,
					value: "Permet de repprendre la musique précédement mise en pause."
				},
				{
					name: `> ${config.prefix}stop`,
					value: "Permet d'arrêter de jouer de la musique, même s'il reste des musiques dans la liste d'attente."
				},
				{
					name: `> ${config.prefix}playlist`,
					value: "Permet de voir la playlist de musiques en cours pour le serveur."
				},
				{
					name: `> ${config.prefix}clearPlaylist`,
					value: "Permet de vider la playlist actuelle du serveur."
				},
				{
					name: `> ${config.prefix}progress`,
					value: "Permet de voir la la progression de la musique en cours."
				},
				{
					name: `> ${config.prefix}loop`,
					value: "Permet d'activer et de désactiver le mode boucle pour le serveur."
				},
				{
					name: `> ${config.prefix}shuffle`,
					value: "Permet de de mélanger les musiques présentes dans la playlist du serveur."
				},
				{
					name: `> ${config.prefix}filters **update**`,
					value: "Permet de voir d'activer/désactiver un filtre pour le serveur."
				},
				{
					name: `> ${config.prefix}filters`,
					value: "Permet de voir la liste des filtres (non-)actifs sur le serveur."
				},
				{
					name: "Filtres :",
					value: "`bassboost`, `8D`, `vaporwave`, `nightcore`, `phaser`, `tremolo`, `vibrato`, `reverse`, `treble`, `normalizer`, `surrounding`, `pulsator`, `subboost`, `karaoke`, `flanger`, `gate`, `haas`, `mcompand`"
				}
			],
			footer: {text: `---------------------------------------------------------------------------------------------------\n${emojiCharacters.FR} Ce bot utilise un projet Github fait par Zargith (Zargith/Carapuce_Discord_JS_bot)\n${emojiCharacters.EN} This bot uses a Github project made by Zargith (Zargith/Carapuce_Discord_JS_bot)`},
			author: {name: "Auteur: Zargith", url: "https://github.com/Zargith/Carapuce_Discord_JS_bot"},
			timestamp: new Date()
		}
	});
};

module.exports.printOwnerHelp = function(message) {
	message.channel.send({
		embed: {
			color: 3447003,
			title: "Panneau d'aide pour les admins et l'autheur / Help pannel for admins and the owner",
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
			footer: {text: `---------------------------------------------------------------------------------------------------\n${emojiCharacters.FR} Ce bot utilise un projet Github fait par Zargith (Zargith/Carapuce_Discord_JS_bot)\n${emojiCharacters.EN} This bot uses a Github project made by Zargith (Zargith/Carapuce_Discord_JS_bot)`},
			author: {name: "Auteur: Zargith", url: "https://github.com/Zargith/Carapuce_Discord_JS_bot"},
			timestamp: new Date()
		}
	});
};