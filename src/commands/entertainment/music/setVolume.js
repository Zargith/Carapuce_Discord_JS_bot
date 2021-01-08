module.exports = async function(message, args) {
	if (!bot.player.getQueue(message))
		return message.channel.send("Aucune musique actuellement jouée.");

	if (!args[0])
		return message.channel.send("Veuillez entrer un nombre valide compris entre 1 et 100.");

	if (isNaN(args[0]) || 100 < args[0] || args[0] <= 0)
		return message.channel.send("Veuillez entrer un nombre valide compris entre 1 et 100.");

	if (message.content.includes("-") || message.content.includes("+") || message.content.includes(",") || message.content.includes("."))
		return message.channel.send("Veuillez entrer un nombre valide compris entre 1 et 100.");

	bot.player.setVolume(message, parseInt(args[0]));
	message.channel.send(`Volume set à **${args.join(" ")}%**`);
};