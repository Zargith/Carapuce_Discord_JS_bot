// function to remove duplicates values in an array
module.exports = function(arr) {
	if (!arr || arr === [])
		return;
	let unique = {};
	arr.forEach(function(i) {
		if (!unique[i])
			unique[i] = true;
	});
	return Object.keys(unique);
};