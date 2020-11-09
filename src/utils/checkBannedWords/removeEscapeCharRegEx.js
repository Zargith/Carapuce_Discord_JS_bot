// function to remove some specials characters
module.exports = function(string) {
	return string.replace(/[.,;§<>?!*+-=^€$£°{}%&#~^¤()|[\]\/\\¨\`]/gmi, "");
};