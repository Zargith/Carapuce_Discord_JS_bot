// function to check if an ID is defined into an array of strings
module.exports = function(id) {
	if (!bot.config.whiteID)
		return;

	let res = false;
	bot.config.whiteList.forEach(whiteID => {
		if (whiteID === id)
			res = true;
	});
	return (res);
};