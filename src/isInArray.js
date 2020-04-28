module.exports = function(elem, arr) {
	for (let i = 0; i < arr.length; i++)
		if (arr[i] === elem)
			return (true);
	return (false);
}