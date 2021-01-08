const emojiCharacters = require("../../../utils/emojiCharacters.js");

module.exports = function(message) {
	const args = message.content.trim().split(" ");
	let id = args[1];

	try {
		id = id.substring(4, id.length - 1);
		const number = message.guild.roles.cache.get(id).members.size;
		message.channel.send(`Il y a ${number} personne(s) avec le rôle ${args[1]}`);
	} catch (exception) {
		message.channel.send(`Je ne trouve pas le rôle ${args[1]}... Tu es sûr que tu m'as envoyé quelque chose de valide ? ${emojiCharacters["',:/"]}`);
	}
};