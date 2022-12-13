const Discord = require("discord.js");
const emojiCharacters = require("../../utils/emojiCharacters.js");

const Commands = [
	{
		handWritten: {
			name: "play *<URL Youtube/Spotify/Soundcloud ou mots clés>*",
			value: "```Joue la musique ou ajoute à la liste d'attente. Prend en paramètre une URL Youtube ou des mots-clés et joue la première.```"
		},
		slashCommand: {
			name: "play",
			description: "Prend en paramètre une URL (ou ID) Youtube ou des mots-clés et joue la première.",
			options: [
				{
					name: "url_or_key_words",
					description: "URL Youtube/Spotify/Soundcloud ou mots clés",
					type: Discord.ApplicationCommandOptionType.String,
					required: true
				}
			]
		}
	},
	{
		handWritten: {
			name: "pause",
			value: "```Permet de mettre en pause la musique actuellement jouée.```"
		},
		slashCommand: {
			name: "pause",
			description: "Permet de mettre en pause la musique actuellement jouée."
		}
	},
	{
		handWritten: {
			name: "resume",
			value: "```Permet de repprendre la musique précédement mise en pause.```"
		},
		slashCommand: {
			name: "resume",
			description: "Permet de repprendre la musique précédement mise en pause."
		}
	},
	{
		handWritten: {
			name: "stop",
			value: "```Permet d'arrêter de jouer de la musique, même s'il reste des musiques dans la liste d'attente.```"
		},
		slashCommand: {
			name: "stop",
			description: "Permet d'arrêter de jouer de la musique, même s'il reste des musiques dans la liste d'attente."
		}
	},
	{
		handWritten: {
			name: "playlist",
			value: "```Permet de voir la playlist de musiques en cours pour le serveur.```"
		},
		slashCommand: {
			name: "playlist",
			description: "Permet de voir la playlist de musiques en cours pour le serveur."
		}
	},
	{
		handWritten: {
			name: "clearPlaylist",
			value: "```Permet de vider la playlist actuelle du serveur.```"
		},
		slashCommand: {
			name: "clearplaylist",
			description: "Permet de vider la playlist actuelle du serveur."
		}
	},
	{
		handWritten: {
			name: "progress",
			value: "```Permet de voir la la progression de la musique en cours.```"
		},
		slashCommand: {
			name: "progress",
			description: "Permet de voir la la progression de la musique en cours."
		}
	},
	{
		handWritten: {
			name: "loop",
			value: "```Permet d'activer et de désactiver le mode boucle pour le serveur.```"
		},
		slashCommand: {
			name: "loop",
			description: "Permet d'activer et de désactiver le mode boucle pour le serveur."
		}
	},
	{
		handWritten: {
			name: "shuffle",
			value: "```Permet de mélanger les musiques présentes dans la playlist du serveur.```"
		},
		slashCommand: {
			name: "shuffle",
			description: "Permet de mélanger les musiques présentes dans la playlist du serveur."
		}
	},
	{
		handWritten: {
			name: "setVolume",
			value: "```Permet de définir le volume pour les musiques.```"
		},
		slashCommand: {
			name: "setvolume",
			description: "Permet de définir le volume pour les musiques.",
			options: [
				{
					name: "volume",
					description: "Volume entre 0 et 100",
					type: Discord.ApplicationCommandOptionType.Integer,
					required: true
				}
			]
		}
	},
	{
		handWritten: {
			name: "filters **update**",
			value: "```Permet de voir la liste des filtre ou d'activer/désactiver un filtre sur le serveur.```"
		},
		slashCommand: {
			name: "filters",
			description: "Permet de voir la liste des filtre ou d'activer/désactiver un filtre sur le serveur.",
			options: [
				{
					name: "update_filters",
					description: "Pour actualiser la liste des filtres",
					type: Discord.ApplicationCommandOptionType.String,
					required: false,
					choices: [
						{
							name: "bassboost",
							value: "bassboost"
						},
						{
							name: "8d",
							value: "8D"
						},
						{
							name: "vaporwave",
							value: "vaporwave"
						},
						{
							name: "nightcore",
							value: "nightcore"
						},
						{
							name: "phaser",
							value: "phaser"
						},
						{
							name: "tremolo",
							value: "tremolo"
						},
						{
							name: "vibrato",
							value: "vibrato"
						},
						{
							name: "normalizer",
							value: "normalizer"
						},
						{
							name: "surrounding",
							value: "surrounding"
						},
						{
							name: "pulsator",
							value: "pulsator"
						},
						{
							name: "subboost",
							value: "subboost"
						},
						{
							name: "karaoke",
							value: "karaoke"
						},
						{
							name: "flanger",
							value: "flanger"
						},
						{
							name: "gate",
							value: "gate"
						},
						{
							name: "haas",
							value: "haas"
						},
						{
							name: "mcompand",
							value: "mcompand"
						}
					]
				}
			]
		}
	},
	{
		handWritten: {
			name: "Filtres :",
			value: "`bassboost`, `8D`, `vaporwave`, `nightcore`, `phaser`, `tremolo`, `vibrato`, `reverse`, `treble`, `normalizer`, `surrounding`, `pulsator`, `subboost`, `karaoke`, `flanger`, `gate`, `haas`, `mcompand`"
		}
	}
];

module.exports.getSlashCommands = function getSlashCommands() {
	const res = [];

	for (const command of Commands)
		if (command.slashCommand)
			res.push(command.slashCommand);

	return res;
};

function getHandWrittenCommands() {
	const res = [];

	for (const command of Commands)
		if (command.handWritten)
			res.push(command.handWritten);

	return res;
}

module.exports.help = function(message) {
	const devUnicorn = new Discord.MessageAttachment("./src/commands/helps/coding_unicorn.png");
	const fieldCommands = getHandWrittenCommands();
	fieldCommands.forEach(command => {
		if (!command.name.startsWith(bot.config.prefix))
			command.name = `${bot.config.prefix}${command.name}`;
	});

	message.channel.send({ files: [devUnicorn], embeds: [
		{
			color: 0xace4ff,
			title: "Panneau d'aide des musiques / Musics help pannel",
			description: "__**Les différentes commandes :**__",
			fields: fieldCommands,
			footer: {text: `-----------------------------------------------------------------------------------------------\n${emojiCharacters.FR} Ce bot utilise un projet Github fait par Zargith (Zargith/Carapuce_Discord_JS_bot)\n${emojiCharacters.EN} This bot uses a Github project made by Zargith (Zargith/Carapuce_Discord_JS_bot)`, icon_url: "attachment://coding_unicorn.png"},
			timestamp: new Date()
		}
	]});
};