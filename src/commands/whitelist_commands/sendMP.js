module.exports = function(message) {
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
		str += arg + " ";
	});

	const user = bot.users.cache.get(id);
	if (!user) {
		message.channel.send("Je n'ai pas trouvé l'utilisateur auquel tu veux envoyer un message...");
		return;
	}
	user.send(str);
	message.channel.send("Message envoyé !");
};