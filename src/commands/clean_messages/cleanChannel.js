module.exports = async function(message) {
	message.channel.messages.fetch().then(messages => {
		messages = messages.array();
		messages.forEach(msg => msg.delete());
	});
	message.channel.send("Suppression des messages en cours !").then(newMessage => {
		newMessage.delete();
	});
};