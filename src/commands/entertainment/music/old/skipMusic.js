const play = require("./playMusic.js");

module.exports = function(message, queue) {
	const serverQueue = queue.get(message.guild.id);
	// check if there's a queue for the server that the command comes from or that the variable connection as been defined, else return
	if (!serverQueue || !serverQueue.connection)
		return;
	// check if the user that want to skip a music is into a vocal channel
	// TODO check if he is in a vocal channel, that he is into the same as the bot
	if (!message.member.voice.channel)
		return message.channel.send("Tu dois d\'abord rejoindre un salon vocal !");
	// if there's no queue, there is no music to skip
	if (!serverQueue)
		return message.channel.send("Il n\'y a pas de son que je peux passer.");
	// else remove the first music of of the list (the current that is played) and call play function with the new first song
	serverQueue.songs.shift();
	play(message, queue);
};