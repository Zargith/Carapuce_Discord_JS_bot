const Discord = require("discord.js");
const emojiCharacters = require("../../utils/emojiCharacters.js");

module.exports = function(message) {
	const devUnicorn = new Discord.MessageAttachment("./src/commands/helps/coding_unicorn.png");

	message.channel.send({
		files: [devUnicorn],
		embed: {
			color: 3447003,
			title: "Panneau d'aide des musiques / Musics help pannel",
			description: "__**Les différentes commandes :**__",
			fields: [
				{
					name: `${bot.prefix}play *<URL Youtube/Spotify/Soundcloud ou mots clés>*`,
					value: "```Joue la musique ou ajoute à la liste d'attente. Prend en paramètre une URL (ou ID) Youtube ou des mots-clés et joue la première.```"
				},
				{
					name: `${bot.prefix}pause`,
					value: "```Permet de mettre en pause la musique actuellement jouée.```"
				},
				{
					name: `${bot.prefix}resume`,
					value: "```Permet de repprendre la musique précédement mise en pause.```"
				},
				{
					name: `${bot.prefix}stop`,
					value: "```Permet d'arrêter de jouer de la musique, même s'il reste des musiques dans la liste d'attente.```"
				},
				{
					name: `${bot.prefix}playlist`,
					value: "```Permet de voir la playlist de musiques en cours pour le serveur.```"
				},
				{
					name: `${bot.prefix}clearPlaylist`,
					value: "```Permet de vider la playlist actuelle du serveur.```"
				},
				{
					name: `${bot.prefix}progress`,
					value: "```Permet de voir la la progression de la musique en cours.```"
				},
				{
					name: `${bot.prefix}loop`,
					value: "```Permet d'activer et de désactiver le mode boucle pour le serveur.```"
				},
				{
					name: `${bot.prefix}shuffle`,
					value: "```Permet de mélanger les musiques présentes dans la playlist du serveur.```"
				},
				{
					name: `${bot.prefix}setVolume`,
					value: "```Permet de définir le volume pour les musiques.```"
				},
				{
					name: `${bot.prefix}filters **update**`,
					value: "```Permet de voir d'activer/désactiver un filtre pour le serveur.```"
				},
				{
					name: `${bot.prefix}filters`,
					value: "```Permet de voir la liste des filtres (non-)actifs sur le serveur.```"
				},
				{
					name: "Filtres :",
					value: "`bassboost`, `8D`, `vaporwave`, `nightcore`, `phaser`, `tremolo`, `vibrato`, `reverse`, `treble`, `normalizer`, `surrounding`, `pulsator`, `subboost`, `karaoke`, `flanger`, `gate`, `haas`, `mcompand`"
				}
			],
			footer: {text: `-----------------------------------------------------------------------------------------------\n${emojiCharacters.FR} Ce bot utilise un projet Github fait par Zargith (Zargith/Carapuce_Discord_JS_bot)\n${emojiCharacters.EN} This bot uses a Github project made by Zargith (Zargith/Carapuce_Discord_JS_bot)`, icon_url: "attachment://coding_unicorn.png", url: "https://github.com/Zargith/Carapuce_Discord_JS_bot"},
			timestamp: new Date()
		}
	});
};