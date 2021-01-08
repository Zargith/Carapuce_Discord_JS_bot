const emojiCharacters = require("../../../utils/emojiCharacters.js");

module.exports = function(message) {
	try {
		const args = message.content.split(" ");
		const roleName = args[1];
		let id;

		message.guild.roles.cache.find(role => id = findId(role.name, role.id, roleName));
		const number = message.guild.roles.cache.get(id).members.size;
		message.channel.send(`Il y a ${number} personne(s) avec le rôle <@&${id}>`);
	} catch (exception) {
		message.channel.send(`Le nom ne semble pas valide... Tu es sûr de ce que tu m'as envoyé ? ${emojiCharacters["',:/"]}`);
	}
};

function findId(name, id, roleName) {
	if (name.toUpperCase() === roleName.toUpperCase())
		return id;
	return;
}
