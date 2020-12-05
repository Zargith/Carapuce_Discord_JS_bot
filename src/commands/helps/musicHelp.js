const config = require("../../../config.json");

module.exports = function(message) {
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