const removeArrayDuplicateValues = require("../removeArrayDuplicateValues.js");
const createRegExFromConfig = require("./createRegExFromConfig.js");
const removeDiacritics = require("./removeDiacritics.js");
const removeEscapeCharRegEx = require("./removeEscapeCharRegEx.js");
const getReportLogChannel = require("../oldUtils/getReportLogChannel.js");

module.exports = async function(message, updatedMessage, bot) {
	const reportLogChannelID = await getReportLogChannel(message.guild.id);
	if (!reportLogChannelID)
		return;
	const reportLogChannel = message.guild.channels.cache.get(reportLogChannelID);
	if (!reportLogChannel)
		return;
	const regexp = await createRegExFromConfig(message, bot);

	// step 1: remove accented characters and check if there is banned words
	let clearedContent = removeDiacritics(message.content.toLowerCase());
	const foundedWordsStep1 = clearedContent.match(regexp);

	// setp 2: remove escape characters and check if there is banned words
	clearedContent = removeEscapeCharRegEx(clearedContent);
	const foundedWordsStep2 = clearedContent.match(regexp);

	// step 3: concat both previous steps results and remove duplicates values. Exit if the array is empty
	let foundedWordsStep3 = (!foundedWordsStep1 || foundedWordsStep1 === [] ? foundedWordsStep2 : foundedWordsStep1.concat(foundedWordsStep2));
	foundedWordsStep3 = removeArrayDuplicateValues(foundedWordsStep3);
	if (!foundedWordsStep3 || foundedWordsStep3 === [])
		return;

	// set the string with founded banned words to put it into the embed message
	let suspectsWords = "";
	for (let i = 0; i < foundedWordsStep3.length; i++)
		suspectsWords += `${( foundedWordsStep3[i] === "null" ? "" : `${(i === 0 ? "" : ", ")}${foundedWordsStep3[i]}`)}`;
	reportLogChannel.send({embed: {color: 16711680, title: "/!\\Message probablement incorrect /!\\", description: `${message.author} ${ updatedMessage ? "a mis à jour son message et" : ""} a envoyé :\n\n${message.content}\n\n${message.url}\n\nMessage contenant : ${suspectsWords}`}});
};