const Discord = require("discord.js");
const emojiCharacters = require("../../utils/emojiCharacters.js");

module.exports = function(message) {
	const devUnicorn = new Discord.MessageAttachment("./src/commands/helps/coding_unicorn.png");

	message.channel.send({
		files: [devUnicorn],
		embed: {
			color: 3447003,
			title: "Panneau d'aide relatives à la base de données / Data base related help pannel",
			description: "__**Les différentes commandes :**__",
			fields: [
				{
					name: `${bot.prefix}createServerConfig *roleID: <id du role par défaut>; channelID: <id du channel de log>; commands: <nom de la commande 1>, <nom de la commande 2>, ...*`,
					value: "```Permet de créer un configuration pour le serveur dans la base de données. Chaque paramètre est optionnel et toit être séparé par un point-virgule.```"
				},
				{
					name: `${bot.prefix}defineLogChannel *<id du channel de log>*`,
					value: "```Permet de définir un channel de report des logs dans la configuration du serveur, dans la base de données.```"
				},
				{
					name: `${bot.prefix}defineRole *<id du rôle>*`,
					value: "```Permet de définir un rôle par défaut dans la configuration du serveur, dans la base de données.```"
				},
				{
					name: `${bot.prefix}defineCommands *<nom de la commande 1>, <nom de la commande 2>, ...*`,
					value: "```Permet de définir la liste de commandes non-utilisable dans la configuration du serveur, dans la base de données.```"
				},
				{
					name: `${bot.prefix}redefineCommands *<type : set/add/remove>* *<nom de la commande 1>, <nom de la commande 2>, ...*`,
					value: "```Permet de redéfinir la liste de commandes non-utilisable dans la configuration du serveur, dans la base de données.\n__set :__ pour redéfinir entièrement la liste\n__add :__ pour ajouter une liste de commandes\n__remove :__ pour retirer une liste de commandes```"
				},
				{
					name: `${bot.prefix}defineBannedWords *<mot 1>; <mot 2>, ...*`,
					value: "```Permet de définir la liste de mots interdits, dans la base de données.```"
				},
				{
					name: `${bot.prefix}redefineBannedWords *<type : set/add/remove>* *<mot 1>, <mot 2>, ...*`,
					value: "```Permet de redéfinir la liste de de mots interdits, dans la base de données.\n__set :__ pour redéfinir entièrement la liste\n__add :__ pour ajouter une liste mots à celle déjà existante\n__remove :__ pour retirer une liste de mots à celle déjà existante```"
				},
				{
					name: `${bot.prefix}showTable *<nom de la table>*`,
					value: "```Pour afficher tous les élément de la table précisée en argument.```"
				},
				{
					name: `${bot.prefix}dropTable *<nom de la table>*`,
					value: "```Pour supprimer la table dont le nom est celui précisé en argument.```"
				}
			],
			footer: {text: `-----------------------------------------------------------------------------------------------\n${emojiCharacters.FR} Ce bot utilise un projet Github fait par Zargith (Zargith/Carapuce_Discord_JS_bot)\n${emojiCharacters.EN} This bot uses a Github project made by Zargith (Zargith/Carapuce_Discord_JS_bot)`, icon_url: "attachment://coding_unicorn.png", url: "https://github.com/Zargith/Carapuce_Discord_JS_bot"},
			timestamp: new Date()
		}
	});
};