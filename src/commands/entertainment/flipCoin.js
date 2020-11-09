const isInArray = require("../../utils/isInArray.js");
const emojis = require("../../utils/emojiCharacters.js");

module.exports = function(message) {
	const arg = message.content.split(" ");

	if (arg.length !== 2) {
		message.channel.send(`Dis moi juste pile ou face, je n'ai pas besoin d'autre chose ici ${emojis.carapuce}`);
		return;
	}
	if (!isInArray(arg[1], ["pile", "face"])) {
		message.channel.send(`Dis moi pile ou face quand même ! ${emojis.angry_carapuce}`);
		return;
	}

	const flip = Math.floor(Math.random() * 2 + 1);

	if (flip === 1)
		message.channel.send({embed: {color: 3447003, description: "C'est tombé sur pile !"}});
	else
		message.channel.send({embed: {color: 3447003, description: "C'est tombé sur face !"}});

	if ((flip === 1 && arg[1] === "pile") || (flip === 2 && arg[1] === "face"))
		message.channel.send(`Super tu as gagné!!! ${emojis.happy_carapuce}`);
	else
		message.channel.send(`Oh non tu as perdu... ${emojis.sad_carapuce}`);
};