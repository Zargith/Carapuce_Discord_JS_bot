const config = require("../config.json");
const Discord = require("discord.js");

module.exports = function (message) {
	let args = message.content.split(";");

	if (args.length < 3 || args.length > 12) {
		message.channel.send("Il me faut entre 3 et 12 arguments séparés par des points-virgule\nC'est à dire : *question; arg 1; arg 2; ...* <:sad_carapuce:562773515745361920>");
		return;
	}
	const len = config.prefix.length + 5;
	args[0] = args[0].substring(len);
	const emotes = ["0⃣", "1⃣", "2⃣", "3⃣", "4⃣", "5⃣", "6⃣", "7⃣", "8⃣", "9⃣", "🔟"];
	let poll = new Discord.RichEmbed()
		.setColor(3447003)
		.setTitle("CaraPoll")
		.setDescription(`${args[0]}`);
	args.splice(0, 1);
	const startAt = ((args.length >= 10) ? 0 : 1);
	for (let i = startAt; i < args.length + startAt; i++)
		poll.addField(`__**Option ${emotes[i]} :**__`, args[i - startAt], true);
	message.channel.send(poll)
		.then(async m => {
			for (let i = startAt; i < args.length + startAt; i++)
				await m.react(emotes[i]);
		});
};