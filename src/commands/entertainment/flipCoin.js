const isInArray = require("../../utils/isInArray.js");
const emojis = require("../../utils/emojiCharacters.js");

module.exports = function(message, isInteraction) {
	const arg = isInteraction ? message.options.get("pile_face").value : message.content.split(" ")[1];

	if (!isInArray(arg, ["pile", "face"])) {
		message.channel.send(`Dis-moi si tu choisis pile ou face ! ${emojis.angry_carapuce}`);
		return;
	}

	const flip = Math.floor(Math.random() * 2 + 1);

	if (flip === 1)
		message.channel.send({ embeds: [{ color: 0xace4ff, description: "C'est tombé sur pile !" }]});
	else
		message.channel.send({ embeds: [{ color: 0xace4ff, description: "C'est tombé sur face !" }]});

	if ((flip === 1 && arg === "pile") || (flip === 2 && arg === "face"))
		message.channel.send(`Super tu as gagné !!! ${emojis.happy_carapuce}`);
	else
		message.channel.send(`Oh non tu as perdu... ${emojis.sad_carapuce}`);
};