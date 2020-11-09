module.exports = function(message, bot) {
	// split content of the message by space characters to get the ID and the content stored in a array
	const args = message.content.split(" ");

	// remove prefix+command from the array
	args.shift();
	const id = args[0];
	// remove ID from the array
	args.shift();

	// rebuild the sentence the user wants to send
	let str = "";
	args.forEach(arg => {
		str += arg + " ";
	});
	bot.users.cache.get(id).send(str);
	message.channel.send("Message envoyé !");
};