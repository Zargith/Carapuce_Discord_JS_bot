module.exports = function(message, bot) {
	// split content of the message by space characters (after removing extra spaces) to get the ID and the content stored in a array
	const args = message.content.replace(/\s+/g, " ").trim().split(" ");

	// remove prefix+command from the array
	args.shift();
	const id = args[0];
	// remove ID from the array
	args.shift();

	if (args.length < 1) {
		message.channel.send("Je ne peux pas envoyer de message vide...");
		return;
	}
	// rebuild the sentence the user wants to send
	let str = "";
	args.forEach(arg => {
		str += `${arg} `;
	});
	const channel = bot.channels.cache.get(id);
	if (!channel) {
		message.channel.send("Je n'ai pas trouvé le salon dans lequel tu veux envoyer un message...");
		return;
	}
	channel.send(str);
};