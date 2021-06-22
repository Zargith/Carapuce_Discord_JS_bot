// function that get all messages of a channel then delete them all
module.exports = async function(message) {
	// getting all messages frm the channel th message was sent
	message.channel.messages.fetch().then(messages => {
		// get all messages into an array instead of a map
		messages = messages.array();
		messages.forEach(msg => msg.delete());
	});

	// display this message when the bot is deleting the others then delete it
	message.channel.send("Suppression des messages en cours !").then(newMessage => {
		newMessage.delete();
	});
};