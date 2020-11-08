const config = require("../../../config.json");

function getServersEmojisGif(message) {
	// get all emojis of the server
	const emojis = message.guild.emojis.cache.array();
	if (!emojis)
		return;
	const animatedEmojis = [];

	// loop on each one and check if they're animated
	// if yes, add them to the array named animatedEmojis and return it when finished
	for (let i = 0; i < emojis.length; i++)
		if (emojis[i].animated)
			animatedEmojis.push(emojis[i]);
	return animatedEmojis;
}

module.exports = function(message) {
	// get all animated emojis of the server
	const animatedEmojis = getServersEmojisGif(message);
	// check if the variable is empty or not, if it is then the function returns
	if (!animatedEmojis || animatedEmojis === [])
		return;
	// else loop on each animated emoji and compare their name with the content of the message
	for (let i = 0; i < animatedEmojis.length; i++)
		if (message.content === `${config.prefix}${animatedEmojis[i].name}`) {
			// if there is a match, delete user's message and send a new one that tell that the user X said E animatd emoji
			message.delete();
			message.channel.send(`${message.author} a dit :\n${animatedEmojis[i].toString()}`);
			return true;
		}
	return false;
};