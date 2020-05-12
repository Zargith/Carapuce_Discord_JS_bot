const Discord = require("discord.js");
const bot = new Discord.Client();
const config = require("./config.json");


// src directory
const help = require("./src/help.js");
const caraquiz = require("./src/CaraQuiz.js");
const myPoll = require("./src/poll.js");
const shifumi = require("./src/shifumi.js");
const flipCoin = require("./src/flipCoin.js");
const guildMemberAdd = require("./src/guildAddMember.js");
const DJCarapuce = require("./src/DJCarapuce.js");
const isInArrayStartsWith = require("./src/isInArrayStartsWith.js");
const emojis = require("./src/emojiCharacters.js");
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

bot.on("error", function(error) {
	console.log(`Error name : ${error.name}\nError message : ${error.message}`);
	bot.users.cache.get(config.ownerID).send({embed: {color: 16711680, description: `__**ERREUR**__\n__Error name :__ *${error.name}*\n__Error message :__*${error.message}*`}});
});

bot.on("guildMemberAdd", member => {
	guildMemberAdd(member, bot);
});

const bannedWords = ["fuck", "pute", "fils de pute", "bite", "ta race", "connard", "conard", "connasse", "conasse", "conase", "conace", "connace", "salope", "enculé"];

function redirectCommands(message) {
	if (isInArrayStartsWith(message.content, [`${config.prefix}play`, `${config.prefix}skip`, `${config.prefix}stop`, `${config.prefix}playlist`])) {
		if (message.guild === null) {
			message.reply("Tu ne peux pas utiliser cette commande en privé.");
			return;
		}
		DJCarapuce(message, bot);
	}

	bannedWords.forEach(function(bannedWord) {
		if (!message.channel.nsfw && message.content.toLowerCase().includes(bannedWord)) {
			// message.delete()
			message.reply("je peux pas te laisser dire des cara-gros-mots... <:angry_carapuce:568356340003635200>");
			return;
		}
	});
	switch (message.content) {
		case (`${config.prefix}help`):
			help.printHelp(message);
			break;
		case (`${config.prefix}ownerHelp`):
			message.channel.send("Désolé mais tu n'as pas accès à cette commande... <:sad_carapuce:562773515745361920>");
			break;
		case (`${config.prefix}ping`):
			message.channel.send("Carapong ! <:carapuce:551198314687758357>");
			break;
		case (`${config.prefix}vatar`):
			message.reply(message.author.avatarURL);
			break;
		case (`${config.prefix}bonjour`):
			message.react("553490319103098883");
			message.reply("Carabonjour à toi ! <:happy_carapuce:553490319103098883>");
			break;
		case (`${config.prefix}puce`):
			message.channel.send("Cara, carapuce !\nhttps://img.fireden.net/v/image/1527/08/1527086908147.gif");
			break;
		case (`${config.prefix}love`):
			message.channel.send("dab dab, I dab you some dabing love ! :heart:");
			break;
		case (`${config.prefix}listemojis`):
			if (message.guild === null) {
				message.reply("Tu ne peux pas utiliser cette commande en privé.");
				return;
			}
			const emojiList = message.guild.emojis.cache.map(e => `${e} => :${e.name}:`);
			message.channel.send(emojiList);
			break;
		case (`${config.prefix}DansLaWhiteList`):
			if (isInWhiteList(message.author.id) || message.author.id === config.ownerID)
				message.reply(" oui tu y es !");
			else
				message.reply(" non tu n'y es pas.");
			break;
		case (`${config.prefix}invite`):
			message.channel.send("https://discordapp.com/api/oauth2/authorize?client_id=550786957245153290&permissions=0&scope=bot");
			break;
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
	else if (message.content.includes("ta maman") || message.content.includes("ta mère"))
		message.reply(" ON AVAIT DIT PAS LES MAMANS !!! <:angry_carapuce:568356340003635200>");
	else if (message.content.startsWith(`${config.prefix}pin`))
		message.pin();
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
		const listGuild = bot.guilds.cache.array();
		let guild = 0;
		let str = "";
		for (let i = 0; bot.guilds.cache.array().length; i++)
			if (listGuild[i].id == args[1]) {
				str += `__Serveur :__ ${listGuild[i].name},\t__ID :__ ${listGuild[i].id}\n\n`;
				guild = listGuild[i];
				break;
			}
		if (guild === 0 || guild === null) {
			message.channel.send("**Error**\nID not found or guild is null.");
			return;
		}
		guild.channels.cache.array().forEach(chan => {
			str += (`\t- __Name :__ ${chan.name }\n\t\t__Type :__ ${chan.type}\n\t\t__ID :__ ${chan.id}\n\n`);
		});
		message.channel.send(str);
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
		case (`${config.prefix}cleanChannel`):
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
		}

		if (message.author.id === config.ownerID || isInWhiteList(message.author.id))
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
	console.log(`ERREUR\nL\'utilisateur ${message.author.username}${ message.guild === null ? "" : `, sur le serveur ${message.member.guild.name}`} a envoyé la commande :\n${message.content}\n\nL\'erreur suivante s\'est produite :\n${exception.stack}`);
}

function channelErrorMessage(message, exception) {
	message.channel.send({embed: {color: 16711680, description: `__**ERREUR**__\nLa commande n\'a pas fonctionnée <:surprised_carapuce:568777407046221824>\n\n__L\'erreur suivante s\'est produite :__\n*${exception}*`}});
}

function ownerErrorMessage(message, exception) {
	const owner = bot.users.cache.get(config.ownerID);
	owner.send({embed: {color: 16711680, description: `__**ERREUR**__\nL\'utilisateur ${message.author.username}${ message.guild === null ? "" : `, sur le serveur ${message.member.guild.name}`} a envoyé la commande :\n${message.content}\n\n__L\'erreur suivante s\'est produite :__\n*${exception.stack}*`}});
}

bot.login(config.token);