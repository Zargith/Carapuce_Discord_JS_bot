const config = require("../config.json");
const isInObjectArray = require("./isInObjectArray.js");

exports.addRole = function(reaction, user, elem) {
	const guild = reaction.message.guild;
	const members = guild.members.cache.array();
	let member;
	for (let i = 0; i < members.length; i++)
		if (members[i].id === user.id)
			member = members[i];
	if (!member || member.roles.cache.find(role => role.name === "Inconnu / Unknown") || !isInObjectArray(reaction._emoji.name, config[elem], "emoji"))
		return;
	for (let i = 0; i < config[elem].length; i++) {
		if (reaction._emoji.name === config[elem][i].emoji) {
			const role = guild.roles.cache.find(role => role.name === config[elem][i].roleName);
			if (!role)
				return;
			member.roles.add(role);
		}
	}
};

exports.removeRole = function(reaction, user, elem) {
	const guild = reaction.message.guild;
	const members = guild.members.cache.array();
	let member;
	for (let i = 0; i < members.length; i++)
		if (members[i].id === user.id)
			member = members[i];
	if (!member || member.roles.cache.find(role => role.name === "Inconnu / Unknown") || !isInObjectArray(reaction._emoji.name, config[elem], "emoji"))
		return;
	for (let i = 0; i < config[elem].length; i++) {
		if (reaction._emoji.name === config[elem][i].emoji) {
			const role = guild.roles.cache.find(role => role.name === config[elem][i].roleName);
			if (!role)
				return;
			member.roles.remove(role);
		}
	}
};