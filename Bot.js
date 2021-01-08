const Discord = require("discord.js");
const config = require("./config.json");

// in src directory
const guildMemberAdd = require("./src/utils/guildAddMember.js");
const roleReaction = require("./src/utils/oldUtils/roleReaction.js");
const isInWhiteList = require("./src/utils/isInWhiteList.js");
const checkBannedWords = require("./src/utils/checkBannedWords/checkBannedWords.js");
const sendError = require("./src/utils/sendError.js");
const usersCommands = require("./src/commands/usersCommands.js");
const adminCommands = require("./src/commands/adminCommands.js");
const restartBot = require("./src/commands/whitelist_commands/restartBot.js");
const whitelistCommands = require("./src/commands/whitelistCommands.js");
const isServerAdmin = require("./src/utils/isServerAdmin");
const emojiCharacters = require("./src/utils/emojiCharacters.js");


// Define bot as global variable
bot = new Discord.Client({partials: ["MESSAGE", "CHANNEL", "REACTION"], disableMentions: "everyone"});

// Define (and set) some other variables
const {Player} = require("discord-player"); // Create a new Player (Youtube API key is your Youtube Data v3 key)
const player = new Player(bot, {autoSelfDeaf: false, leaveOnEmptyCooldown: 15000}); // To easily access the player
bot.player = player;
bot.filters = config.filters;
if (config.prefix)
	bot.prefix = config.prefix;
else
	bot.prefix = "";


bot.login(config.token).then(async () => {
	if (config.ownerID) {
		const owner = await bot.users.fetch(config.ownerID);
		if (owner)
			bot.owner = owner;
	}
});


bot.on("message", message => {
	try {
		if (message.content.toLowerCase().includes("carapuce") || (message.content.includes("<@!550786957245153290>"))) {
			const emojiCarapuce = bot.emojis.cache.find(emoji => emoji.name === "carapuce");
			if (emojiCarapuce)
				message.react(emojiCarapuce);
		}

		// if the message doesn't start by the prefix setted on the config file or if this variable isn't defined, the code doesn't go further
		if (!bot.prefix || !message.content.startsWith(bot.prefix) || message.author.bot)
			return;
		checkBannedWords(message);
		if (!message.content.startsWith(bot.prefix))
			return;

		if (!message.guild && message.author.id !== config.ownerID && !isInWhiteList(message.author.id)) {
			bot.users.get(config.ownerID).send({embed: {color: 3447003, description: `L\'utilisateur ${message.author.username} m\'a envoyé :\n\n${message.content}`}});
			return;
		} else if (message.author.id === config.ownerID || isInWhiteList(message.author.id))
			whitelistCommands(message);
		else if (isServerAdmin(message))
			adminCommands(message);
		else
			usersCommands(message);
	} catch (exception) {
		sendError(message, exception);
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
		bot.user.setActivity(`${bot.prefix}help`, {type: "WATCHING"});
		if (bot.owner)
			bot.owner.send({embed: {color: 65330, description: "Started successfully"}});
		setInterval(() => restartBot(null, bot), 86400000); // 86,400,000ms = 24hrs
	} catch (exception) {
		// if a bot owner is defined, the bot will send him/her the complete error to let him/her know what happened
		if (bot.owner)
			bot.owner.send({embed: {color: 16711680, description: `__**ERREUR**__ at ${new Date()}\nErreur lors du démarrage du bot.\n\n__L\'erreur suivante s\'est produite :__\n*${exception.stack}*`}});
	}
});

process.on("unhandledRejection", err => {
	console.error(err);
});

bot.on("error", async function() {
	console.log(`Error name : ${error.name}\nError message : ${error.message}`);
	// if a bot owner is defined, the bot will send him/her the complete error to let him/her know what happened
	if (bot.owner)
		bot.owner.send({embed: {color: 16711680, description: `__**ERREUR**__ at ${new Date()}\n__Error name :__ *${error.name}*\n__Error message :__*${error.message}*`}});
});

bot.on("invalidated", async function(error) {
	console.log("Session has been invalidated. Restarting the bot.");
	// if a bot owner is defined, the bot will send him/her the complete error to let him/her know what happened
	if (bot.owner)
		bot.owner.send.send({embed: {color: 16711680, description: "Session has been invalidated. Restarting the bot."}})
			.then(msg => bot.destroy())
			.then(() => bot.login(config.token).then(() => bot.user.setActivity(`${bot.prefix}help`, {type: "WATCHING"})));
});

bot.on("messageReactionAdd", async (reaction, user) => {
	try {
		if (config.guilds)
			roleReaction.addRole(reaction, user); // TODO utiliser DB
	} catch (exception) {
		console.log(`ERREUR\nLorsque l'utilisateur ${user.tag} sur le serveur ${(reaction.message || reaction.message.guild ? reaction.message.guild.name : null)} a ajouté une réaction, l'erreur suivante s'est produite :\n${exception.stack}`);
		if (bot.owner)
			bot.owner.send.send({embed: {color: 16711680, description: `__**ERREUR**__ at ${new Date()}\nLorsque l'utilisateur ${user.tag} sur le serveur ${(reaction.message || reaction.message.guild ? reaction.message.guild.name : null)} a ajouté une réaction, l'erreur suivante s'est produite :\n*${exception.stack}*`}});
	}
});

bot.on("messageReactionRemove", async (reaction, user) => {
	try {
		if (config.guilds)
			roleReaction.removeRole(reaction, user); // TODO utiliser DB
	} catch (exception) {
		console.log(`ERREUR\nLorsque l'utilisateur ${user.tag} sur le serveur ${(reaction.message || reaction.message.guild ? reaction.message.guild.name : null)} a retité une réaction, l'erreur suivante s'est produite :\n${exception.stack}`);
		if (bot.owner)
			bot.owner.send({embed: {color: 16711680, description: `__**ERREUR**__ at ${new Date()}\nLorsque l'utilisateur ${user.tag} sur le serveur ${(reaction.message || reaction.message.guild ? reaction.message.guild.name : null)} a retiré une réaction, l'erreur suivante s'est produite :\n*${exception.stack}*`}});
	}
});


bot.on("guildMemberAdd", async member => {
	try {
		guildMemberAdd.createWelcomeImage(member);
		if (config.guilds)
			guildMemberAdd.addDefaultRoles(member); // TODO utiliser DB
	} catch (exception) {
		console.log(`ERREUR\nLors de l'arrivée de l'utilisateur ${member.user.tag} sur le serveur ${member.guild.name}\nL'erreur suivante s'est produite:\n${exception.stack}`);
		if (bot.owner)
			bot.owner.send.send({embed: {color: 16711680, description: `__**ERREUR**__ at ${new Date()}\nLors de l'arrivée de l'utilisateur ${member.user.tag} sur le serveur ${member.guild.name}\n\n__L'erreur suivante s'est produite:__\n*${exception.stack}*`}});
	}
});

// Add some messages that will be sent when the events will be triggered
// Send a message when a track starts
bot.player.on("trackStart", (message, track) => message.channel.send(`Now playing ${track.title}...`));

// Send a message when something is added to the queue
bot.player.on("trackAdd", (message, track) => message.channel.send(`${track.title} a été ajouté à la playlist !`));
bot.player.on("playlistAdd", (message, playlist) => message.channel.send(`La playlist ${playlist.title} a été ajouté avec (${playlist.items.length} éléments)!`));

// Send messages to format search results
bot.player.on("searchResults", (message, query, tracks) => {
	const embed = new Discord.MessageEmbed()
		.setAuthor(`Voilà les résultats pour ta recherche ${query} :`)
		.setDescription(tracks.map((t, i) => `${i + 1}. ${t.title}`))
		.setFooter("Envoie le numéro de la musique que tu veux jouer !");
	message.channel.send(embed);
});
bot.player.on("searchInvalidResponse", (message, query, tracks, content, collector) => message.channel.send(`Envoies un nombre entre 1 et ${tracks.length}!`));
bot.player.on("searchCancel", (message, query, tracks) => message.channel.send("Tu n'as pas fournéis de réponce valide. Rélance la commande si tu souhaites réessayer !"));
bot.player.on("noResults", (message, query) => message.channel.send(`Aucun résultat trouvé sur Youtube pour ${query}!`));

// Send a message when the music is stopped
bot.player.on("queueEnd", (message, queue) => message.channel.send(`Il n'y a plus de musiques à jouer, penses à en remettre si tu vux que je continue de les jouer ! ${emojiCharacters.happy_carapuce}`));
bot.player.on("channelEmpty", (message, queue) => message.channel.send(`Je me suis arrétés puisqu'il n'y a plus personne pour m'écouter jouer... ${emojiCharacters.sad_carapuce}`));
bot.player.on("botDisconnect", (message, queue) => message.channel.send(`La musique s'est arréter puisque j'ai été déconencté du salon ! ${emojiCharacters.surprised_carapuce}`));

// Error handling
bot.player.on("error", async (error, message) => {
	switch (error) {
		case ("NotPlaying"):
			message.channel.send("Il n'y a pas de pusique jouée sur le serveur.");
			break;
		case ("NotConnected"):
			message.channel.send("Tu dois être connecté à un salon vocal si tu veux que je te rejoigne !");
			break;
		case ("UnableToJoin"):
			message.channel.send("Je ne peux pas te rejoindre, vérifies mes droits stp...");
			break;
		default:
			if (bot.owner)
				bot.owner.send({embed: {color: 16711680, description: `__**ERREUR**__ at ${new Date()}\nL\'utilisateur ${message.author.tag}${!message.guild ? "" : `, sur le serveur ${message.member.guild.name}`} a envoyé la commande :\n${message.content}\n\n__L\'erreur suivante s\'est produite :__\n*${error}*`}});
	}
});