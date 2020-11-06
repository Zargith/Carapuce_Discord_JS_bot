const isServerInConfig = require("./isServerInConfig.js");
const isMessageToListen = require("./isMessageToListen.js");
const isEmojiToListen = require("./isEmojiToListen.js");
const getRoleName = require("./getRoleName.js");
const getConfiguredRolesNames = require("./getConfiguredRolesNames.js");
const asAlreadyAConfiguredRole = require("./asAlreadyAConfiguredRole.js");
const isCumulativeListener = require("./isCumulativeListener.js");
const hasDefaultRole = require("./hasDefaultRole.js");
const getDefaultRole = require("./getDefaultRole.js");

exports.addRole = async function(reaction, user) {
	const guild = reaction.message.guild;
	if (!isServerInConfig(guild.id) || !isMessageToListen(guild.id, reaction.message.id) || !isEmojiToListen(guild.id, reaction.message.id, reaction._emoji.name))
		return;
	const members = (await guild.members.fetch()).array();
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

//				console.log(reaction.message);
/*				const reactions = reaction.message.reactions.cache.array();
				let theReaction;
				for (let i = 0; i < reactions.length; i++)
					if (reactions[i]._emoji == reaction._emoji)
						theReaction = reactions[i];
				if (!theReaction)
					return;
				console.log(theReaction)
				const users = theReaction.users.cache.array();
				console.log("users: ", users)
				if (!users || users === [])
					return;
				for (let i = 0; i < users.length; i++)
					if (users[i] == user)
						users.remove(user);
*/
/*
				const userReactions = reaction.message.reactions.cache.filter(reaction => reaction.users.cache.has(user.id));
				console.log(userReactions);
*/
			}
	}
	member.roles.add(role);
	if (hasDefaultRole(guild.id, reaction.message.id)) {
		const defaultRoleName = getDefaultRole(guild.id, reaction.message.id);
		const defaultRole = guild.roles.cache.find(role => role.name === defaultRoleName);
		if (defaultRole)
			member.roles.remove(defaultRole);
	}
};

exports.removeRole = async function(reaction, user, elem) {
	const guild = reaction.message.guild;
	if (!isServerInConfig(guild.id) || !isMessageToListen(guild.id, reaction.message.id) || !isEmojiToListen(guild.id, reaction.message.id, reaction._emoji.name))
		return;
	const members = (await guild.members.fetch()).array();
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
	if (hasDefaultRole(guild.id, reaction.message.id)) {
		const defaultRoleName = getDefaultRole(guild.id, reaction.message.id);
		const defaultRole = guild.roles.cache.find(role => role.name === defaultRoleName);
		if (defaultRole)
			member.roles.add(defaultRole);
	}
};