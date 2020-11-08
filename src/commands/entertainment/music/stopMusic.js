module.exports = function(message, queue) {
	const serverQueue = queue.get(message.guild.id);
	// check if there's a queue for the server that the command comes from or that the variable connection as been defined, else return
	if (!serverQueue || !serverQueue.connection)
		return;
	// check if the user that want to stop a music is into a vocal channel
	// TODO check if he is in a vocal channel, that he is into the same as the bot
	if (!message.member.voice.channel)
		return message.channel.send("Tu dois d\'abord rejoindre un salon vocal !");
	// else make the bot leave the vocal channel and delete the queue object for this server
	serverQueue.voiceChannel.leave();
	queue.delete(message.guild.id);
};