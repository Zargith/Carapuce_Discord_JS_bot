const isServerInConfig = require("./isServerInConfig.js");
const isMessageToListen = require("./isMessageToListen.js");
const isEmojiToListen = require("./isEmojiToListen.js");
const getRoleName = require("./getRoleName.js");
const getConfiguredRolesNames = require("./getConfiguredRolesNames.js");
const asAlreadyAConfiguredRole = require("./asAlreadyAConfiguredRole.js");
const isCumulativeListener = require("./isCumulativeListener.js");

exports.addRole = function(reaction, user) {
	const guild = reaction.message.guild;
	if (!isServerInConfig(guild.id) || !isMessageToListen(guild.id, reaction.message.id) || !isEmojiToListen(guild.id, reaction.message.id, reaction._emoji.name))
		return;
	const members = guild.members.cache.array();
	let member;
	for (let i = 0; i < members.length; i++)
		if (members[i].id === user.id)
			member = members[i];
	if (!member)
		throw new Error(`Can't find user ${user.id} on sever ${guild.name} (id: ${guild.id}) to give him role by react with emoji ${reaction._emoji.name} to message ${reaction.message.id}`);
	const roleName = getRoleName(guild.id, reaction.message.id, reaction._emoji.name);
	if (!roleName)
		throw new Error(`Can't find role on server ${guild.name} (id: ${guild.id})for emoji ${reaction._emoji.name} for message ${reaction.message.id} to listen`);
	const role = guild.roles.cache.find(role => role.name === roleName);
	if (!role)
		throw new Error(`Can't find role on server ${guild.name} (id: ${guild.id})for emoji ${reaction._emoji.name} for message ${reaction.message.id} to listen`);
	if (!isCumulativeListener(guild.id, reaction.message.id)) {
		const configuredRolesNames = getConfiguredRolesNames(guild.id, reaction.message.id);
		if (!configuredRolesNames || configuredRolesNames === [])
			member.roles.add(role);
		for (let i = 0; i < configuredRolesNames.length; i++)
			if (asAlreadyAConfiguredRole(member, configuredRolesNames[i])) {
				member.roles.remove(guild.roles.cache.find(role => role.name === configuredRolesNames[i]));
			}
	}
	member.roles.add(role);
};

exports.removeRole = function(reaction, user, elem) {
	const guild = reaction.message.guild;
	if (!isServerInConfig(guild.id) || !isMessageToListen(guild.id, reaction.message.id) || !isEmojiToListen(guild.id, reaction.message.id, reaction._emoji.name))
		return;
	const members = guild.members.cache.array();
	let member;
	for (let i = 0; i < members.length; i++)
		if (members[i].id === user.id)
			member = members[i];
	if (!member)
		throw new Error(`Can't find user ${user.id} on sever ${guild.name} (id: ${guild.id}) to give him role by react with emoji ${reaction._emoji.name} to message ${reaction.message.id}`);
	const roleName = getRoleName(guild.id, reaction.message.id, reaction._emoji.name);
	if (!roleName)
		throw new Error(`Can't find role on server ${guild.name} (id: ${guild.id})for emoji ${reaction._emoji.name} for message ${reaction.message.id} to listen`);
	const role = guild.roles.cache.find(role => role.name === roleName);
	if (!role)
		throw new Error(`Can't find role on server ${guild.name} (id: ${guild.id})for emoji ${reaction._emoji.name} for message ${reaction.message.id} to listen`);
	member.roles.remove(role);
};