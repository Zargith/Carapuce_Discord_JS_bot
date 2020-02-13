const config = require("../config.json");
const Discord = require("discord.js");
const Canvas = require('canvas');

const applyText = (canvas, text) => {
	const ctx = canvas.getContext('2d');
	let fontSize = 70;

	do {
		ctx.font = `${fontSize -= 10}px sans-serif`;
	} while (ctx.measureText(text).width > canvas.width - 300);

	return ctx.font;
};

module.exports = async function (member) {
	const channel = member.guild.systemChannel;
	if (!channel)
		return;
	try {
		const canvas = Canvas.createCanvas(1024, 700);
		const ctx = canvas.getContext('2d');
		const background = await Canvas.loadImage("./welcome.png");
		ctx.drawImage(background, 0, 0, canvas.width, canvas.height);
		ctx.strokeStyle = '#74037b';
		ctx.strokeRect(0, 0, canvas.width - 2, canvas.height - 1);
		ctx.strokeRect(1, 1, canvas.width - 3, canvas.height - 2);
		ctx.strokeRect(2, 2, canvas.width - 4, canvas.height - 3);
		ctx.strokeRect(2, 2, canvas.width - 5, canvas.height - 4);
		ctx.font = applyText(canvas, member.displayName);
		ctx.fillStyle = '#ce0707';
		ctx.fillText(member.displayName, 20, 685);
		ctx.beginPath();
		ctx.arc(825, 175, 125, 0, Math.PI * 2, true);
		ctx.closePath();
		ctx.clip();
		const avatar = await Canvas.loadImage(member.user.displayAvatarURL);
		ctx.drawImage(avatar, 700, 50, 256, 256);
		const attachment = new Discord.Attachment(canvas.toBuffer(), 'welcome-image.png');
		channel.send("Bienvenue sur ce CaraServeur, " + member + " ! <:happy_carapuce:553490319103098883>", attachment);
	} catch (exception) {
		channel.send({ embed: { color: 16711680, description: "__**ERREUR**__\nLa commande n'a pas fonctionnée <:surprised_carapuce:568777407046221824>\n\n__L'erreur suivante s'est produite:__\n" + exception + "*" } });
		bot.users.get(config.ownerID).send({ embed: { color: 16711680, description: "__**ERREUR**__\nLors de l'arrivée de l'utilisateur " + member + " sur le serveur " + member.guild.name + "\n\n__L'erreur suivante s'est produite:__\n*" + exception.stack + "*" } });
		console.log("ERREUR\nLors de l'arrivée de l'utilisateur " + member + " sur le serveur " + member.guild.name + "\nL'erreur suivante s'est produite:\n" + exception.stack);
	}
};