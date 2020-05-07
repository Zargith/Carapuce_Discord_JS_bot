const isInArray = require("./isInArray.js");

module.exports = function(message) {
	const arg = message.content.split(" ");

	if (arg.length !== 2) {
		message.channel.send("Dis moi juste pile ou face, je n'ai pas besoin d'autre chose ici <:carapuce:551198314687758357>");
		return;
	}
	if (!isInArray(arg[1], ["pile", "face"])) {
		message.channel.send("Dis moi pile ou face quand même! <:angry_carapuce:568356340003635200>");
		return;
	}

	const flip = Math.floor(Math.random() * 2 + 1);

	if (flip === 1)
		message.channel.send({embed: {color: 3447003, description: "C'est tombé sur Pile!"}});
	else
		message.channel.send({embed: {color: 3447003, description: "C'est tombé sur Face!"}});

	if ((flip === 1 && arg[1] === "pile") || (flip === 2 && arg[1] === "face"))
		message.channel.send("Super tu as gagné!!! <:happy_carapuce:553490319103098883>");
	else
		message.channel.send("Oh non tu as perdu... <:sad_carapuce:562773515745361920>");
};