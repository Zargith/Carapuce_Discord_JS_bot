const Discord = require("discord.js");
const bot = new Discord.Client({partials: ["MESSAGE", "CHANNEL", "REACTION"], disableMentions: "everyone"});
const config = require("./config.json");
const {Player} = require("discord-player"); // Create a new Player (Youtube API key is your Youtube Data v3 key)
const player = new Player(bot); // To easily access the player
bot.player = player;
bot.filters = config.filters;


// src directory
const guildMemberAdd = require("./src/utils/guildAddMember.js");
const emojis = require("./src/utils/emojiCharacters.js");
const roleReaction = require("./src/utils/roleReaction.js");
const isInWhiteList = require("./src/utils/isInWhiteList.js");
const checkBannedWords = require("./src/utils/checkBannedWords/checkBannedWords.js");
const sendError = require("./src/utils/sendError.js");
const usersCommands = require("./src/commands/usersCommands.js");
const adminCommands = require("./src/commands/adminCommands.js");
const restartBot = require("./src/commands/admin_commands/restartBot.js");

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
});

bot.on("error", async function() {
	console.log(`Error name : ${error.name}\nError message : ${error.message}`);
	const owner = await bot.users.fetch(config.ownerID);
	if (owner)
		owner.send({embed: {color: 16711680, description: `__**ERREUR**__ at ${new Date()}\n__Error name :__ *${error.name}*\n__Error message :__*${error.message}*`}});
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
				owner.send.send({embed: {color: 16711680, description: `__**ERREUR**__ at ${new Date()}\nLorsque l'utilisateur ${user.tag} sur le serveur ${(reaction.message || reaction.message.guild ? reaction.message.guild.name : null)} a ajouté une réaction, l'erreur suivante s'est produite :\n*${exception.stack}*`}});
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
				owner.send({embed: {color: 16711680, description: `__**ERREUR**__ at ${new Date()}\nLorsque l'utilisateur ${user.tag} sur le serveur ${(reaction.message || reaction.message.guild ? reaction.message.guild.name : null)} a retiré une réaction, l'erreur suivante s'est produite :\n*${exception.stack}*`}});
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
				owner.send.send({embed: {color: 16711680, description: `__**ERREUR**__ at ${new Date()}\nLors de l'arrivée de l'utilisateur ${member.user.tag} sur le serveur ${member.guild.name}\n\n__L'erreur suivante s'est produite:__\n*${exception.stack}*`}});
		}
	}
});


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


bot.on("message", message => {
	try {
		if (message.content.toLowerCase().includes("carapuce") || (message.content.includes("<@!550786957245153290>"))) {
			const emojiCarapuce = bot.emojis.cache.find(emoji => emoji.name === "carapuce");
			if (emojiCarapuce)
				message.react(emojiCarapuce);
		}

		// if the message doesn't start by the prefix setted on the config file or if this variable isn't defined, the code doesn't go further
		if (!config.prefix || !message.content.startsWith(config.prefix) || message.author.bot)
			return;
		checkBannedWords(message);
		if (!message.content.startsWith(config.prefix))
			return;

		if (!message.guild) {
			if (message.author.id === config.ownerID)
				adminCommands(message, bot); // TO DO add a category of commands only for owner and white listed people
			else
				bot.users.get(config.ownerID).send({embed: {color: 3447003, description: `L\'utilisateur ${message.author.username} m\'a envoyé :\n\n${message.content}`}});
			return;
		} else if (message.author.id === config.ownerID || isInWhiteList(message.author.id))
			adminCommands(message, bot);
		else
			usersCommands(message, bot);
	} catch (exception) {
		sendError(message, exception, bot);
	}
});

bot.login(config.token);