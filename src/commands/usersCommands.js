const config = require("../../config.json");
const help = require("./help.js");
const myPoll = require("./entertainment/poll.js");
const shifumi = require("./entertainment/shifumi.js");
const flipCoin = require("./entertainment/flipCoin.js");
const DJCarapuce = require("./entertainment/music/DJCarapuce.js");
const useAnimatedEmojis = require("./entertainment/useAnimatedEmojis.js");
const isInWhiteList = require("../utils/isInWhiteList.js");
const emojis = require("../utils/emojiCharacters.js");

module.exports = function(message, bot) {
	const args = message.content.split(" ");

	// check if the first word of the message content is equal to following ones
	switch (args[0]) {
		case (`${config.prefix}pong`):
			message.channel.send(`Carapong ! ${emojis.carapuce}`);
			break;
		case (`${config.prefix}play`):
		case (`${config.prefix}skip`):
		case (`${config.prefix}stop`):
		case (`${config.prefix}playlist`):
			if (!message.guild) {
				message.reply("Tu ne peux pas utiliser cette commande en privé.");
				break;
			}
			DJCarapuce(message, bot);
			break;
		case (`${config.prefix}help`):
			if (args.length !== 1) {
				message.channel.send("Cette commande ne prend pas de paramètre(s)");
				break;
			}
			// print the help for users
			help.printHelp(message);
			break;
		case (`${config.prefix}adminHelp`):
			// users can't use this command so send an error message
			message.channel.send("Désolé mais tu n'as pas accès à cette commande...");
			break;
		case (`${config.prefix}vatar`):
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
		case (`${config.prefix}love`):
			message.channel.send("dab dab, I dab you some dabing love ! :heart:");
			break;
		case (`${config.prefix}listemojis`):
			if (message.guild === null) {
				message.reply("Tu ne peux pas utiliser cette commande en privé.");
				break;
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
		default:
			// check if the user tryed to use an animated emoji
			// else say that the command isn't reconized
			if (!useAnimatedEmojis(message))
				message.channel.send(`Commande \`${message.content}\` non-reconnue...`);
	}
};