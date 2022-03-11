const Discord = require("discord.js");
const emojiCharacters = require("../../utils/emojiCharacters.js");

const Commands = [
	{
		handWritten: {
			name: "help",
			value: "```Pour afficher cette aide.```",
			inline: true
		},
		slashCommand: {
			name: "help",
			description: "Pour afficher la page d'aide.",
			options: [
				{
					name: "page_name",
					description: "name of the help page you want (music, admin, whitelist/wl).",
					required: false,
					type: Discord.Constants.ApplicationCommandOptionTypes.STRING,
					choices: [
						{
							name: "musique",
							value: "musique"
						},
						{
							name: "admin",
							value: "admin"
						},
						{
							name: "whitelist",
							value: "whitelist"
						},
						{
							name: "wl",
							value: "whitelist"
						}
					]
				}
			]
		}
	},
	{
		handWritten: {
			name: "help musique",
			value: "```Pour afficher l'aide pour les musiques.```",
			inline: true
		}
	},
	{
		handWritten: {
			name: "*<bonjour / salut / hello / hey / hi / hoï / hola / holà>*",
			value: "```Carapuce vous dit bonjour.```"
		}
	},
	{
		handWritten: {
			name: "ping",
			value: "```Pour afficher le ping du bot.```",
			inline: true
		},
		slashCommand: {
			name: "ping",
			description: "Pour afficher ke ping du bot.",
		}
	},
	{
		handWritten: {
			name: "quiz",
			value: "```Permet de jouer à un quiz !```",
			inline: true
		}
	},
	{
		handWritten: {
			name: "avatar",
			value: "```Renvoie l\'URL vers votre avatar.```",
			inline: true,
		},
		slashCommand: {
			name: "avatar",
			description: "Renvoie l\'URL vers votre avatar."
		}
	},
	{
		handWritten: {
			name: "flip *<pile / face>*",
			value: "```Permet de jouer à pile ou face.```",
			inline: true
		},
		slashCommand: {
			name: "flip",
			description: "Permet de jouer à pile ou face.",
			options: [
				{
					name: "pile_face",
					description: "Pile ou face.",
					required: true,
					type: Discord.Constants.ApplicationCommandOptionTypes.STRING,
					choices: [
						{
							name: "pile",
							value: "pile"
						},
						{
							name: "face",
							value: "face"
						}
					]
				}
			]
		}
	},
	{
		handWritten: {
			name: "listEmojis",
			value: "```Envoie la liste des emojis du serveur.```",
			inline: true
		},
		slashCommand: {
			name: "listemojis",
			description: "Envoie la liste des emojis du serveur."
		}
	},
	{
		handWritten: {
			name: "*<nom d'un emoji animé du serveur>*",
			value: "```Supprime votre message et met un message avec l'emoji animé que vous avez indiqué.```"
		}
	},
	{
		handWritten: {
			name: "shifumi *<pierre (ou p) / feuille (ou f) / ciseaux (ou c)>*",
			value: "```Permet de jouer à Shifumi / pierre feuille ciseaux.```"
		},
		slashCommand: {
			name: "shifumi",
			description: "Permet de jouer au jeu du Shifumi / pierre feuille ciseaux.",
			options: [
				{
					name: "pierre_feuille_ciseaux",
					description: "Pierre, feuille ou ciseaux.",
					required: true,
					type: Discord.Constants.ApplicationCommandOptionTypes.STRING,
					choices: [
						{
							name: "pierre",
							value: "pierre"
						},
						{
							name: "feuille",
							value: "feuille"
						},
						{
							name: "ciseaux",
							value: "ciseaux"
						}
					]
				}
			]
		}
	},
	{
		handWritten: {
			name: "poll *<question; réponse 1; réponse 2; ...>*",
			value: "```Permet de créer un sondage de 2 à 11 propositions.```"
		},
		slashCommand: {
			name: "poll",
			description: "Permet de créer un sondage de 2 à 11 propositions.",
			options: [
				{
					name: "question",
					description: "Question du sondage.",
					required: true,
					type: Discord.Constants.ApplicationCommandOptionTypes.STRING
				},
				{
					name: "answer1",
					description: "Réponse 1.",
					required: true,
					type: Discord.Constants.ApplicationCommandOptionTypes.STRING
				},
				{
					name: "answer2",
					description: "Réponse 2.",
					required: true,
					type: Discord.Constants.ApplicationCommandOptionTypes.STRING
				},
				{
					name: "answer3",
					description: "Réponse 3.",
					required: false,
					type: Discord.Constants.ApplicationCommandOptionTypes.STRING
				},
				{
					name: "answer4",
					description: "Réponse 4.",
					required: false,
					type: Discord.Constants.ApplicationCommandOptionTypes.STRING
				},
				{
					name: "answer5",
					description: "Réponse 5.",
					required: false,
					type: Discord.Constants.ApplicationCommandOptionTypes.STRING
				},
				{
					name: "answer6",
					description: "Réponse 6.",
					required: false,
					type: Discord.Constants.ApplicationCommandOptionTypes.STRING
				},
				{
					name: "answer7",
					description: "Réponse 7.",
					required: false,
					type: Discord.Constants.ApplicationCommandOptionTypes.STRING
				},
				{
					name: "answer8",
					description: "Réponse 8.",
					required: false,
					type: Discord.Constants.ApplicationCommandOptionTypes.STRING
				},
				{
					name: "answer9",
					description: "Réponse 9.",
					required: false,
					type: Discord.Constants.ApplicationCommandOptionTypes.STRING
				},
				{
					name: "answer10",
					description: "Réponse 10.",
					required: false,
					type: Discord.Constants.ApplicationCommandOptionTypes.STRING
				},
				{
					name: "answer11",
					description: "Réponse 11.",
					required: false,
					type: Discord.Constants.ApplicationCommandOptionTypes.STRING
				}
			]
		}
	},
	{
		handWritten: {
			name: "LasVegas *<optionnel: @quelqu\'un>*",
			value: "```Permet de vous marier à n'importe qui sur le serveur (ou la personne que vous souhaitez en la mentionnant) grâce aux divines lois de Las Vegas !```"
		},
		slashCommand: {
			name: "lasvegas",
			description: "Pour vous marier à n'importe qui ici (ou à une personne mentionnée) grâce aux lois de Las Vegas !",
			options: [
				{
					name: "someone",
					description: "Personne à marier.",
					required: false,
					type: Discord.Constants.ApplicationCommandOptionTypes.USER
				}
			]
		}
	},
	{
		handWritten: {
			name: "devJoke",
			value: "```Envoie une blague de dev (en anglais) style jokes de papa```"
		},
		slashCommand: {
			name: "devjoke",
			description: "Envoie une blague de dev (en anglais) style jokes de papa."
		}
	},
	{
		handWritten: {
			name: "météo *<Ville>* / meteo *<Ville>* / weather *<City>*",
			value: "```Donne la météo pour la ville précisée. **Attention !** Certains lieux peuvent ne pas être trouvés.```"
		},
		slashCommand: {
			name: "météo",
			description: "Donne la météo pour la ville précisée. Attention ! Certains lieux peuvent ne pas être trouvés.",
			options: [
				{
					name: "city",
					description: "Nom de la ville d'où vous voulez la météo.",
					required: true,
					type: Discord.Constants.ApplicationCommandOptionTypes.STRING
				}
			]
		}
	},
	{
		slashCommand: {
			name: "meteo",
			description: "Donne la météo pour la ville précisée. Attention ! Certains lieux peuvent ne pas être trouvés.",
			options: [
				{
					name: "city",
					description: "Nom de la ville d'où vous voulez la météo.",
					required: true,
					type: Discord.Constants.ApplicationCommandOptionTypes.STRING
				}
			]
		}
	},
	{
		slashCommand: {
			name: "weather",
			description: "Donne la météo pour la ville précisée. Attention ! Certains lieux peuvent ne pas être trouvés.",
			options: [
				{
					name: "city",
					description: "Nom de la ville d'où vous voulez la météo.",
					required: true,
					type: Discord.Constants.ApplicationCommandOptionTypes.STRING
				}
			]
		}
	},
	{
		handWritten: {
			name: "invite",
			value: "```Permet d'obtenir un lien d'invitation du bot, si vous voulez l'inviter sur votre serveur.```"
		},
		slashCommand: {
			name: "invite",
			description: "Permet d'obtenir un lien d'invitation du bot, si vous voulez l'inviter sur votre serveur."
		}
	},
	{
		handWritten: {
			name: "github",
			value: "```Permet d'obtenir un lien du Github du bot, si vous voulez voir comment il est fait.```"
		},
		slashCommand: {
			name: "github",
			description: "Permet d'obtenir un lien du Github du bot, si vous voulez voir comment il est fait."
		}
	},
	{
		handWritten: {
			name: "DansLaWhiteList",
			value: "```Permet de savoir si vous êtes dans la white list.```"
		},
		slashCommand: {
			name: "danslawhitelist",
			description: "Permet de savoir si vous êtes dans la white list."
		}
	},
	{
		handWritten: {
			name: "help admin",
			value: "```Permet d'afficher le help des admins.```"
		}
	},
	{
		handWritten: {
			name: "help <*whitelist / wl*>",
			value: "```Pour afficher le help pour les personnes faisant partie de la whitelist du bot.```"
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
			title: "Panneau d'aide principal / Main help pannel",
			description: "__**Les différentes commandes :**__",
			fields: fieldCommands,
			footer: {text: `-----------------------------------------------------------------------------------------------\n${emojiCharacters.FR} Ce bot utilise un projet Github fait par Zargith (Zargith/Carapuce_Discord_JS_bot)\n${emojiCharacters.EN} This bot uses a Github project made by Zargith (Zargith/Carapuce_Discord_JS_bot)`, icon_url: "attachment://coding_unicorn.png"},
			timestamp: new Date()
		}
	]});
};