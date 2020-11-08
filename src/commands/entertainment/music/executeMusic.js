const ytdl = require("ytdl-core");
const config = require("../../../../config.json");
const sendError = require("../../../utils/sendError.js");
const play = require("./playMusic.js");
const getVideoFromArguments = require("./getVideoFromArguments.js");

module.exports = async function(message, queue, bot) {
	try {
		// check if the user that send the message is already into a vocal channel
		// else tell him that he can't use the command and exit the function
		const voiceChannel = message.member.voice.channel;
		if (!voiceChannel)
			return message.channel.send("Tu dois d\'abord rejoindre un salon vocal !");

		// check if the bot has the right to connect to the vocal channel and to speak
		// else tell that it need some rights to work well and exit the function
		const permissions = voiceChannel.permissionsFor(message.client.user);
		if (!permissions.has("CONNECT") || !permissions.has("SPEAK"))
			return message.channel.send("J'ai besoins des droits pour rejoindre et pour parler dans le salon vocal !");

		// split content of the message by spaces to be sure the command has parameters
		const args = message.content.split(" ");
		if (args.length <= 1) {
			message.channel.send("Tu dois me donner plus d'informations : une URL Youtube ou des mots clés");
			return;
		}

		// check if in the first parameter there is a url (or some thing that looks like one of Youtube)
		// if yes try to play the music using this url
		// else trying to find a music video using keywords using API call
		let url = "";
		if (message.content.includes("youtube.com"))
			url = args[1];
		else
			url = await getVideoFromArguments(message, message.content.substring(config.prefix.length + 5));

		if (!url)
			throw Error("Aucune URL fournie ou trouvée");
		else if (url === "Volunteer error: nothing found")
			return;
		// get informations about a the Youtube video URL to add them into an object song that we'll use later
		const songInfo = await ytdl.getInfo(url);
		const song = {
			title: songInfo.title,
			url: songInfo.video_url,
		};

		// -----------------------------------------------
		// This line allow me to check "asynchronusly" if a queue for this guild was created when I was doing something else (probably not the best way to do)
		let serverQueue = queue.get(message.guild.id);
		// -----------------------------------------------

		// if there is no queue for the server the massage comes from, we construct one with some useful informations
		if (!serverQueue) {
			const queueContruct = {
				textChannel: message.channel,
				voiceChannel: voiceChannel,
				connection: null,
				songs: [],
				volume: 5,
				playing: true
			};
			// we try connect the bot to the vocal channel and if isn't possible, we destruct the queue
			const connection = await voiceChannel.join();
			if (!connection) {
				queue.delete(`${message.guild.id}`);
			}
			// do so update of values into some variables
			queueContruct.connection = connection;
			queueContruct.songs.push(song);
			queue.set(message.guild.id, queueContruct);
			// tell to the user oprations gone well
			message.channel.send(`[${queueContruct.songs.length}] : ${queueContruct.songs[0].title} a été ajouté à la liste !`);
			serverQueue = queue.get(message.guild.id);
			// play th music
			play(message, queue);
		} else {
			// if there is already a music queue for the server the message comes from we just add the music to the array of songs
			serverQueue.songs.push(song);
			message.channel.send(`[${serverQueue.songs.length}] : ${song.title} a été ajouté à la liste !`);

			// ------------------------------------------------------------------------
			// Not sure of this part of the code but my goal was to detect if the bot is speaking or not when we add a song.
			if (serverQueue.connection.speaking.bitfield === 0)
				play(message, queue);
			// -------------------------------------------------------------------------
		}
	} catch (exception) {
		sendError(message, exception, bot);
	}
};