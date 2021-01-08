const emojiCharacters = require("../../../utils/emojiCharacters.js");

module.exports = async function(message) {
	const args = message.content.split(" ");
	const id = args[1];
	try {
		const number = message.guild.roles.cache.get(id).members.size;
		if (number)
			message.channel.send(`Il y a ${number} personne(s) avec le rôle <@&${id}>`);
	} catch (exception) {
		message.channel.send(`Je ne trouve pas le rôle avec l'id ${id}... Tu es sûr que tu m'as envoyé quelque chose de valide ? ${emojiCharacters["',:/"]}`);
	}
};