module.exports = function(elem, arr, name) {
	for (let i = 0; i < arr.length; i++)
		if (arr[i][name] === elem)
			return (true);
	return (false);
};