const config = require("../../config.json");
const emojiCharacters = require("../emojiCharacters.js");

module.exports = async function(bot, message) {
	if (!bot.player.getQueue(message))
		return message.channel.send("Aucune musique actuellement jouée.");

	const disabledEmoji = emojiCharacters.error;
	const enabledEmoji = emojiCharacters.success;
	const filtersStatuses = [[], []];

	Object.keys(bot.filters).forEach(filterName => {
		const array = filtersStatuses[0].length > filtersStatuses[1].length ? filtersStatuses[1] : filtersStatuses[0];
		array.push(bot.filters[filterName] + " : " + (bot.player.getQueue(message).filters[filterName] ? enabledEmoji : disabledEmoji));
	});

	message.channel.send({
		embed: {
			color: 3447003,
			description: `Liste des filtres (dés)activés.\nUtilisez \`${config.prefix}filters update\` pour ajouter/retirer un filtre à une musique.`,
			fields: [
				{name: "Filtres", value: filtersStatuses[0].join("\n"), inline: true},
				{name: "** **", value: filtersStatuses[1].join("\n"), inline: true},
			],
			timestamp: new Date()
		},
	});
};