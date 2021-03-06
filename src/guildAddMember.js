const config = require("../config.json");
const Discord = require("discord.js");
const Canvas = require("canvas");
const isServerInConfig = require("./isServerInConfig.js");
const getDefaultRolesName = require("./getDefaultRolesName.js");

const applyText = (canvas, text) => {
	const ctx = canvas.getContext("2d");
	let fontSize = 70;

	do {
		ctx.font = `${fontSize -= 10}px sans-serif`;
	} while (ctx.measureText(text).width > canvas.width - 300);

	return ctx.font;
};

module.exports.createWelcomeImage = async function(member, bot) {
	if (!member)
		return;
	const channel = member.guild.systemChannel;
	if (!channel)
		return;
	try {
		const canvas = Canvas.createCanvas(1024, 700);
		const ctx = canvas.getContext("2d");
		const background = await Canvas.loadImage("./welcome.png");
		ctx.drawImage(background, 0, 0, canvas.width, canvas.height);
		ctx.strokeStyle = "#74037b";
		ctx.strokeRect(0, 0, canvas.width - 2, canvas.height - 1);
		ctx.strokeRect(1, 1, canvas.width - 3, canvas.height - 2);
		ctx.strokeRect(2, 2, canvas.width - 4, canvas.height - 3);
		ctx.strokeRect(2, 2, canvas.width - 5, canvas.height - 4);
		ctx.font = applyText(canvas, member.displayName);
		ctx.fillStyle = "#ce0707";
		ctx.fillText(member.displayName, 20, 685);
		ctx.beginPath();
		ctx.arc(825, 175, 125, 0, Math.PI * 2, true);
		ctx.closePath();
		ctx.clip();
		const avatar = await Canvas.loadImage(member.user.displayAvatarURL({format: "png"}));
		ctx.drawImage(avatar, 700, 50, 256, 256);
		const attachment = new Discord.MessageAttachment(canvas.toBuffer(), "welcome-image.png");
		channel.send(`Bienvenue sur ce CaraServeur, <@${member.id}> ! <:happy_carapuce:553490319103098883>`, attachment);
	} catch (exception) {
		channel.send({embed: {color: 16711680, description: `__**ERREUR**__\nLa commande n'a pas fonctionnée <:surprised_carapuce:568777407046221824>\n\n__L'erreur suivante s'est produite:__\n*${exception}*`}});
		throw exception;
	}
};

module.exports.addDefaultRoles = async function(member) {
	if (!member)
		return;
	const guild = member.guild;
	if (!guild || !isServerInConfig(guild.id))
		return;
	const defaultRolesName = getDefaultRolesName(guild.id);
	if (!defaultRolesName || defaultRolesName === [])
		return;
	for (let i = 0; i < defaultRolesName.length; i++) {
		const role = guild.roles.cache.find(r => r.name === defaultRolesName[i]);
		if (!role)
			throw new Error(`Cannot find role *${defaultRolesName[i]}* and give it to <@${member.id}>`);
		member.roles.add(role);
	}
};