const isInArray = require("../../utils/isInArray.js");
const emojis = require("../../utils/emojiCharacters.js");

module.exports = function(message) {
	const arg = message.content.split(" ");
	if (arg.length !== 2) {
		message.channel.send(`Dis moi juste pierre, feuille ou ciseaux, je n'ai pas besoin d'autre chose ici ${emojis.carapuce}`);
		return;
	}
	if (!isInArray(arg[1], ["pierre", "p", "feuille", "f", "ciseaux", "c"])) {
		message.channel.send(`Dis moi ce que tu veux jouer quand même! ${emojis.angry_carapuce}`);
		return;
	}

	let pChoice = 0;

	switch (arg[1][0]) {
		case ("p"):
			pChoice = 1;
			break;
		case ("f"):
			pChoice = 2;
			break;
		case ("c"):
			pChoice = 3;
			break;
		default:
			message.channel.send("Il y a eu une erreur");
			throw new Error(`Le parsing du shifumi a échoué. Argument reçu : ${arg[1]}`);
	}

	const flip = Math.floor(Math.random() * 3 + 1);

	switch (flip) {
		case 1:
			message.channel.send({embed: {color: 3447003, description: "Pierre!"}});
			break;
		case 2:
			message.channel.send({embed: {color: 3447003, description: "Feuille!"}});
			break;
		case 3:
			message.channel.send({embed: {color: 3447003, description: "Ciseaux!"}});
			break;
	}

	if ((flip === 1 && pChoice === 2) || (flip === 2 && pChoice === 3) || (flip === 3 && pChoice === 1))
		message.channel.send(`Bien joué, tu as été meilleur(e) ! ${emojis.happy_carapuce}`);
	else
		message.channel.send(`Oh non tu n'as pas été meilleur(e)... ${emojis.sad_carapuce}`);
};