module.exports = function(member, roleName) {
	const role = member.roles.cache.find(role => role.name === roleName);
	if (!role)
		return false;
	return true;
};