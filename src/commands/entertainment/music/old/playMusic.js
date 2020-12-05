const ytdl = require("ytdl-core");

module.exports = function play(message, queue) {
	const serverQueue = queue.get(message.guild.id);
	// check if there's a queue for the server that the command comes from or that the variable connection as been defined, else return
	if (!serverQueue || !serverQueue.connection)
		return;
	// if there is no song to play, the bot delete the queue of this server and leave the vocal channel
	if (serverQueue.songs.length === 0) {
		serverQueue.voiceChannel.leave();
		queue.delete(message.guild.id);
		return;
	}
	// try to play th music given as parameter and play it in audio only, we dont need much
	const dispatcher = serverQueue.connection.play(ytdl(serverQueue.songs[0].url, {filter: "audioonly"}))
		.on("finish", () => {
			// when the song finish, remove it from the list of songs and play the next one
			serverQueue.songs.shift();
			play(message, queue);
		})
		.on("error", error => {
			// in case of error, throw the error and catch it later
			throw error;
		});
	// set the bot volume to 50%
	dispatcher.setVolumeLogarithmic(serverQueue.volume / 5);
};