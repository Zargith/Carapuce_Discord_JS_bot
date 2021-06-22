const help = require("./helps/help.js");
const myPoll = require("./entertainment/poll.js");
const shifumi = require("./entertainment/shifumi.js");
const flipCoin = require("./entertainment/flipCoin.js");
const DJCarapuce = require("./entertainment/music/newDJCarapuce.js");
const useAnimatedEmojis = require("./entertainment/useAnimatedEmojis.js");
const devJokes = require("./entertainment/devJokes/devJokes.js");
const emojis = require("../utils/emojiCharacters.js");
const weather = require("./entertainment/weather.js");

module.exports = function(message) {
	const args = message.content.split(" ");
	const command = args.shift();


	// check if the first word of the message content is equal to one of the following ones
	switch (command) {
		case (`${bot.config.prefix}ping`):
			message.channel.send(`Carapong ! ${emojis.carapuce}`);
			message.channel.send(`Mon ping est de : **${bot.ws.ping}ms** ! ${emojis.happy_carapuce}`);
			break;

		case (`${bot.config.prefix}play`):
		case (`${bot.config.prefix}skip`):
		case (`${bot.config.prefix}stop`):
		case (`${bot.config.prefix}playlist`):
		case (`${bot.config.prefix}cleanPlaylist`):
		case (`${bot.config.prefix}pause`):
		case (`${bot.config.prefix}resume`):
		case (`${bot.config.prefix}loop`):
		case (`${bot.config.prefix}setVolume`):
		case (`${bot.config.prefix}shuffle`):
		case (`${bot.config.prefix}filters`):
		case (`${bot.config.prefix}progress`):
			if (!message.guild) {
				message.reply("Tu ne peux pas utiliser cette commande en privé.");
				break;
			}
			DJCarapuce(message);
			break;

		case (`${bot.config.prefix}help`):
			if (args.length === 0) {
				// print the common help
				help.printCommonHelp(message);
				break;
			} else if (args[1] === "musique") {
				// print the music help
				help.printMusicHelp(message);
				break;
			} else
				message.channel.send("Je ne connais pas cette page d'aide.");
			break;

		case (`${bot.config.prefix}adminHelp`):
			// users can't use this command so send an error message
			message.channel.send("Désolé mais tu n'as pas accès à cette commande...");
			break;

		case (`${bot.config.prefix}avatar`):
			message.reply(message.author.avatarURL);
			break;

		case (`${bot.config.prefix}bonjour`):
		case (`${bot.config.prefix}salut`):
		case (`${bot.config.prefix}hello`):
		case (`${bot.config.prefix}hey`):
		case (`${bot.config.prefix}hi`):
		case (`${bot.config.prefix}hoï`):
		case (`${bot.config.prefix}hoi`):
		case (`${bot.config.prefix}hola`):
		case (`${bot.config.prefix}holà`):
			// catch many cases of commands to say hello
			message.react("553490319103098883");
			message.reply(`Carabonjour à toi ! ${emojis.carapuce}`);
			break;

		case (`${bot.config.prefix}flip`):
			// to play head or tail
			flipCoin(message);
			break;

		case (`${bot.config.prefix}shifumi`):
			// to play to the shifumi game against the bot
			shifumi(message);
			break;

		case (`${bot.config.prefix}poll`):
			// to create a poll with 2 to 11 answers possible
			myPoll(message);
			break;

		case (`${bot.config.prefix}listEmojis`):
			if (!message.guild) {
				message.reply("Tu ne peux pas utiliser cette commande en privé.");
				break;
			}
			// put an irregular (invisible) white space in front of ${e.name} so discord don't try to display the emoji
			const emojiList = message.guild.emojis.cache.map(e => `${e} => :​${e.name}:`);
			message.channel.send(emojiList);
			break;

		case (`${bot.config.prefix}DansLaWhiteList`):
			if (bot.config.whiteList.includes(message.author.id) || message.author.id === bot.owner.id)
				message.reply(" oui tu y es !");
			else
				message.reply(" non tu n'y es pas.");
			break;

		case (`${bot.config.prefix}invite`):
			message.channel.send("https://discordapp.com/api/oauth2/authorize?client_id=550786957245153290&permissions=0&scope=bot");
			break;

		case (`${bot.config.prefix}devJoke`):
		case (`${bot.config.prefix}devjoke`):
			if (args.length !== 0) {
				message.channel.send("Cette commande ne prend pas de paramètre.");
				break;
			}
			devJokes(message);
			break;

		case (`${bot.config.prefix}météo`):
		case (`${bot.config.prefix}weather`):
			if (args.length < 1) {
				message.channel.send("Cette commande nécessite de préciser un lieu");
				break;
			}
			weather(message);
			break;

		case (`${bot.config.prefix}github`):
			message.channel.send("https://github.com/Zargith/Carapuce_Discord_JS_bot");
			break;

		default:
			// check if the user tryed to use an animated emoji
			// else say that the command isn't reconized
			if (!useAnimatedEmojis(message))
				message.channel.send(`Commande \`${message.content}\` non-reconnue ou tu n'en dispose pas du droit d'utilisation ici`);
	}
};