const config = require("../config.json");
const isServerInConfig = require("./isServerInConfig.js");
const getReportLogChannel = require("./getReportLogChannel.js");
const getBannedWords = require("./getBannedWords.js");

module.exports = function(message) {
	if (!message.guild || message.channel.nsfw === true || !isServerInConfig(message.guild.id))
		return;

	const reportLogChannel = message.guild.channels.cache.get(getReportLogChannel(message.guild.id));
	if (!reportLogChannel)
		return;
	const bannedWords = getBannedWords(message.guild.id);
	if (!bannedWords || bannedWords === [])
		return;
	let suspectsWords = "";
	for (let i = 0; i < bannedWords.length; i++) {
		if (message.content.toLowerCase().includes(bannedWords[i]))
			suspectsWords += `${bannedWords[i]} `;
	}
	if (suspectsWords === "")
		return;
	reportLogChannel.send({embed: {color: 16711680, title: "/!\\Message probablement incorrect /!\\", description: `${message.author} a envoyé :\n\n${message.content}\n\n${message.url}\n\nMessage contenant : ${suspectsWords}`}});
};