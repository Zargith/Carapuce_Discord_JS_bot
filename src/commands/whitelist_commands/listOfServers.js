module.exports = function(message) {
	// get list of servers that the bot is on and display them with their ID in an embed message
	let str = "";
	bot.guilds.cache.array().forEach(guild => {
		str += (`- __Name :__ ${guild.name}\n\t\t__ID :__ ${guild.id}\n\n`);
	});
	message.channel.send(str);
};