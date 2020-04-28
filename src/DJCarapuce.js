const config = require("../config.json");
const ytdl = require("ytdl-core");
const fetch = require("node-fetch");
const isInArrayStartsWith = require("./isInArrayStartsWith");

/* 
// Ancienne version du code
const YoutubeStream = require("ytdl-core");
let listMusics = [];
let isPlayingMusic = false;

const typesOfURLs = ["https://www.youtube.com/watch?v=", "https://m.youtube.com/watch?v=", "https://youtu.be/", "https://www.youtube.com/v/", "https://www.youtube.com/embed/", "https://www.youtube.com/embed/", "https://music.youtube.com/watch?v=", "https://gaming.youtube.com/watch?v="];

function isInArrayStartsWith(elem, arr) {
	for (let i = 0; i < arr.length; i++)
		if (elem.startsWith(arr[i]))
			return (true);
	return (false);
}

function setURL(content, channel) {
	let args = content.split(" ");
	let requestUrl;

	if (args[1]) {
		if (isInArrayStartsWith(args[1], typesOfURLs))
			requestUrl = args[1]
		else
			requestUrl = "https://www.youtube.com/watch?v=" + args[1];
		if (!YoutubeStream.validateURL(requestUrl)) {
			channel.send(`Tu dois ajouter une URL ou un identifiant de vidéo (ID) YouTube valide après avoir utilisé la commande *${config.prefix}play* 😉`);
			return ("");
		};

		if (isPlayingMusic) {
			listMusics.push(requestUrl);
			return ("");
		}
	} else {
		if (listMusics.length === 0) {
			channel.send(`Tu dois ajouter une URL ou un identifiant de vidéo (ID) YouTube valide après avoir utilisé la commande *${config.prefix}play* 😉`);
			return ("");
		} else
			requestUrl = listMusics[0];
	}
	return (requestUrl);
}

function DJCarapuce(message) {
	let requestUrl = setURL(message.content, message.channel);

	if (requestUrl === "")
		return;
	if (message.member.voiceChannel) {
		message.member.voiceChannel.join().then(connection => {
			try {
				isPlayingMusic = true;
				let stream = YoutubeStream(requestUrl);
				stream.on("error", function (err) {
					console.log(err.stack);
					message.reply("je n\'ai pas réussi à lire cette vidéo :(");
					connection.disconnect();
				});
				connection.playStream(stream).on("end", function () {
					connection.disconnect();
					isPlayingMusic = false;
					if (listMusics.length != 0)
						listMusics.shift();
					let newMessage = message;
					message.content = message.content.split(" ")[0];
					if (listMusics.length != 0)
						DJCarapuce(newMessage);
				});
			} catch (exception) {
				connection.disconnect();
				console.log(exception);
				message.channel.send("Tu dois ajouter une URL ou un identifiant de vidéo (ID) YouTube valide après avoir utilisé la commande *!caraplay* 😉");
				isPlayingMusic = false;
				if (listMusics.length != 0)
					listMusics.shift();
			}
		}).catch(console.log);
	} else
		message.reply("Tu dois dabord rejoindre un salon vocal !");
};
*/

// Nouvelle version du code

const queue = new Map();

module.exports = function (message, bot) {
	const serverQueue = queue.get(message.guild.id);

	if (message.content.startsWith(`${config.prefix}play`)) {
		execute(message, serverQueue, bot);
	} else if (message.content.startsWith(`${config.prefix}skip`)) {
		skip(message, serverQueue);
	} else if (message.content.startsWith(`${config.prefix}stop`)) {
		stop(message, serverQueue);
	}
}

async function getVideoFromArguments(keyWords) {
	const encodedKeyWords = encodeURI(keyWords);
	let url = "";
	await fetch(`https://www.googleapis.com/youtube/v3/search?part=snippet&q=${encodedKeyWords}&maxResults=1&key=${config.youtubeAPIKey}`)
    .then(function (response) {
        if (response.status == 200)
		  return response.json();
		throw response.statusText
    })
    .then(function (resjson) {
		url = `https://www.youtube.com/watch?v=${resjson.items[0].id.videoId}`;
		return (`https://www.youtube.com/watch?v=${resjson.items[0].id.videoId}`);
	});
	return (url);
}

async function execute(message, serverQueue, bot) {
	try {
	const voiceChannel = message.member.voice.channel;
	if (!voiceChannel)
		return message.channel.send("Tu dois d\'abord rejoindre un salon vocal !");
	const permissions = voiceChannel.permissionsFor(message.client.user);
	if (!permissions.has("CONNECT") || !permissions.has("SPEAK")) {
		return message.channel.send("J'ai besoins des droits pour rejoindre et pour parler dans le salon vocal !");
	}
	const args = message.content.split(' ');
	let url = "";
	if (message.content.includes("youtube.com"))
		url = args[1];
	else
		url = await getVideoFromArguments(message.content.substring(config.prefix.length + 5));
	const songInfo = await ytdl.getInfo(url);
	const song = {
		title: songInfo.title,
		url: songInfo.video_url,
	};

	if (!serverQueue) {
		const queueContruct = {
			textChannel: message.channel,
			voiceChannel: voiceChannel,
			connection: null,
			songs: [],
			volume: 5,
			playing: true,
		};
		queue.set(message.guild.id, queueContruct);
		queueContruct.songs.push(song);
		var connection = await voiceChannel.join();
		queueContruct.connection = connection;
		play(message.guild, queueContruct.songs[0]);
	} else {
		serverQueue.songs.push(song);
		return message.channel.send(`${song.title} a été ajouté  à la liste !`);
	}
	} catch(exception) {
		sendError(message, exception, bot);
	}
}

function skip(message, serverQueue) {
	if (!message.member.voice.channel)
		return message.channel.send("Tu dois d\'abord rejoindre un salon vocal !");
	if (!serverQueue)
		return message.channel.send("Il n\'y a pas de son que je peux passer.");
	serverQueue.connection.dispatcher.end();
}

function stop(message, serverQueue) {
	if (!message.member.voice.channel)
		return message.channel.send("Tu dois d\'abord rejoindre un salon vocal !");
	serverQueue.songs = [];
	serverQueue.connection.dispatcher.end();
}

function play(guild, song) {
	const serverQueue = queue.get(guild.id);

	if (!song) {
		serverQueue.voice.channel.leave();
		queue.delete(guild.id);
		return;
	}
	const dispatcher = serverQueue.connection.play(ytdl(song.url))
		.on("end", () => {
			serverQueue.songs.shift();
			play(guild, serverQueue.songs[0]);
		})
		.on("error", error => {
			console.error(error);
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
	console.log(`ERREUR\nL\'utilisateur ${message.author.username}${ message.guild === null ? "" : `, sur le serveur ${message.member.guild.name}`} a envoyé la commande :\n${message.content}\n\nL\'erreur suivante s\'est produite :\n${exception.stack}`);
}

function channelErrorMessage(message, exception) {
	message.channel.send({ embed: { color: 16711680, description: `__**ERREUR**__\nLa commande n\'a pas fonctionnée <:surprised_carapuce:568777407046221824>\n\n__L\'erreur suivante s\'est produite :__\n*${exception}*`}});
}

function ownerErrorMessage(message, exception, bot) {
	const owner = bot.users.cache.get(config.ownerID);
	owner.send({embed:{color: 16711680, description: `__**ERREUR**__\nL\'utilisateur ${message.author.username}${ message.guild === null ? "" : `, sur le serveur ${message.member.guild.name}`} a envoyé la commande :\n${message.content}\n\n__L\'erreur suivante s\'est produite :__\n*${exception.stack}*`}});
}