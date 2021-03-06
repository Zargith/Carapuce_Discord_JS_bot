const config = require("../config.json");
const ytdl = require("ytdl-core");
const fetch = require("node-fetch");
const isInArray = require("./isInArray.js");
const getReportLogChannel = require("./getReportLogChannel.js");

const queue = new Map();

module.exports = function(message, bot) {
	// split the message content to exactly get the command
	const args = message.content.split(" ");
	// check if the command is really a music command and not a misunderstanding
	if (!isInArray(args[0], [`${config.prefix}playlist`, `${config.prefix}play`, `${config.prefix}skip`, `${config.prefix}stop`])) {
		message.channel.send(`Commande \`${args[0]}\` non-reconnue...`);
		return;
	}

	// get the que queue for the server the command was used
	let serverQueue = queue.get(message.guild.id);

	// redirect to the good function depending of the command send, else send a message that says that the command isn't reconized
	if (message.content === `${config.prefix}playlist`)
		playlist(message, serverQueue);
	else if (message.content.startsWith(`${config.prefix}play`))
		execute(message, serverQueue, bot);
	else if (message.content.startsWith(`${config.prefix}skip`))
		skip(message, serverQueue);
	else if (message.content.startsWith(`${config.prefix}stop`))
		stop(message, serverQueue);
	else
		message.channel.send(`Commande \`${message.content}\` non-reconnue...`);
};


function playlist(message, serverQueue) {
	if (!serverQueue || !serverQueue.songs) {
		message.channel.send("Il n'y a pas de musique actuellement :eyes:");
		return;
	}
	let msg = "__Playlist actuelle :__\n";
	for (let i = 0; i < serverQueue.songs.length; i++)
		msg += `[${i}] : ${serverQueue.songs[i].title}\n`;
	message.channel.send(msg);
}

async function getVideoFromArguments(message, keyWords) {
	// if there'is no Youtube API key defined in the bot cannot search a Youtube video with keywords so it throw an error
	if (!config.youtubeAPIKey)
		throw new Error("Config file missing Youtube API key.");

	// encode keywords to use them in the API call
	const encodedKeyWords = await encodeURIComponent(keyWords);
	const url = await fetch(`https://www.googleapis.com/youtube/v3/search?part=snippet&q=${encodedKeyWords}&maxResults=1&type=video&key=${config.youtubeAPIKey}`)
		.then(function(response) {
			// if good answer from the API call, then go to the next function. Else throw an error
			if (response.status == 200)
				return response.json();
			throw response.statusText;
		})
		.then(function(resjson) {
			// if there is no video found, send a message that it doens't found a video and return undefined
			if (resjson.totalResults == 0 || !resjson.items[0] || !resjson.items[0].id.videoId) {
				message.channel.send("/shrug Pas de musique trouvé... Essaye avec d'autres mots clé");
				return;
			}
			// return the url with the ID of the video found to complet it
			return (`https://www.youtube.com/watch?v=${resjson.items[0].id.videoId}`);
		}).catch(error => {
			throw error;
		});
	return (url);
}

async function execute(message, serverQueue, bot) {
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
			url = await getVideoFromArguments(message.content.substring(config.prefix.length + 5), bot);

		if (!url)
			return;
		const songInfo = await ytdl.getInfo(url);
		const song = {
			title: songInfo.title,
			url: songInfo.video_url,
		};

		// -----------------------------------------------
		// This line allow me to check "asynchronusly" if a queue for this guild was created when I was doing something else (probably not the best way to do)
		serverQueue = queue.get(message.guild.id);
		// -----------------------------------------------

		if (!serverQueue) {
			const queueContruct = {
				textChannel: message.channel,
				voiceChannel: voiceChannel,
				connection: null,
				songs: [],
				volume: 5,
				playing: true
			};
			const connection = await voiceChannel.join();
			if (!connection) {
				queue.delete(`${message.guild.id}`);
			}
			queueContruct.connection = connection;
			queueContruct.songs.push(song);
			queue.set(message.guild.id, queueContruct);
			message.channel.send(`[${queueContruct.songs.length}] : ${queueContruct.songs[0].title} a été ajouté à la liste !`);
			serverQueue = queue.get(message.guild.id);
			play(message.guild, serverQueue.songs[0]);
		} else {
			serverQueue.songs.push(song);
			message.channel.send(`[${serverQueue.songs.length}] : ${song.title} a été ajouté à la liste !`);

			// ------------------------------------------------------------------------
			// I'm not sure of this part of the code but my goal was to detect if the bot is speaking or not when we add a song.
			if (serverQueue.connection.speaking.bitfield === 0)
				play(message.guild, serverQueue.songs[0], message);
			// -------------------------------------------------------------------------
		}
	} catch (exception) {
		sendError(message, exception, bot);
	}
}

function skip(message, serverQueue) {
	if (!message.member.voice.channel)
		return message.channel.send("Tu dois d\'abord rejoindre un salon vocal !");
	if (!serverQueue)
		return message.channel.send("Il n\'y a pas de son que je peux passer.");
	serverQueue.songs.shift();
	play(message.guild, serverQueue.songs[0], message);
}

function stop(message, serverQueue) {
	if (!message.member.voice.channel)
		return message.channel.send("Tu dois d\'abord rejoindre un salon vocal !");
	serverQueue.songs = [];
	serverQueue.connection.dispatcher.end();
	serverQueue.voiceChannel.leave();
}

function play(guild, song, message) {
	const serverQueue = queue.get(guild.id);

	if (!serverQueue || !serverQueue.connection)
		return;
	if (!song) {
		serverQueue.voiceChannel.leave();
		queue.delete(guild.id);
		return;
	}
	const dispatcher = serverQueue.connection.play(ytdl(song.url, {filter: "audioonly"}))
		.on("finish", () => {
			serverQueue.songs.shift();
			play(guild, serverQueue.songs[0], message);
		})
		.on("error", error => {
			throw error;
		});
	dispatcher.setVolumeLogarithmic(serverQueue.volume / 5);
}

function sendError(message, exception, bot) {
	consoleErrorMessage(message, exception);
	channelErrorMessage(message, exception);
	ownerErrorMessage(message, exception, bot);
}

function consoleErrorMessage(message, exception) {
	console.log(`ERREUR\nL\'utilisateur ${message.author.username}${message.guild === null ? "" : `, sur le serveur ${message.member.guild.name}`} a envoyé la commande :\n${message.content}\n\nL\'erreur suivante s\'est produite :\n${exception.stack}`);
}

function channelErrorMessage(message, exception) {
	message.channel.send({embed: {color: 16711680, description: `__**ERREUR**__\nLa commande n\'a pas fonctionnée\n\n__L\'erreur suivante s\'est produite :__\n*${exception}*`}});
	const reportLogChannel = message.guild.channels.cache.get(config.reportLogChannel);
	if (!reportLogChannel)
		return;
	reportLogChannel.send({embed: {color: 16711680, description: `__**ERREUR**__\nL\'utilisateur ${message.author.username}${ message.guild === null ? "" : `, sur le serveur ${message.member.guild.name}`} a envoyé la commande :\n${message.content}\n\n__L\'erreur suivante s\'est produite :__\n*${exception.stack}*`}});
}

function ownerErrorMessage(message, exception, bot) {
	const owner = bot.users.cache.get(config.ownerID);
	owner.send({embed: {color: 16711680, description: `__**ERREUR**__\nL\'utilisateur ${message.author.username}${ message.guild === null ? "" : `, sur le serveur ${message.member.guild.name}`} a envoyé la commande :\n${message.content}\n\n__L\'erreur suivante s\'est produite :__\n*${exception.stack}*`}});
}