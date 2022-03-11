const help = require("./helps/help.js");
const myPoll = require("./entertainment/poll.js");
const shifumi = require("./entertainment/shifumi.js");
const flipCoin = require("./entertainment/flipCoin.js");
const DJCarapuce = require("./entertainment/music/newDJCarapuce.js");
const useAnimatedEmojis = require("./entertainment/useAnimatedEmojis.js");
const devJokes = require("./entertainment/devJokes/devJokes.js");
const emojis = require("../utils/emojiCharacters.js");
const weather = require("./entertainment/weather.js");

module.exports = async function(message, isInteraction = false) {
	const args = isInteraction ? [] : message.content.split(" ");
	const command = isInteraction ? message.commandName : args.shift().split(bot.config.prefix)[1];

	// check if the first word of the message content is equal to one of the following ones
	switch (command) {
		case ("ping"):
			await message.reply(`Carapong ! ${emojis.carapuce}\nSinon, mon ping est de : **${bot.ws.ping}ms** ! ${emojis.happy_carapuce}`);
			break;

		case ("play"):
		case ("skip"):
		case ("stop"):
		case ("playlist"):
		case ("cleanPlaylist"):
		case ("cleanplaylist"):
		case ("pause"):
		case ("resume"):
		case ("loop"):
		case ("setVolume"):
		case ("setvolume"):
		case ("shuffle"):
		case ("filters"):
		case ("progress"):
			return message.channel.send("Cette commande a été désactivée car doit être mise à jour.");
			if (!message.guild) {
				message.reply("Tu ne peux pas utiliser cette commande en privé.");
				break;
			}
			DJCarapuce(message, isInteraction);
			break;

		case ("help"):
			if ((!isInteraction && args.length === 0) || (isInteraction && !message.options.get("page_name"))) {
				// print the common help
				help.printCommonHelp(message);
				break;
			} else {
				switch (isInteraction ? message.options.get("page_name").value : args[0]) {
					case ("musique"):
						// print the music help
						help.printMusicHelp(message);
						break;
					case ("admin"):
					case ("whitelist"):
					case ("wl"):
						// simple users can't use this command so send an error message
						message.channel.send("Désolé mais tu n'as pas accès à cette commande...");
						break;
					default:
						message.channel.send("Je ne connais pas cette page d'aide.");
						break;
				}
			}
			break;

		case ("avatar"):
			message.reply(isInteraction ? message.user.displayAvatarURL({ dynamic: true, format: "png" }) : message.author.displayAvatarURL({ dynamic: true, format: "png" }));
			break;

		case ("bonjour"):
		case ("salut"):
		case ("hello"):
		case ("hey"):
		case ("hi"):
		case ("hoï"):
		case ("hoi"):
		case ("hola"):
		case ("holà"):
			// catch many cases of commands to say hello
			message.react("553490319103098883");
			message.reply(`Carabonjour à toi ! ${emojis.carapuce}`);
			break;

		case ("flip"):
			// to play head or tail
			flipCoin(message, isInteraction);
			break;

		case ("shifumi"):
			// to play to the shifumi game against the bot
			shifumi(message, isInteraction);
			break;

		case ("poll"):
			// to create a poll with 2 to 11 answers possible
			myPoll(message, isInteraction);
			break;

		case ("listEmojis"):
		case ("listemojis"):
			if (!message.guild) {
				message.reply("Tu ne peux pas utiliser cette commande en privé.");
				break;
			}
			// put an irregular (invisible) white space in front of ${e.name} so discord don't try to display the emoji
			const emojiList = message.guild.emojis.cache.map(e => `${e} => :​${e.name}:`);
			message.channel.send(emojiList);
			break;

		case ("DansLaWhiteList"):
		case ("danslawhitelist"):
			if ((bot.owner.id && ((isInteraction && message.user.id === bot.owner.id) || message.author.id === bot.owner.id)) || (bot.config.whiteList.length > 0 && (bot.config.whiteList.includes(message.author.id) || (isInteraction && bot.config.whiteList.includes(message.user.id)))))
				message.reply("Oui tu y es !");
			else
				message.reply("Non tu n'y es pas.");
			break;

		case ("invite"):
			message.channel.send("https://discordapp.com/api/oauth2/authorize?client_id=550786957245153290&permissions=0&scope=bot");
			break;

		case ("devJoke"):
		case ("devjoke"):
			if (args.length !== 0) {
				message.channel.send("Cette commande ne prend pas de paramètre.");
				break;
			}
			devJokes(message);
			break;

		case ("météo"):
		case ("meteo"):
		case ("weather"):
			if (!isInteraction && args.length < 1) {
				message.channel.send("Cette commande nécessite de préciser un lieu");
				break;
			}
			weather(message, isInteraction);
			break;

		case ("github"):
			message.channel.send("https://github.com/Zargith/Carapuce_Discord_JS_bot");
			break;

		default:
			// check if the user tryed to use an animated emoji
			// else say that the command isn't reconized
			if (!useAnimatedEmojis(message))
				message.channel.send(`Commande \`${!isInteraction ? message.content : message.commandName}\` non-reconnue ou tu n'en dispose pas du droit d'utilisation ici`);
	}
};