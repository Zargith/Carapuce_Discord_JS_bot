const Discord = require("discord.js");
const emojis = require("../../utils/emojiCharacters.js");

module.exports = function(message) {
	const args = message.content.split(";");

	if (args.length < 3 || args.length > 12) {
		message.channel.send(`Il me faut entre 3 et 12 arguments séparés par des points-virgule\nC'est à dire : *question; arg 1; arg 2; ...* ${emojis.sad_carapuce}`);
		return;
	}
	const len = bot.prefix.length + 5;
	args[0] = args[0].substring(len);
	const poll = new Discord.MessageEmbed()
		.setColor(3447003)
		.setTitle("CaraPoll")
		.setDescription(`${args[0]}`);
	args.splice(0, 1);
	const startAt = ((args.length >= 10) ? 0 : 1);
	for (let i = startAt; i < args.length + startAt; i++)
		poll.addField(`__**Option ${emojis[`${i}`]} :**__`, args[i - startAt], true);
	message.channel.send(poll)
		.then(async m => {
			for (let i = startAt; i < args.length + startAt; i++)
				await m.react(emojis[i]);
		});
};