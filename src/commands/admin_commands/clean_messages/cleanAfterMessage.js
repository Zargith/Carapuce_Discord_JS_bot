module.exports = function(message) {
	// check if the message contain only one argument and this is an number (to check if it is an ID)
	const args = message.content.split(" ");
	if (args.length != 2 || isNaN(parseInt(args[1])))
		throw Error("Pour clean après un message, il faut uniquement en paramètre l'ID du message après lequel on veut clean");

	message.channel.messages.fetch({ force: true, limit: 1000 }).then(messages => {
		// get all messages into an array instead of a map and sort them by their date (from newest to oldest)
		messages = messages.toJSON().sort((a, b) => b.createdAt - a.createdAt);

		// check if the ID given as parameter is in the one of the channel
		let isInArray = false;
		for (let i = 0; i < messages.length; i++)
			if (messages[i].id === args[1])
				isInArray = true;
		if (!isInArray) {
			message.channel.send(`L'ID du message n'est pas celui d'un se trouvant dans le channel ${(message.channel.name ? `*${message.channel.name}*` : "")}${message.channel.guild ? ` du serveur *${message.channel.guild.name}*`: ""}`);
			return;
		}
		// then delete all messages until it reaches the message with the same ID
		for (let i = 0; i < messages.length && messages[i].id !== args[1]; i++)
			messages[i].delete();
	});

	// display this message when the bot is deleting the others then delete it
	message.channel.send("Suppression des messages en cours !").then(newMessage => {
		newMessage.delete();
	});
};