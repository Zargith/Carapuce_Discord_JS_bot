module.exports = function(message) {
	// check of we only get one argument (normally it's an ID)
	const args = message.content.split(" ");
	if (args.length !== 2) {
		message.channel.send("J'ai uniquement besoin de l'id **du** serveur dont tu souhaites les informations.");
		return;
	}
	const id = args[1];

	// get the object that represent the server by its ID
	const guild = bot.guilds.cache.get(id);
	if (!guild) {
		message.channel.send("**Error**\nID not found or guild is null.");
		return;
	}

	// get all channels and display they with their name, type and ID
	let str = `__Serveur :__ ${guild.name},\t__ID :__ ${guild.id}\n\n`;
	guild.channels.cache.array().forEach(chan => {
		str += (`\t- __Name :__ ${chan.name }\n\t\t__Type :__ ${chan.type}\n\t\t__ID :__ ${chan.id}\n\n`);
	});
	message.channel.send(str);
};