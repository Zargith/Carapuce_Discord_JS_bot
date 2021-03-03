module.exports = {
	inQuiz : false,
	score : 0,
	numQuestion : 1,
	waitResponse : false,

	CaraQuiz : function(message) {

		try {
			message.content = message.content.toLowerCase();
			if (message.content === `${bot.config.prefix}Qstop`) {
				message.channel.send(`Fin du cara-quiz !\nFélicitations, ton score est de ${this.score}/${(this.numQuestion - 1)} ! <:carapuce:551198314687758357>`);
				this.score = 0;
				this.numQuestion = 1;
				this.inQuiz = false;
				return;
			} else if (message.content === `${bot.config.prefix}quiz` && this.inQuiz === true) {

				message.channel.send(`Un quizz est déjà en cours <:carapuce:551198314687758357>\nMais si tu veux arrêter celui-ci dis *${bot.config.prefix}Qstop*`)
				return;
			}

			switch (this.numQuestion) {
				case 1:
					if (!this.waitResponse) {
						this.inQuiz = true;
						message.channel.send("Nous allons jouer à un cara-quiz!\nPour répondre il te suffira de donner la lettre correspondante à la réponse que tu aura choisi <:carapuce:551198314687758357>");
						message.channel.send({
							embed: {
								color: 3447003,
								description: "__**Question n°1 :**__",
								fields: [{
									name: "Zargith m'a créé",
									value: "A: Vrai\tB: Faux"
								}
								],
							}
						});
						this.waitResponse = true;
					} else {
						if (message.content === "a") {
							this.score++;
							this.numQuestion++;
							this.waitResponse = false;
							message.channel.send("Bonne réponse ! <:happy_carapuce:553490319103098883>");
							this.CaraQuiz(message);
						} else if (message.content === "b") {
							this.numQuestion++;
							this.waitResponse = false;
							message.channel.send("Mauvaise réponse... <:sad_carapuce:562773515745361920>");
							this.CaraQuiz(message);
						}
					}
					break;
				case 2:
					if (!this.waitResponse) {
						this.inQuiz = true;
						message.channel.send({
							embed: {
								color: 3447003,
								description: "__**Question n°2 :**__",
								fields: [{
									name: "Quel est le meilleur starteur parmis ces choix ?",
									value: "A: Bulbizarre\tB: Carapuce\tC: Salamèche"
								}
								],
							}
						});
						this.waitResponse = true;
					} else {
						if (message.content.toLowerCase() === "b") {
							this.score++;
							this.numQuestion++;
							this.waitResponse = false;
							message.channel.send("Bonne réponse ! <:happy_carapuce:553490319103098883>");
							this.CaraQuiz(message);
						} else if (message.content === "a" || message.content === "c") {
							this.numQuestion++;
							this.waitResponse = false;
							message.channel.send("Mauvaise réponse... <:sad_carapuce:562773515745361920>");
							this.CaraQuiz(message);
						}
					}
					break;
				case 3:
					if (!this.waitResponse) {
						this.inQuiz = true;
						message.channel.send({
							embed: {
								color: 3447003,
								description: "__**Question n°3 :**__",
								fields: [{
									name: "Qu'est-ce qui est jaune et qui attend ?",
									value: "A: Jonathan\tB: Salamèche vu par un daltonien\tC: Pikachu"
								}
								],
							}
						});
						this.waitResponse = true;
					} else {
						if (message.content.toLowerCase() === "a") {
							this.score++;
							this.numQuestion++;
							this.waitResponse = false;
							message.channel.send("Bonne réponse ! <:happy_carapuce:553490319103098883>");
							this.CaraQuiz(message);
						} else if (message.content === "b" || message.content === "c") {
							this.numQuestion++;
							this.waitResponse = false;
							message.channel.send("Mauvaise réponse... <:sad_carapuce:562773515745361920>");
							this.CaraQuiz(message);
						}
					}
					break;
				default:
					message.channel.send(`Fin du cara-quiz !\nTu as fais un score de ${this.score}/${(this.numQuestion - 1)} <:happy_carapuce:553490319103098883>`);
					this.score = 0;
					this.numQuestion = 1;
					this.waitResponse = false;
					this.inQuiz = false;
					break;
			}
		} catch (exception) {
			this.inQui = false;
			this.score = 0;
			this.numQuestion = 1;
			this.waitResponse = false;
			throw (exception);
		}
	}
}


const queue = new Map();
const quiz = require("./Caraquiz.json");

module.exports.tmp = async function(message) {
	const serverQueue = queue.get(message.author.id);

	if (message.content.startsWith(`${bot.config.prefix}quiz`))
		displayQuestion(message, serverQueue);

}

function displayQuestion(message, serverQueue) {
	if (!serverQueue) {
		const queueContruct = {
			textChannel: message.channel,
			numQuestion: 1,
			points: 0
		};
		queue.set(message.author.id, queueContruct);
	}
}

/*
<message>.channel.send('Please enter more input.').then(() => {
	const filter = m => <message>.author.id === m.author.id;

	<message>.channel.awaitMessages(filter, { time: 60000, maxMatches: 1, errors: ['time'] })
		.then(messages => {
			<message>.channel.send(`You've entered: ${messages.first().content}`);
		})
		.catch(() => {
			<message>.channel.send('You did not enter any input!');
		});
});
*/