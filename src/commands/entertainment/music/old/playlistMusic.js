module.exports = function(message, serverQueue) {
	// check if there's a queue for the server that the command comes from or that the variable connection as been defined
	// else return telling the user there is no musics for the moment
	if (!serverQueue || !serverQueue.songs) {
		message.channel.send("Il n'y a pas de musique actuellement :eyes:");
		return;
	}
	// loop on each musics stored in the list to give them back to the users in pne message
	let msg = "__Playlist actuelle :__\n";
	for (let i = 0; i < serverQueue.songs.length; i++)
		msg += `[${i}] : ${serverQueue.songs[i].title}\n`;
	message.channel.send(msg);
};