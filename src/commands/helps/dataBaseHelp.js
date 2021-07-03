const Discord = require("discord.js");
const emojiCharacters = require("../../utils/emojiCharacters.js");

module.exports = function(message) {
	const devUnicorn = new Discord.MessageAttachment("./src/commands/helps/coding_unicorn.png");

	message.channel.send({
		files: [devUnicorn],
		embed: {
			color: 0xace4ff,
			title: "Panneau d'aide relatives à la base de données / Data base related help pannel",
			description: "__**Les différentes commandes :**__",
			fields: [
				// {
				// 	name: `// ${bot.config.prefix}createServerConfig *roleID: <id du role par défaut>; channelID: <id du channel de log>; commands: <nom de la commande 1>, <nom de la commande 2>, ...*`,
				// 	value: "```Permet de créer un configuration pour le serveur dans la base de données. Chaque paramètre est optionnel et toit être séparé par un point-virgule.```"
				// },
				{
					name: `${bot.config.prefix}define logChannel *<id du channel de log>*`,
					value: "```Permet de définir un channel de report des logs dans la configuration du serveur, dans la base de données.```"
				},
				{
					name: `${bot.config.prefix}redefine logChannel *<id du channel de log>*`,
					value: "```Permet de redéfinir un channel de report des logs dans la configuration du serveur, dans la base de données.```"
				},
				{
					name: `${bot.config.prefix}define defaultRoles *<id du rôle/mention du rôle>*`,
					value: "```Permet de définir des rôles par défaut dans la configuration du serveur, dans la base de données.```"
				},
				{
					name: `${bot.config.prefix}redefine defaultRoles *<id du rôle/mention du rôle>*`,
					value: "```Permet de définir des rôles par défaut dans la configuration du serveur, dans la base de données.```"
				},
				// {
				// 	name: `// ${bot.config.prefix}define commands *<nom de la commande 1>, <nom de la commande 2>, ...*`,
				// 	value: "```Permet de définir la liste de commandes non-utilisable dans la configuration du serveur, dans la base de données.```"
				// },
				// {
				// 	name: `// ${bot.config.prefix}redefine commands *<type : set/add/remove>* *<nom de la commande 1>, <nom de la commande 2>, ...*`,
				// 	value: "```Permet de redéfinir la liste de commandes non-utilisable dans la configuration du serveur, dans la base de données.\nset : pour redéfinir entièrement la liste\nadd : pour ajouter une liste de commandes\nremove : pour retirer une liste de commandes```"
				// },
				// {
				// 	name: `// ${bot.config.prefix}defineBannedWords *<mot 1>; <mot 2>, ...*`,
				// 	value: "```Permet de définir la liste de mots interdits, dans la base de données.```"
				// },
				// {
				// 	name: `// ${bot.config.prefix}redefineBannedWords *<type : set/add/remove>* *<mot 1>, <mot 2>, ...*`,
				// 	value: "```Permet de redéfinir la liste de de mots interdits, dans la base de données.\nset : pour redéfinir entièrement la liste\nadd : pour ajouter une liste mots à celle déjà existante\nremove : pour retirer une liste de mots à celle déjà existante```"
				// }
			],
			footer: {text: `-----------------------------------------------------------------------------------------------\n${emojiCharacters.FR} Ce bot utilise un projet Github fait par Zargith (Zargith/Carapuce_Discord_JS_bot)\n${emojiCharacters.EN} This bot uses a Github project made by Zargith (Zargith/Carapuce_Discord_JS_bot)`, icon_url: "attachment://coding_unicorn.png"},
			timestamp: new Date()
		}
	});
};