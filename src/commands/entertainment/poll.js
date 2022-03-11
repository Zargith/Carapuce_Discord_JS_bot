const Discord = require("discord.js");
const emojis = require("../../utils/emojiCharacters.js");

module.exports = function(message, isInteraction) {
	const args = isInteraction ? [] : message.content.split(";");
	if (isInteraction) {
		if (message.options.get("question"))
			args.push(message.options.get("question").value);
		if (message.options.get("answer1"))
			args.push(message.options.get("answer1").value);
		if (message.options.get("answer2"))
			args.push(message.options.get("answer2").value);
		if (message.options.get("answer3"))
			args.push(message.options.get("answer3").value);
		if (message.options.get("answer4"))
			args.push(message.options.get("answer4").value);
		if (message.options.get("answer5"))
			args.push(message.options.get("answer5").value);
		if (message.options.get("answer6"))
			args.push(message.options.get("answer6").value);
		if (message.options.get("answer7"))
			args.push(message.options.get("answer7").value);
		if (message.options.get("answer8"))
			args.push(message.options.get("answer8").value);
		if (message.options.get("answer9"))
			args.push(message.options.get("answer9").value);
		if (message.options.get("answer10"))
			args.push(message.options.get("answer10").value);
		if (message.options.get("answer11"))
			args.push(message.options.get("answer11").value);
	}

	if (!isInteraction) {
		if (args.length < 3 || args.length > 12)
			return message.channel.send(`Il me faut entre 3 et 12 arguments séparés par des points-virgule\nC'est à dire : *question; arg 1; arg 2; ...* ${emojis.sad_carapuce}`);

		const len = bot.config.prefix.length + 5;
		args[0] = args[0].substring(len);
	}

	const poll = new Discord.MessageEmbed()
		.setColor(0xace4ff)
		.setTitle("CaraPoll")
		.setDescription(`${args[0]}`);
	args.splice(0, 1);
	const startAt = ((args.length >= 10) ? 0 : 1);
	for (let i = startAt; i < args.length + startAt; i++)
		poll.addField(`__**Option ${emojis[`${i}`]} :**__`, args[i - startAt], true);
	message.channel.send({ embeds: [ poll ] })
		.then(async m => {
			for (let i = startAt; i < args.length + startAt; i++)
				await m.react(emojis[i]);
		});
};