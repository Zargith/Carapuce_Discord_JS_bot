const help = require("./helps/help.js");
const myPoll = require("./entertainment/poll.js");
const shifumi = require("./entertainment/shifumi.js");
const flipCoin = require("./entertainment/flipCoin.js");
const DJCarapuce = require("./entertainment/music/newDJCarapuce.js");
const useAnimatedEmojis = require("./entertainment/useAnimatedEmojis.js");
const isInWhiteList = require("../utils/isInWhiteList.js");
const emojis = require("../utils/emojiCharacters.js");

module.exports = function(message) {
	const command = message.content.trim().split(" ").shift();

	// check if the first word of the message content is equal to one of the following ones
	switch (command) {
		case (`${bot.prefix}ping`):
			message.channel.send(`Carapong ! ${emojis.carapuce}`);
			message.channel.send(`Mon ping est de : **${bot.ws.ping}ms** ! ${emojis.happy_carapuce}`);
			break;

		case (`${bot.prefix}play`):
		case (`${bot.prefix}skip`):
		case (`${bot.prefix}stop`):
		case (`${bot.prefix}playlist`):
		case (`${bot.prefix}cleanPlaylist`):
		case (`${bot.prefix}pause`):
		case (`${bot.prefix}resume`):
		case (`${bot.prefix}loop`):
		case (`${bot.prefix}setVolume`):
		case (`${bot.prefix}shuffle`):
		case (`${bot.prefix}filters`):
		case (`${bot.prefix}progress`):
			if (!message.guild) {
				message.reply("Tu ne peux pas utiliser cette commande en privé.");
				break;
			}
			DJCarapuce(message);
			break;

		case (`${bot.prefix}help`):
			const args = message.content.split(" ");

			if (args.length === 1) {
				// print the common help
				help.printCommonHelp(message);
				break;
			} else if (args[1] == "musique") {
				// print the music help
				help.printMusicHelp(message);
				break;
			} else
				message.channel.send("Je ne connais pas cette page d'aide.");
			break;

		case (`${bot.prefix}adminHelp`):
			// users can't use this command so send an error message
			message.channel.send("Désolé mais tu n'as pas accès à cette commande...");
			break;

		case (`${bot.prefix}avatar`):
			message.reply(message.author.avatarURL);
			break;

		case (`${bot.prefix}bonjour`):
		case (`${bot.prefix}salut`):
		case (`${bot.prefix}hello`):
		case (`${bot.prefix}hey`):
		case (`${bot.prefix}hi`):
		case (`${bot.prefix}hoï`):
		case (`${bot.prefix}hoi`):
		case (`${bot.prefix}hola`):
		case (`${bot.prefix}holà`):
			// catch many cases of commands to say hello
			message.react("553490319103098883");
			message.reply(`Carabonjour à toi ! ${emojis.carapuce}`);
			break;

		case (`${bot.prefix}flip`):
			// to play head or tail
			flipCoin(message);
			break;

		case (`${bot.prefix}shifumi`):
			// to play to the shifumi game against the bot
			shifumi(message);
			break;

		case (`${bot.prefix}poll`):
			// to create a poll with 2 to 11 answers possible
			myPoll(message);
			break;

		case (`${bot.prefix}listEmojis`):
			if (!message.guild) {
				message.reply("Tu ne peux pas utiliser cette commande en privé.");
				break;
			}
			// put an irregular (invisible) white space in front of ${e.name} so discord don't try to display the emoji
			const emojiList = message.guild.emojis.cache.map(e => `${e} => :​${e.name}:`);
			message.channel.send(emojiList);
			break;

		case (`${bot.prefix}DansLaWhiteList`):
			if (isInWhiteList(message.author.id) || message.author.id === bot.owner.id)
				message.reply(" oui tu y es !");
			else
				message.reply(" non tu n'y es pas.");
			break;

		case (`${bot.prefix}invite`):
			message.channel.send("https://discordapp.com/api/oauth2/authorize?client_id=550786957245153290&permissions=0&scope=bot");
			break;

		default:
			// check if the user tryed to use an animated emoji
			// else say that the command isn't reconized
			if (!useAnimatedEmojis(message))
				message.channel.send(`Commande \`${message.content}\` non-reconnue...`);
	}
};