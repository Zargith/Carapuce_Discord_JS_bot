const config = require("../../config.json");

// function to check if an ID is defined into an array of strings
module.exports = function(id) {
	if (!config.whiteID)
		return;

	let res = false;
	config.whiteList.forEach(whiteID => {
		if (whiteID === id)
			res = true;
	});
	return (res);
};