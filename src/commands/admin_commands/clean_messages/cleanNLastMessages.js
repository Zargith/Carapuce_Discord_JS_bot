module.exports = function(message) {
	// check if the message contain only one argument and this is an number (to check if it is an ID)
	const args = message.content.split(" ");
	if (args.length != 2 || isNaN(parseInt(args[1])) || parseInt(args[1]) < 1) {
		message.channel.send("Pour clean après un message, il faut uniquement en paramètre le nombre (positif et suppérieur à 0) de  messages qu'on veut clean");
		return;
	}

	message.channel.messages.fetch().then(messages => {
		// get all messages into an array instead of a map and sort them by their date (from newest to oldest)
		messages = messages.array().sort((a, b) => b.createdAt - a.createdAt);

		// add one to delete the last command too
		const nLasts = (args[1] > messages.length ? parseInt(messages.length) : parseInt(args[1]) + 1);
		// then delete all messages until it reaches the message with the same ID
		for (let i = 0; i < nLasts; i++)
			messages[i].delete();
	});
};