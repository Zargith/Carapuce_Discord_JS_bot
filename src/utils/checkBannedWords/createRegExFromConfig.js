const getBannedWords = require("../oldUtils/getBannedWords.js");

// function to create a regex (regular expression) to get words defined as banned
module.exports = async function(message, bot) {
	const bannedWords = await getBannedWords(message.guild.id);
	if (!bannedWords || bannedWords === [])
		return;
	let res = "(^|\\b)(";
	for (let i = 0; i < bannedWords.length; i++)
		res += `${bannedWords[i]}${(i === (bannedWords.length - 1) ? "" : "|")}`;
	res += ")(\\b|$)";
	return (new RegExp(res, "gmi"));
};