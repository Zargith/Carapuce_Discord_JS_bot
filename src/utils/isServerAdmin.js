const { Permissions } = require("discord.js");

// function to check the message author have a role that have administrator rights
module.exports = function(message) {
	const guild = message.guild;
	const members = guild.members.cache.toJSON();
	let member;

	// get the user but as a server member not just a user
	for (let i = 0; i < members.length; i++)
		if (members[i].id === message.author.id)
			member = members[i];
	if (member && member.permissions.has(Permissions.FLAGS.ADMINISTRATOR))
		return true;
	return false;
};