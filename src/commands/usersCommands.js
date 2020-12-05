const config = require("../../config.json");
const help = require("./helps/help.js");
const myPoll = require("./entertainment/poll.js");
const shifumi = require("./entertainment/shifumi.js");
const flipCoin = require("./entertainment/flipCoin.js");
const DJCarapuce = require("./entertainment/music/newDJCarapuce.js");
const useAnimatedEmojis = require("./entertainment/useAnimatedEmojis.js");
const isInWhiteList = require("../utils/isInWhiteList.js");
const emojis = require("../utils/emojiCharacters.js");

module.exports = function(message, bot) {
	const command = message.content.trim().split(" ").shift();

	// check if the first word of the message content is equal to one of the following ones
	switch (command) {
		case (`${config.prefix}ping`):
			message.channel.send(`Carapong ! ${emojis.carapuce}`);
			message.channel.send(`Mon ping est de : **${bot.ws.ping}ms** ! ${emojis.happy_carapuce}`);
			break;

		case (`${config.prefix}play`):
		case (`${config.prefix}skip`):
		case (`${config.prefix}stop`):
		case (`${config.prefix}playlist`):
		case (`${config.prefix}cleanPlaylist`):
		case (`${config.prefix}pause`):
		case (`${config.prefix}resume`):
		case (`${config.prefix}loop`):
		case (`${config.prefix}setVolume`):
		case (`${config.prefix}shuffle`):
		case (`${config.prefix}filters`):
		case (`${config.prefix}progress`):
			if (!message.guild) {
				message.reply("Tu ne peux pas utiliser cette commande en privé.");
				break;
			}
			DJCarapuce(message, bot);
			break;

		case (`${config.prefix}help`):
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

		case (`${config.prefix}adminHelp`):
			// users can't use this command so send an error message
			message.channel.send("Désolé mais tu n'as pas accès à cette commande...");
			break;

		case (`${config.prefix}avatar`):
			message.reply(message.author.avatarURL);
			break;

		case (`${config.prefix}bonjour`):
		case (`${config.prefix}salut`):
		case (`${config.prefix}hello`):
		case (`${config.prefix}hey`):
		case (`${config.prefix}hi`):
		case (`${config.prefix}hoï`):
		case (`${config.prefix}hoi`):
		case (`${config.prefix}hola`):
		case (`${config.prefix}holà`):
			// catch many cases of commands to say hello
			message.react("553490319103098883");
			message.reply(`Carabonjour à toi ! ${emojis.carapuce}`);
			break;

		case (`${config.prefix}flip`):
			// to play head or tail
			flipCoin(message);
			break;

		case (`${config.prefix}shifumi`):
			// to play to the shifumi game against the bot
			shifumi(message);
			break;

		case (`${config.prefix}poll`):
			// to create a poll with 2 to 11 answers possible
			myPoll(message);
			break;

		case (`${config.prefix}listEmojis`):
			if (message.guild === null) {
				message.reply("Tu ne peux pas utiliser cette commande en privé.");
				break;
			}
			// put an irregular (invisible) white space in front of ${e.name} so discord don't try to display the emoji
			const emojiList = message.guild.emojis.cache.map(e => `${e} => :​${e.name}:`);
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

		default:
			// check if the user tryed to use an animated emoji
			// else say that the command isn't reconized
			if (!useAnimatedEmojis(message))
				message.channel.send(`Commande \`${message.content}\` non-reconnue...`);
	}
};