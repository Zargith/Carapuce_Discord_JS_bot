module.exports = function(roles) {
	const res = [];

	for (let i = 0; i < roles.length; i++)
		res.push(roles[i].id);

	return res;
};