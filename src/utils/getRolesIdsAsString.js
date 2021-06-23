const getRolesIds = require("./getRolesIds");

module.exports = function(roles) {
	const res = [];
	const rolesIds = getRolesIds(roles);

	for (let i = 0; i < rolesIds.length; i++)
		res.push(`${rolesIds[i]}`);

	return res;
};