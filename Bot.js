const Discord = require("discord.js");
const bot = new Discord.Client({partials: ["MESSAGE", "CHANNEL", "REACTION"]});
const config = require("./config.json");


// src directory
const isInArrayStartsWith = require("./src/isInArrayStartsWith.js");
const isInArray = require("./src/isInArray.js");
const help = require("./src/help.js");
const emojis = require("./src/emojiCharacters.js");
const guildMemberAdd = require("./src/guildAddMember.js");
const roleReaction = require("./src/roleReaction.js");
const caraquiz = require("./src/CaraQuiz.js");
const myPoll = require("./src/poll.js");
const shifumi = require("./src/shifumi.js");
const flipCoin = require("./src/flipCoin.js");
const DJCarapuce = require("./src/DJCarapuce.js");
const LasVegas = require("./src/LasVegas.js");
const cleanChannel = require("./src/cleanChannel.js");

bot.on("ready", function() {
	console.log(`Log in as ${bot.user.tag} !`);
	console.log("Servers :");
	bot.guilds.cache.array().forEach(guild => {
		console.log(" - " + guild.name);
	});
	console.log("\n");
	bot.user.setActivity(`${config.prefix}help`, {type: "WATCHING"});
//	bot.users.get(config.ownerID).send({ embed: { color: 65330, description: "Started successfully" } });
});

bot.on("error", function() {
	console.log(`Error name : ${error.name}\nError message : ${error.message}`);
	bot.users.cache.get(config.ownerID).send({embed: {color: 16711680, description: `__**ERREUR**__\n__Error name :__ *${error.name}*\n__Error message :__*${error.message}*`}});
});

bot.on("invalidated", function(error) {
	console.log("Session has been invalidated. Restarting the bot.");
	bot.users.cache.get(config.ownerID).send({embed: {color: 16711680, description: "Session has been invalidated. Restarting the bot."}})
		.then(msg => bot.destroy())
		.then(() => bot.login(config.token));
});

bot.on("messageReactionAdd", async (reaction, user) => {
	try {
		if (!config.guilds)
			return;
		roleReaction.addRole(reaction, user);
	} catch (exception) {
		console.log(`ERREUR\nL\'utilisateur ${user.username}${!reaction.message.guild ? "" : `, sur le serveur ${reaction.message.guild.name}`} n'a pas réussi à avoir de rôle avec l'attribution automatique.\n\nL\'erreur suivante s\'est produite :\n${exception.stack}`);
		const owner = bot.users.cache.get(config.ownerID);
		owner.send({embed: {color: 16711680, description: `__**ERREUR**__\nL\'utilisateur ${user.username}${!reaction.message.guild ? "" : `, sur le serveur ${reaction.message.guild.name}`} n'a pas réussi à avoir de rôle avec l'attribution automatique.\n\n__L\'erreur suivante s\'est produite :__\n*${exception.stack}*`}});
	}
});

bot.on("messageReactionRemove", async (reaction, user) => {
	try {
		if (!config.guilds)
			return;
		roleReaction.removeRole(reaction, user);
	} catch (exception) {
		console.log(`ERREUR\nL\'utilisateur ${user.username}${!reaction.message.guild ? "" : `, sur le serveur ${reaction.message.guild.name}`} n'a pas réussi à avoir de rôle avec l'attribution automatique.\n\nL\'erreur suivante s\'est produite :\n${exception.stack}`);
		const owner = bot.users.cache.get(config.ownerID);
		owner.send({embed: {color: 16711680, description: `__**ERREUR**__\nL\'utilisateur ${user.username}${!reaction.message.guild ? "" : `, sur le serveur ${reaction.message.guild.name}`} n'a pas réussi à avoir de rôle avec l'attribution automatique.\n\n__L\'erreur suivante s\'est produite :__\n*${exception.stack}*`}});
	}
});

bot.on("guildMemberAdd", member => {
	try {
		guildMemberAdd.createWelcomeImage(member, bot);
		if (!config.guilds)
			return;
		guildMemberAdd.addDefaultRoles(member);
	} catch (exception) {
		console.log(`ERREUR\nLors de l'arrivée de l'utilisateur ${member} sur le serveur ${member.guild.name}\nL'erreur suivante s'est produite:\n${exception.stack}`);
		const owner = bot.users.cache.get(config.ownerID);
		owner.send({embed: {color: 16711680, description: `__**ERREUR**__\nLors de l'arrivée de l'utilisateur ${member} sur le serveur ${member.guild.name}\n\n__L'erreur suivante s'est produite:__\n*${exception.stack}*`}});
	}
});

function redirectCommands(message) {
	if (message.content.includes("ta maman") || message.content.includes("ta mère"))
		message.reply(` ON AVAIT DIT PAS LES MAMANS !!! ${emojis.angry_carapuce}`);

	if (isInArrayStartsWith(message.content, [`${config.prefix}play`, `${config.prefix}skip`, `${config.prefix}stop`, `${config.prefix}playlist`])) {
		if (message.guild === null) {
			message.reply("Tu ne peux pas utiliser cette commande en privé.");
			return;
		}
		DJCarapuce(message, bot);
		return;
	}

	bannedWords.forEach(function(bannedWord) {
		if (!message.channel.nsfw && message.content.toLowerCase().includes(bannedWord)) {
			// message.delete()
			message.reply(` je peux pas te laisser dire des cara-gros-mots... ${emojis.angry_carapuce}`);
		}
	});
	switch (message.content) {
		case (`${config.prefix}help`):
			help.printHelp(message);
			return;
		case (`${config.prefix}ownerHelp`):
			message.channel.send(`Désolé mais tu n'as pas accès à cette commande... ${emojis.sad_carapuce}`);
			return;
		case (`${config.prefix}ping`):
			message.channel.send(`Carapong ! ${emojis.carapuce}`);
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
	else
		message.channel.send(`Commande non recconnue... ${emojis.sad_carapuce}`);
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
			process.exit();
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
			// const idEmojiCarapuce = bot.emojis.cache.find(emoji => {return (emoji.id === "551198314687758357" ? emoji : undefined)});
			// const idEmojiCarapuce = bot.emojis.cache.get("551198314687758357");
			if (emojiCarapuce/* || idEmojiCarapuce*/) {
				message.react(emojiCarapuce);
			// message.react(idEmojiCarapuce);
			}
		}

		if (message.author.bot || !message.content.startsWith(config.prefix))
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
	console.log(message)
	console.log(`ERREUR\nL\'utilisateur ${(message.author ? message.author.username : "**null**")}${!message.guild ? "" : `, sur le serveur ${message.guild.name}`} a envoyé la commande :\n${message.content}\n\nL\'erreur suivante s\'est produite :\n${exception.stack}`);
}

function channelErrorMessage(message, exception) {
	message.channel.send({embed: {color: 16711680, description: `__**ERREUR**__\nLa commande n\'a pas fonctionnée <:surprised_carapuce:568777407046221824>\n\n__L\'erreur suivante s\'est produite :__\n*${exception}*`}});
}

function ownerErrorMessage(message, exception) {
	const owner = bot.users.cache.get(config.ownerID);
	owner.send({embed: {color: 16711680, description: `__**ERREUR**__\nL\'utilisateur ${message.author.username}${ message.guild === null ? "" : `, sur le serveur ${message.member.guild.name}`} a envoyé la commande :\n${message.content}\n\n__L\'erreur suivante s\'est produite :__\n*${exception.stack}*`}});
}

bot.login(config.token);