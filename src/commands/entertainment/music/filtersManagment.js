module.exports = async function(message, args) {
	if (!bot.player.getQueue(message))
		return message.channel.send("Aucune musique actuellement jouée.");
	if (!args[0])
		return message.channel.send("Merci de spécifier un filtre valide à (dés)activer.");

	const filterToUpdate = Object.values(bot.filters).find(f => f.toLowerCase() === args[0].toLowerCase());
	if (!filterToUpdate)
		return message.channel.send("Ce filtre n'existe pas.");

	const filterRealName = Object.keys(bot.filters).find(f => bot.filters[f] === filterToUpdate);
	const queueFilters = bot.player.getQueue(message).filters;
	const filtersUpdated = {};
	filtersUpdated[filterRealName] = queueFilters[filterRealName] ? false : true;
	bot.player.setFilters(message, filtersUpdated);

	if (filtersUpdated[filterRealName])
		message.channel.send("Je suis en train **d'ajouter** le filtre à la musique. Merci de patienter... Note : plus la musique est longue, plus de temps ça prendra.");
	else
		message.channel.send("Je suis en train **de retirer** le filtre à la musique. Merci de patienter... Note : plus la musique est longue, plus de temps ça prendra.");
};