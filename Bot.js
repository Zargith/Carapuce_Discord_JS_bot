const Discord = require("discord.js");
const bot = new Discord.Client({partials: ["MESSAGE", "CHANNEL", "REACTION"], disableMentions: "everyone"});
const config = require("./config.json");
const {Player} = require("discord-player"); // Create a new Player (Youtube API key is your Youtube Data v3 key)
const player = new Player(bot); // To easily access the player
bot.player = player;
bot.filters = config.filters;

// src directory
const isInArrayStartsWith = require("./src/isInArrayStartsWith.js");
const help = require("./src/help.js");
const emojis = require("./src/emojiCharacters.js");
const guildMemberAdd = require("./src/guildAddMember.js");
const roleReaction = require("./src/roleReaction.js");
const caraquiz = require("./src/CaraQuiz.js");
const myPoll = require("./src/poll.js");
const shifumi = require("./src/shifumi.js");
const flipCoin = require("./src/flipCoin.js");
const DJCarapuce = require("./src/music/newDJCarapuce.js");
const LasVegas = require("./src/LasVegas.js");
const cleanChannel = require("./src/cleanChannel.js");
const checkBannedWords = require("./src/checkBannedWords.js");
const devJokes = require("./src/devJokes/devJokes.js");

// Then add some messages that will be sent when the events will be triggered
// Send a message when a track starts
bot.player.on("trackStart", (message, track) => message.channel.send(`Now playing ${track.title}...`));

// Send a message when something is added to the queue
bot.player.on("trackAdd", (message, track) => message.channel.send(`${track.title} has been added to the queue!`));
bot.player.on("playlistAdd", (message, playlist) => message.channel.send(`${playlist.title} has been added to the queue (${playlist.items.length} songs)!`));

// Send messages to format search results
bot.player.on("searchResults", (message, query, tracks) => {
	const embed = new Discord.MessageEmbed()
		.setAuthor(`Here are your search results for ${query}!`)
		.setDescription(tracks.map((t, i) => `${i}. ${t.title}`))
		.setFooter("Send the number of the song you want to play!");
	message.channel.send(embed);
});
bot.player.on("searchInvalidResponse", (message, query, tracks, content, collector) => message.channel.send(`You must send a valid number between 1 and ${tracks.length}!`));
bot.player.on("searchCancel", (message, query, tracks) => message.channel.send("You did not provide a valid response... Please send the command again!"));
bot.player.on("noResults", (message, query) => message.channel.send(`No results found on YouTube for ${query}!`));

// Send a message when the music is stopped
bot.player.on("queueEnd", (message, queue) => message.channel.send("Music stopped as there is no more music in the queue!"));
bot.player.on("channelEmpty", (message, queue) => message.channel.send("Music stopped as there is no more member in the voice channel!"));
bot.player.on("botDisconnect", (message, queue) => message.channel.send("Music stopped as I have been disconnected from the channel!"));

// Error handling
bot.player.on("error", (error, message) => {
	switch (error) {
		case ("NotPlaying"):
			message.channel.send("There is no music being played on this server!");
			break;
		case ("NotConnected"):
			message.channel.send("You are not connected in any voice channel!");
			break;
		case ("UnableToJoin"):
			message.channel.send("I am not able to join your voice channel, please check my permissions!");
			break;
		default:
			message.channel.send(`Something went wrong... Error: ${error}`);
	}
});

bot.on("ready", async function() {
	try {
		console.log(`Log in as ${bot.user.tag} !`);
		console.log("Servers :");
		bot.guilds.cache.array().forEach(guild => {
			console.log(" - " + guild.name);
		});
		console.log("\n");
		bot.user.setActivity(`${config.prefix}help`, {type: "WATCHING"});
		const owner = await bot.users.fetch(config.ownerID);
		if (owner)
			owner.send({embed: {color: 65330, description: "Started successfully"}});
		setInterval(() => restartBot(null, bot), 86400000); // 86,400,000ms = 24hrs
	} catch (exception) {
		// if a bot owner ID is defined, the bot will send him the complete error to let him know what happened
		if (config.ownerID) {
			const owner = await bot.users.fetch(config.ownerID);
			if (owner)
				owner.send({embed: {color: 16711680, description: `__**ERREUR**__ at ${new Date()}\nErreur lors du démarrage du bot.\n\n__L\'erreur suivante s\'est produite :__\n*${exception.stack}*`}});
		}
	}
});

bot.on("error", async function() {
	console.log(`Error name : ${error.name}\nError message : ${error.message}`);
	const owner = await bot.users.fetch(config.ownerID);
	if (owner)
		owner.send({embed: {color: 16711680, description: `__**ERREUR**__\n__Error name :__ *${error.name}*\n__Error message :__*${error.message}*`}});
});

bot.on("invalidated", async function(error) {
	console.log("Session has been invalidated. Restarting the bot.");
	const owner = await bot.users.fetch(config.ownerID);
	if (owner)
		owner.send.send({embed: {color: 16711680, description: "Session has been invalidated. Restarting the bot."}})
			.then(msg => bot.destroy())
			.then(() => bot.login(config.token))
			.then(() => bot.user.setActivity(`${config.prefix}help`, {type: "WATCHING"}));
});

bot.on("messageReactionAdd", async (reaction, user) => {
	try {
		if (!config.guilds)
			return;
		roleReaction.addRole(reaction, user);
	} catch (exception) {
		console.log(`ERREUR\nLorsque l'utilisateur ${user.tag} sur le serveur ${(reaction.message || reaction.message.guild ? reaction.message.guild.name : null)} a ajouté une réaction, l'erreur suivante s'est produite :\n${exception.stack}`);
		if (config.ownerID) {
			const owner = await bot.users.fetch(config.ownerID);
			if (owner)
				owner.send.send({embed: {color: 16711680, description: `__**ERREUR**__\nLorsque l'utilisateur ${user.tag} sur le serveur ${(reaction.message || reaction.message.guild ? reaction.message.guild.name : null)} a ajouté une réaction, l'erreur suivante s'est produite :\n*${exception.stack}*`}});
		}
	}
});

bot.on("messageReactionRemove", async (reaction, user) => {
	try {
		if (!config.guilds)
			return;
		roleReaction.removeRole(reaction, user);
	} catch (exception) {
		console.log(`ERREUR\nLorsque l'utilisateur ${user.tag} sur le serveur ${(reaction.message || reaction.message.guild ? reaction.message.guild.name : null)} a retité une réaction, l'erreur suivante s'est produite :\n${exception.stack}`);
		if (config.ownerID) {
			const owner = await bot.users.fetch(config.ownerID);
			if (owner)
				owner.send({embed: {color: 16711680, description: `__**ERREUR**__\nLorsque l'utilisateur ${user.tag} sur le serveur ${(reaction.message || reaction.message.guild ? reaction.message.guild.name : null)} a retiré une réaction, l'erreur suivante s'est produite :\n*${exception.stack}*`}});
		}
	}
});

bot.on("guildMemberAdd", async member => {
	try {
		guildMemberAdd.createWelcomeImage(member, bot);
		if (!config.guilds)
			return;
		guildMemberAdd.addDefaultRoles(member);
	} catch (exception) {
		console.log(`ERREUR\nLors de l'arrivée de l'utilisateur ${member.user.tag} sur le serveur ${member.guild.name}\nL'erreur suivante s'est produite:\n${exception.stack}`);
		if (config.ownerID) {
			const owner = await bot.users.fetch(config.ownerID);
			if (owner)
				owner.send.send({embed: {color: 16711680, description: `__**ERREUR**__\nLors de l'arrivée de l'utilisateur ${member.user.tag} sur le serveur ${member.guild.name}\n\n__L'erreur suivante s'est produite:__\n*${exception.stack}*`}});
		}
	}
});

function redirectCommands(message) {
	if (message.content.includes("ta maman") || message.content.includes("ta mère"))
		message.reply(` ON AVAIT DIT PAS LES MAMANS !!! ${emojis.angry_carapuce}`);

	if (isInArrayStartsWith(message.content, [`${config.prefix}play`, `${config.prefix}skip`, `${config.prefix}stop`, `${config.prefix}playlist`, `${config.prefix}pause`, `${config.prefix}resume`, `${config.prefix}filters`, `${config.prefix}shuffle`, `${config.prefix}setVolume`, `${config.prefix}loop`, `${config.prefix}clearPlaylist`, `${config.prefix}progress`])) {
		if (message.guild === null) {
			message.reply("Tu ne peux pas utiliser cette commande en privé.");
			return;
		}
		message.channel.send("/!\\ Attention. La version actuelle de la library externe de musique n'est pas stable et peut ne pas fonctionner (sans pour autant renvoyer un message d'erreur ! /!\\");
		DJCarapuce(message, bot);
		return;
	}

	switch (message.content) {
		case (`${config.prefix}help`):
			help.printHelp(message);
			return;
		case (`${config.prefix}ownerHelp`):
			message.channel.send(`Désolé mais tu n'as pas accès à cette commande... ${emojis.sad_carapuce}`);
			return;
		case (`${config.prefix}ping`):
			message.channel.send(`Carapong ! ${emojis.carapuce}`);
			message.channel.send(`My Ping is : **${bot.ws.ping}ms** !`);
			return;
		case (`${config.prefix}vatar`):
			message.reply(message.author.avatarURL);
			return;
		case (`${config.prefix}bonjour`):
			message.react("553490319103098883");
			message.reply(`Carabonjour à toi ! ${emojis.carapuce}`);
			return;
		case (`${config.prefix}love`):
			message.channel.send("dab dab, I dab you some dabing love ! :heart:");
			return;
		case (`${config.prefix}devJoke`):
		case (`${config.prefix}devjoke`):
			devJokes(message);
			return;
		case (`${config.prefix}listemojis`):
			if (message.guild === null) {
				message.reply("Tu ne peux pas utiliser cette commande en privé.");
				return;
			}
			const emojiList = message.guild.emojis.cache.map(e => `${e} => :${e.name}:`);
			message.channel.send(emojiList);
			return;
		case (`${config.prefix}DansLaWhiteList`):
			if (isInWhiteList(message.author.id) || message.author.id === config.ownerID)
				message.reply(" oui tu y es !");
			else
				message.reply(" non tu n'y es pas.");
			return;
		case (`${config.prefix}invite`):
			message.channel.send("https://discordapp.com/api/oauth2/authorize?client_id=550786957245153290&permissions=0&scope=bot");
			return;
	}

	if (isInArrayStartsWith(message.content, [`${config.prefix}quiz`, `${config.prefix}Qstop`]) || caraquiz.inQuiz === true || caraquiz.waitResponse === true) {
		message.channel.send("Cette fonctionnalité est probablement cassée pour l'instant. Je travaille à sa réparation.");
		caraquiz.CaraQuiz(message);
	} else if (message.content.startsWith(`${config.prefix}flip`))
		flipCoin(message);
	else if (message.content.startsWith(`${config.prefix}shifumi`))
		shifumi(message);
	else if (message.content.startsWith(`${config.prefix}poll`))
		myPoll(message);
	else if (message.content.startsWith(`${config.prefix}LasVegas`))
		LasVegas(message);
	else if (message.content.includes("stan"))
		message.channel.send("J\'aime embêter <@127132143842361345>");
	else if (message.content.startsWith(`${config.prefix}pin`))
		message.pin();
	else if (message.content.startsWith(`${config.prefix}unpin`)) {
		const args = message.content.split(" ");
		if (args.length != 2) {
			message.channel.send(`Il faut que tu me donnes l'ID du message que tu veux unpin ${emojis.carapuce}`);
			return;
		}
		message.channel.messages.fetch(args[1]).then(msg => {
			if (!msg) {
				message.channel.send(`Il faut que tu me donnes l'ID du message que tu veux unpin, celui-ci doit être dans le channel où tu rentres cette commande ${emojis.carapuce}`);
				return;
			}
			if (!msg.pinned) {
				message.channel.send(`Message not pinned ${emojis.carapuce}`);
				return;
			}
			msg.unpin();
			message.channel.send(`Message unpinned ${emojis.happy_carapuce}`);
		}).catch(err => {
			throw err;
		});
		return;
	} else if (message.content.startsWith(`${config.prefix}help`)) {
		const args = message.content.slice(config.prefix.length).trim().split(" ");
		args.shift();
		if (args[0] === "musique")
			help.printHelpMusic(message);
	} else
		message.channel.send(`Commande non reconnue... ${emojis.sad_carapuce}`);
}

function ownerDMCommands(message) {
	if (message.content === `${config.prefix}listGuilds`) {
		let str = "";
		bot.guilds.cache.array().forEach(guild => {
			str += (`- __Name :__ ${guild.name}\n\t\t__ID :__ ${guild.id}\n\n`);
		});
		message.channel.send(str);
	}
	if (message.content.startsWith(`${config.prefix}channelsOfGuild`)) {
		const args = message.content.split(" ");
		if (args.length !== 2) {
			message.channel.send("J'ai uniquement besoin de l'id **du** serveur dont tu souhaites les informations.");
			return;
		}
		const id = args[1];
		const guild = bot.guilds.cache.get(id);
		if (!guild) {
			message.channel.send("**Error**\nID not found or guild is null.");
			return;
		}
		let str = `__Serveur :__ ${guild.name},\t__ID :__ ${guild.id}\n\n`;
		guild.channels.cache.array().forEach(chan => {
			str += (`\t- __Name :__ ${chan.name }\n\t\t__Type :__ ${chan.type}\n\t\t__ID :__ ${chan.id}\n\n`);
		});
		message.channel.send(str);
		return;
	}
	if (message.content.startsWith(`${config.prefix}messageToChannel`)) {
		const args = message.content.split(" ");
		let str = "";
		args.shift();
		const id = args[0];
		args.shift();
		args.forEach(arg => {
			str += arg + " ";
		});
		bot.channels.cache.get(id).send(str);
	}
	if (message.content.startsWith(`${config.prefix}sendMP`)) {
		const args = message.content.split(" ");
		let str = "";
		args.shift();
		const id = args[0];
		args.shift();
		args.forEach(arg => {
			str += arg + " ";
		});
		bot.users.cache.get(id).send(str);
		message.channel.send("Message envoyé !");
	}
	if (message.author.id === config.ownerID || isInWhiteList(message.author.id))
		ownerCommands(message);
	else
		redirectCommands(message);
}

async function restartBot(channel) {
	if (channel)
		channel.send("Redémarrage en cours...")
			.then(() => bot.destroy())
			.then(async function() {
				bot.login(config.token)
					.then(() => bot.user.setActivity(`${config.prefix}help`, {type: "WATCHING"}));
				const owner = await bot.users.fetch(config.ownerID);
				if (owner)
					owner.send({embed: {color: 65330, description: "Bot redémarré manuellement"}});
				channel.send("Redémarrage terminé !");
			});
	else {
		bot.destroy();
		bot.login(config.token)
			.then(() => bot.user.setActivity(`${config.prefix}help`, {type: "WATCHING"}));
	}
}

function ownerCommands(message) {
	switch (message.content) {
		case (`${config.prefix}join`):
			if (message.guild === null) {
				message.reply("Tu ne peux pas utiliser cette commande en privé.");
				return;
			}
			bot.emit("guildMemberAdd", message.member);
			return;
		case (`${config.prefix}ownerHelp`):
			help.printOwnerHelp(message);
			return;
		case (`${config.prefix}restart`):
			restartBot(message.channel);
			break;
		case (`${config.prefix}emote`):
			message.delete();
			message.channel.send(emojis.carapuce);
			return;
		case (`${config.prefix}happy`):
			message.delete();
			message.channel.send(emojis.happy_carapuce);
			return;
		case (`${config.prefix}sad`):
			message.delete();
			message.channel.send(emojis.sad_carapuce);
			return;
		case (`${config.prefix}angry`):
			message.delete();
			message.channel.send(emojis.angry_carapuce);
			return;
		case (`${config.prefix}surprised`):
			message.delete();
			message.channel.send(emojis.surprised_carapuce);
			return;
		case (`${config.prefix}clean`):
			cleanChannel(message);
			return;
		default:
			redirectCommands(message);
	}
}

function isInWhiteList(id) {
	let res = false;

	config.whiteList.forEach(whiteID => {
		if (whiteID === id)
			res = true;
	});
	return (res);
}

bot.on("message", message => {
	try {
		if (message.content.toLowerCase().includes("carapuce") || (message.content.includes("<@!550786957245153290>"))) {
			const emojiCarapuce = bot.emojis.cache.find(emoji => emoji.name === "carapuce");
			if (emojiCarapuce)
				message.react(emojiCarapuce);
		}

		if (message.author.bot)
			return;
		checkBannedWords(message);
		if (!message.content.startsWith(config.prefix))
			return;

		if (message.guild === null) {
			if (message.author.id === config.ownerID)
				ownerDMCommands(message);
			else
				bot.users.get(config.ownerID).send({embed: {color: 3447003, description: `L\'utilisateur ${message.author.username} m\'a envoyé :\n\n${message.content}`}});
			return;
		} else if (message.author.id === config.ownerID || isInWhiteList(message.author.id))
			ownerCommands(message);
		else
			redirectCommands(message);
	} catch (exception) {
		sendError(message, exception);
	}
});

function sendError(message, exception) {
	consoleErrorMessage(message, exception);
	channelErrorMessage(message, exception);
	ownerErrorMessage(message, exception);
}

function consoleErrorMessage(message, exception) {
	console.log(message);
	console.log(`ERREUR at ${new Date()}\nL\'utilisateur ${(message.author ? message.author.tag : "**null**")}${!message.guild ? "" : `, sur le serveur ${message.guild.name}`} a envoyé la commande :\n${message.content}\n\nL\'erreur suivante s\'est produite :\n${exception.stack}`);
}

function channelErrorMessage(message, exception) {
	message.channel.send({embed: {color: 16711680, description: `__**ERREUR**__ at ${new Date()}\nLa commande n\'a pas fonctionnée...\n\n__L\'erreur suivante s\'est produite :__\n*${exception}*`}});
}

async function ownerErrorMessage(message, exception) {
	const owner = await bot.users.fetch(config.ownerID);
	if (owner)
		owner.send.send({embed: {color: 16711680, description: `__**ERREUR**__ at ${new Date()}\nL\'utilisateur ${message.author.tag}${ message.guild === null ? "" : `, sur le serveur ${message.member.guild.name}`} a envoyé la commande :\n${message.content}\n\n__L\'erreur suivante s\'est produite :__\n*${exception.stack}*`}});
}

bot.login(config.token);