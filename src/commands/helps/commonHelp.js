const Discord = require("discord.js");
const emojiCharacters = require("../../utils/emojiCharacters.js");

module.exports = function(message) {
	const devUnicorn = new Discord.MessageAttachment("./src/commands/helps/coding_unicorn.png");

	message.channel.send({
		files: [devUnicorn],
		embed: {
			color: 0xace4ff,
			title: "Panneau d'aide principal / Main help pannel",
			description: "__**Les différentes commandes :**__",
			fields: [
				{
					name: `${bot.config.prefix}help`,
					value: "```Pour afficher cette aide.```",
					inline: true
				},
				{
					name: `${bot.config.prefix}help musique`,
					value: "```Pour afficher l'aide pour les musiques.```",
					inline: true
				},
				{
					name: `${bot.config.prefix}*<bonjour / salut / hello / hey / hi / hoï / hola / holà*>`,
					value: "```Carapuce vous dit bonjour.```",
				},
				{
					name: `${bot.config.prefix}ping`,
					value: "```Pour afficher le ping du bot.```",
					inline: true
				},
				{
					name: `${bot.config.prefix}quiz`,
					value: "```Permet de jouer à un quiz !```",
					inline: true
				},
				{
					name: `${bot.config.prefix}avatar`,
					value: "```Renvoie l\'URL vers votre Avatar.```",
					inline: true
				},
				{
					name: ` ${bot.config.prefix}flip *<pile / face>*`,
					value: "```Permet de jouer à pile ou face.```",
					inline: true
				},
				{
					name: `${bot.config.prefix}listEmojis`,
					value: "```Envoie la liste des emojis du serveur.```",
					inline: true
				},
				{
					name: `${bot.config.prefix}*<nom d'un emoji animé du serveur>*`,
					value: "```Supprime votre message et met un message avec l'emoji animé que vous avez indiqué.```"
				},
				{
					name: `${bot.config.prefix}shifumi *<pierre (ou p) / feuille (ou f) / ciseaux (ou c)>*`,
					value: "```Permet de jouer à shifumi / pierre feuille ciseaux.```"
				},
				{
					name: `${bot.config.prefix}poll *<question; réponse 1; réponse 2; ...>*`,
					value: "```Permet de créer un sondage de 2 à 11 propositions.```"
				},
				{
					name: `${bot.config.prefix}LasVegas *<optionnel: @quelqu\'un>*`,
					value: "```Permet de vous marier à n'importe qui sur le serveur (ou la personne que vous souhaitez en la mentionnant) grâce aux divines lois de Las Vegas !```"
				},
				{
					name: `${bot.config.prefix}devJoke`,
					value: "```Envoie une blague de dev (en anglais) style jokes de papa```"
				},
				{
					name: `${bot.config.prefix}météo *<Ville>* / ${bot.config.prefix}meteo *<Ville>* / ${bot.config.prefix}weather *<City>*`,
					value: "```Donne la météo pour la ville précisée. **Attention !** Les 'petit(e)s' villes/villages ne seront probablement pas trouvés.```"
				},
				{
					name: `${bot.config.prefix}invite`,
					value: "```Permet d'obtenir un lien d'invitation du bot, si vous voulez l'inviter sur votre serveur.```"
				},
				{
					name: `${bot.config.prefix}github`,
					value: "```Permet d'obtenir un lien ddu Github du bot, si vous voulez voir comment il est fait.```"
				},
				{
					name: `${bot.config.prefix}DansLaWhiteList`,
					value: "```Permet de savoir si vous êtes dans la white list.```"
				},
				{
					name: `${bot.config.prefix}help admin`,
					value: "```Permet d'afficher le help des admins.```"
				},
				{
					name: `${bot.config.prefix}help <*whitelist / wl*>`,
					value: "```Pour afficher le help pour les personnes faisant partie de la whitelist du bot.```"
				}
			],
			footer: {text: `-----------------------------------------------------------------------------------------------\n${emojiCharacters.FR} Ce bot utilise un projet Github fait par Zargith (Zargith/Carapuce_Discord_JS_bot)\n${emojiCharacters.EN} This bot uses a Github project made by Zargith (Zargith/Carapuce_Discord_JS_bot)`, icon_url: "attachment://coding_unicorn.png"},
			timestamp: new Date()
		}
	});
};